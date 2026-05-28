import {
  BadRequestException,
  GoneException,
  Injectable,
  Logger,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EntityManager, IsolationLevel } from '@mikro-orm/core';
import { QrCode } from '../../venue/entities/qr-code.entity';
import { RewardOffer } from '../../venue/entities/reward-offer.entity';
import { Tag } from '../../venue/entities/tag.entity';
import { Voucher } from '../../voucher/entities/voucher.entity';
import { Feedback } from '../entities/feedback.entity';
import { FeedbackTag } from '../entities/feedback-tag.entity';
import { AbuseStackService } from './abuse-stack.service';
import { generateVoucherCode } from '../../voucher/services/voucher-code';
import { describeRewardOffer } from '../../voucher/services/reward-description';
import { VoucherEmailService } from '../../voucher/services/voucher-email.service';
import type {
  SubmitFeedbackBody,
  VoucherUnavailableReason,
} from '../dto/submit-feedback.dto';

export interface SubmitContext {
  qrCodeId: string;
  body: SubmitFeedbackBody;
  deviceFingerprint: string | null;
  localStorageToken: string | null;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface SubmitOutcome {
  feedback: Feedback;
  voucher: Voucher | null;
  voucherUnavailableReason: VoucherUnavailableReason | null;
}

const VOUCHER_CODE_RETRY_LIMIT = 5;
// Retries on Postgres 40001 (serialization_failure) from the submit tx.
const SUBMIT_TRANSACTION_RETRY_LIMIT = 3;
// Match `varchar(255)` in Migration20260527093131; over-long input → 400.
const MAX_COMMENT_LENGTH = 255;
const MAX_EMAIL_LENGTH = 255;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Injectable()
export class FeedbackSubmissionService {
  private readonly logger = new Logger(FeedbackSubmissionService.name);

  constructor(
    private readonly em: EntityManager,
    private readonly abuseStack: AbuseStackService,
    private readonly voucherEmail: VoucherEmailService,
  ) {}

  async resolveQr(
    qrCodeId: string,
  ): Promise<{ qrCode: QrCode; offer: RewardOffer | null; tags: Tag[] }> {
    const qrCode = await this.em.findOne(
      QrCode,
      { id: qrCodeId },
      { populate: ['venue'] },
    );
    if (!qrCode) {
      throw new NotFoundException('QR code not found');
    }
    if (!qrCode.active) {
      throw new GoneException('QR code is no longer active');
    }
    if (qrCode.venue.archivedAt) {
      throw new GoneException('Venue is no longer active');
    }
    const offer = await this.em.findOne(RewardOffer, { venue: qrCode.venue });
    const tags = await this.em.find(
      Tag,
      { venue: qrCode.venue, archivedAt: null },
      { orderBy: { sortOrder: 'ASC', createdAt: 'ASC' } },
    );
    return { qrCode, offer, tags };
  }

  async submit(ctx: SubmitContext): Promise<SubmitOutcome> {
    const rating = ctx.body.rating;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be an integer between 1 and 5');
    }
    const comment = normalizeComment(ctx.body.comment);
    const customerEmail = normalizeEmail(ctx.body.customerEmail);
    const tagIds = normalizeTagIds(ctx.body.tagIds);
    // A 1-4 star rating must come with an explanation — that's where the
    // actionable signal lives for the owner. Only a perfect 5 may be silent.
    if (rating < 5 && !comment) {
      throw new BadRequestException('Komentarz jest wymagany przy ocenie 1–4 gwiazdek');
    }

    // Cap up front so the cap check and the stored row see the same string —
    // otherwise an oversized header silently bypasses isDailyCapReached.
    const deviceFingerprint = cap(ctx.deviceFingerprint);
    const localStorageToken = cap(ctx.localStorageToken);
    const ipAddress = cap(ctx.ipAddress);
    const userAgent = cap(ctx.userAgent);

    const { qrCode, offer } = await this.resolveQr(ctx.qrCodeId);
    const venue = qrCode.venue;

