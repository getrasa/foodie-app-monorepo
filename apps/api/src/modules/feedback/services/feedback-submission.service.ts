import {
  BadRequestException,
  GoneException,
  Injectable,
  Logger,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { QrCode } from '../../venue/entities/qr-code.entity';
import { RewardOffer } from '../../venue/entities/reward-offer.entity';
import { Voucher } from '../../voucher/entities/voucher.entity';
import { Feedback } from '../entities/feedback.entity';
import { AbuseStackService } from './abuse-stack.service';
import { generateVoucherCode } from '../../voucher/services/voucher-code';
import { describeRewardOffer } from '../../voucher/services/reward-description';
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
const MAX_COMMENT_LENGTH = 1000;
const MAX_EMAIL_LENGTH = 320;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Injectable()
export class FeedbackSubmissionService {
  private readonly logger = new Logger(FeedbackSubmissionService.name);

  constructor(
    private readonly em: EntityManager,
    private readonly abuseStack: AbuseStackService,
  ) {}

  async resolveQr(qrCodeId: string): Promise<{ qrCode: QrCode; offer: RewardOffer | null }> {
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
    return { qrCode, offer };
  }

  async submit(ctx: SubmitContext): Promise<SubmitOutcome> {
    const rating = ctx.body.rating;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be an integer between 1 and 5');
    }
    const comment = normalizeComment(ctx.body.comment);
    const customerEmail = normalizeEmail(ctx.body.customerEmail);

    const { qrCode, offer } = await this.resolveQr(ctx.qrCodeId);
    const venue = qrCode.venue;

    if (await this.abuseStack.checkIpHardBlock(venue.id, ctx.ipAddress)) {
      this.logger.warn(
        `IP hard-block fired: venue=${venue.id} ip=${ctx.ipAddress} qrCode=${qrCode.id}`,
      );
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.abuseStack.checkIpSoftAlarm(venue.id, ctx.ipAddress);

    let voucherUnavailableReason: VoucherUnavailableReason | null = null;
    if (!offer) {
      voucherUnavailableReason = 'no_offer';
    } else if (!offer.active) {
      voucherUnavailableReason = 'offer_paused';
    } else if (
      await this.abuseStack.isDailyCapReached(venue.id, ctx.deviceFingerprint, offer.dailyCap)
    ) {
      voucherUnavailableReason = 'daily_cap_reached';
    }

    const feedback = this.em.create(
      Feedback,
      {
        venue,
        qrCode,
        rating,
        comment,
        customerEmail,
        deviceFingerprint: ctx.deviceFingerprint ?? undefined,
        localStorageToken: ctx.localStorageToken ?? undefined,
        ipAddress: ctx.ipAddress ?? undefined,
        userAgent: ctx.userAgent ?? undefined,
      },
      { partial: true },
    );

    let voucher: Voucher | null = null;
    if (!voucherUnavailableReason && offer) {
      voucher = await this.createVoucher(venue.name, qrCode, feedback, offer);
    }

    // A single flush wraps both inserts in one DB transaction, matching the
    // commitment in PR-3's brief: "Voucher issuance happens in the same
    // transaction as Feedback creation".
    await this.em.persistAndFlush(voucher ? [feedback, voucher] : [feedback]);
    return { feedback, voucher, voucherUnavailableReason };
  }

  private async createVoucher(
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
      const exists = await this.em.findOne(Voucher, { code });
      if (exists) continue;
      return this.em.create(
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