    if (await this.abuseStack.checkIpHardBlock(venue.id, ipAddress)) {
      this.logger.warn(
        `IP hard-block fired: venue=${venue.id} ip=${ipAddress} qrCode=${qrCode.id}`,
      );
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.abuseStack.checkIpSoftAlarm(venue.id, ipAddress);

    // SERIALIZABLE closes the cap-check ↔ voucher-INSERT race; the 40001
    // retry turns a losing tx into a clean daily_cap_reached.
    let lastError: unknown;
    for (let attempt = 0; attempt < SUBMIT_TRANSACTION_RETRY_LIMIT; attempt += 1) {
      try {
        const outcome = await this.em.transactional(
          async (em) => {
            let voucherUnavailableReason: VoucherUnavailableReason | null = null;
            if (!offer) {
              voucherUnavailableReason = 'no_offer';
            } else if (!offer.active) {
              voucherUnavailableReason = 'offer_paused';
            } else if (
              await this.abuseStack.isDailyCapReached(
                em,
                venue.id,
                deviceFingerprint,
                localStorageToken,
                offer.dailyCap,
              )
            ) {
              voucherUnavailableReason = 'daily_cap_reached';
            }

            const tags = await loadTagsForVenue(em, venue.id, tagIds);

            const feedback = em.create(
              Feedback,
              {
                venue,
                qrCode,
                rating,
                comment,
                customerEmail,
                deviceFingerprint,
                localStorageToken,
                ipAddress,
                userAgent,
              },
              { partial: true },
            );

            const feedbackTags = tags.map((tag) =>
              em.create(FeedbackTag, { feedback, tag }, { partial: true }),
            );

            let voucher: Voucher | null = null;
            if (!voucherUnavailableReason && offer) {
              voucher = await this.createVoucher(em, venue.name, qrCode, feedback, offer);
            }

            const toPersist: Array<Feedback | Voucher | FeedbackTag> = [feedback];
            if (voucher) toPersist.push(voucher);
            toPersist.push(...feedbackTags);
            await em.persistAndFlush(toPersist);
            return { feedback, voucher, voucherUnavailableReason };
          },
          { isolationLevel: IsolationLevel.SERIALIZABLE },
        );
        // After commit, fire-and-forget the voucher email. Errors are swallowed
        // inside dispatch() so a Resend outage cannot fail an already-recorded
        // feedback submission.
        if (outcome.voucher && customerEmail) {
          void this.voucherEmail.dispatch({
            toEmail: customerEmail,
            voucher: outcome.voucher,
            venueName: venue.name,
          });
        }
        return outcome;
      } catch (err) {
        lastError = err;
        if (!isSerializationFailure(err)) throw err;
        this.logger.warn(
          `Serialization conflict on feedback submission (attempt ${attempt + 1}/${SUBMIT_TRANSACTION_RETRY_LIMIT})`,
        );
      }
    }
    throw lastError;
  }

  private async createVoucher(
    em: EntityManager,
    venueName: string,
    qrCode: QrCode,
    feedback: Feedback,
    offer: RewardOffer,
  ): Promise<Voucher> {
    const description = describeRewardOffer(offer.type, offer.value);
    const expiresAt = offer.expiresInDays != null
      ? new Date(Date.now() + offer.expiresInDays * 24 * 60 * 60 * 1000)
      : undefined;

    for (let attempt = 0; attempt < VOUCHER_CODE_RETRY_LIMIT; attempt += 1) {
      const code = generateVoucherCode(venueName);
      const exists = await em.findOne(Voucher, { code });
      if (exists) continue;
      return em.create(
        Voucher,
        {
          code,
          venue: qrCode.venue,
          feedback,
          qrCode,
          type: offer.type,
          value: offer.value,
          description,
          expiresAt,
        },
        { partial: true },
      );
    }
    this.logger.error('Voucher code collision exceeded retry budget');
    throw new HttpException(
      'Unable to allocate voucher code, please try again',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

// Hard cap on every client-controlled string we persist into a varchar(255)
// column. Headers like user-agent are untrusted and can be arbitrarily long;
// truncating here keeps the row writable without raising a 4xx for a header
// the diner didn't pick.
const PERSISTED_FIELD_MAX = 255;
const cap = (raw: string | null | undefined): string | undefined => {
  if (raw == null) return undefined;
  return raw.length > PERSISTED_FIELD_MAX ? raw.slice(0, PERSISTED_FIELD_MAX) : raw;
};

const normalizeComment = (raw: string | null | undefined): string | undefined => {
  if (raw == null) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    throw new BadRequestException(`Comment exceeds ${MAX_COMMENT_LENGTH} characters`);
  }
  return trimmed;
};

const normalizeEmail = (raw: string | null | undefined): string | undefined => {
  if (raw == null) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(trimmed)) {
    throw new BadRequestException('Invalid email format');
  }
  return trimmed;
};

const MAX_TAGS_PER_FEEDBACK = 20;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const normalizeTagIds = (raw: unknown): string[] => {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    throw new BadRequestException('tagIds must be an array');
  }
  const seen = new Set<string>();
  for (const value of raw) {
    if (typeof value !== 'string' || !UUID_RE.test(value)) {
      throw new BadRequestException('Each tagId must be a UUID');
    }
    seen.add(value);
  }
  if (seen.size > MAX_TAGS_PER_FEEDBACK) {
    throw new BadRequestException(
      `At most ${MAX_TAGS_PER_FEEDBACK} tags can be attached to a feedback`,
    );
  }
  return [...seen];
};

const loadTagsForVenue = async (
  em: EntityManager,
  venueId: string,
  tagIds: string[],
): Promise<Tag[]> => {
  if (tagIds.length === 0) return [];
  // Tags must belong to the same Venue and be non-archived. A mismatch is a
  // 400 because the diner's client should only ever see the Venue's own
  // non-archived tags.
  const tags = await em.find(Tag, {
    id: { $in: tagIds },
    venue: { id: venueId },
    archivedAt: null,
  });
  if (tags.length !== tagIds.length) {
    throw new BadRequestException('One or more tagIds are invalid for this venue');
  }
  return tags;
};

// Postgres 40001; MikroORM may surface the code on the wrapper or only on driverError.
const isSerializationFailure = (err: unknown): boolean => {
  if (!err || typeof err !== 'object') return false;
  const code = (err as { code?: unknown }).code;
  if (code === '40001') return true;
  const driverError = (err as { driverError?: { code?: unknown } }).driverError;
  return driverError?.code === '40001';
};
