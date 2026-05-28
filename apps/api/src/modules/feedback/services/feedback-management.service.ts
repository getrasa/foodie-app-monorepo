import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, FilterQuery, LockMode } from '@mikro-orm/core';
import { Feedback } from '../entities/feedback.entity';
import { Voucher, VoucherStatus } from '../../voucher/entities/voucher.entity';
import { OwnershipService } from '../../venue/services/ownership.service';

export type RatingFilter = number | 'low' | 'all';
export type ReadFilter = 'unread' | 'read' | 'all';
export type ArchivedFilter = 'yes' | 'no' | 'all';

export interface FeedbackListFilters {
  rating?: RatingFilter;
  read?: ReadFilter;
  archived?: ArchivedFilter;
  from?: Date;
  to?: Date;
  limit?: number;
}

export interface UpdateFeedbackInput {
  read?: boolean;
  archived?: boolean;
}

const DEFAULT_LIMIT = 200;
const MAX_LIMIT = 500;

@Injectable()
export class FeedbackManagementService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async list(
    venueId: string,
    userId: string,
    filters: FeedbackListFilters,
  ): Promise<Feedback[]> {
    await this.ownership.assertVenueOwnership(venueId, userId);

    const where: FilterQuery<Feedback> = { venue: { id: venueId } };

    if (filters.rating === 'low') {
      where.rating = { $lte: 4 };
    } else if (typeof filters.rating === 'number') {
      if (
        !Number.isInteger(filters.rating) ||
        filters.rating < 1 ||
        filters.rating > 5
      ) {
        throw new BadRequestException(
          'rating must be an integer between 1 and 5, or "low"',
        );
      }
      where.rating = filters.rating;
    }

    if (filters.read === 'unread') {
      where.readAt = null;
    } else if (filters.read === 'read') {
      where.readAt = { $ne: null };
    }

    if (filters.archived === 'no' || filters.archived === undefined) {
      where.archivedAt = null;
    } else if (filters.archived === 'yes') {
      where.archivedAt = { $ne: null };
    }

    if (filters.from || filters.to) {
      const created: { $gte?: Date; $lte?: Date } = {};
      if (filters.from) created.$gte = filters.from;
      if (filters.to) created.$lte = filters.to;
      where.createdAt = created;
    }

    const limit = clampLimit(filters.limit);

    return this.em.find(Feedback, where, {
      orderBy: { createdAt: 'desc' },
      limit,
      populate: ['voucher'],
    });
  }

  async findOne(id: string, userId: string): Promise<Feedback> {
    const feedback = await this.loadOwned(id, userId);
    await this.em.populate(feedback, ['voucher', 'feedbackTags.tag']);
    return feedback;
  }

  async update(
    id: string,
    userId: string,
    input: UpdateFeedbackInput,
  ): Promise<Feedback> {
    const feedback = await this.loadOwned(id, userId);

    if (input.read !== undefined) {
      // Idempotent: only stamp readAt the first time; clearing reverts to unread.
      if (input.read && !feedback.readAt) {
        feedback.readAt = new Date();
      } else if (!input.read) {
        feedback.readAt = undefined;
      }
    }

    if (input.archived !== undefined) {
      if (input.archived && !feedback.archivedAt) {
        feedback.archivedAt = new Date();
      } else if (!input.archived) {
        feedback.archivedAt = undefined;
      }
    }

    await this.em.flush();
    await this.em.populate(feedback, ['voucher', 'feedbackTags.tag']);
    return feedback;
  }

  // Marks the Feedback as spam and, in the same transaction, voids the linked
  // Voucher — unless the Voucher is already in a terminal state (redeemed or
  // expired), in which case the spam mark applies but the Voucher's terminal
  // state is preserved. Idempotent w.r.t. the Feedback timestamp.
  async markSpam(id: string, userId: string): Promise<Feedback> {
    return this.em.transactional(async (em) => {
      const feedback = await em.findOne(
        Feedback,
        { id },
        { populate: ['venue.business.owner', 'qrCode'] },
      );
      if (!feedback) {
        throw new NotFoundException('Feedback not found');
      }
      this.ownership.assertOwnsVenue(feedback.venue, userId);

      if (!feedback.spamMarkedAt) {
        feedback.spamMarkedAt = new Date();
      }

      // Lock the voucher row so a concurrent cashier redemption can't slip a
      // status=REDEEMED commit between our read and write — without the lock
      // we could overwrite a terminal REDEEMED with VOIDED.
      const voucher = await em.findOne(
        Voucher,
        { feedback: feedback.id },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      );
      if (voucher && voucher.status === VoucherStatus.ACTIVE) {
        voucher.status = VoucherStatus.VOIDED;
        voucher.voidedAt = new Date();
      }

      await em.populate(feedback, ['voucher', 'feedbackTags.tag']);
      return feedback;
    });
  }

  private async loadOwned(id: string, userId: string): Promise<Feedback> {
    const feedback = await this.em.findOne(
      Feedback,
      { id },
      { populate: ['venue.business.owner', 'qrCode'] },
    );
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    this.ownership.assertOwnsVenue(feedback.venue, userId);
    return feedback;
  }
}

const clampLimit = (raw: number | undefined): number => {
  if (raw == null) return DEFAULT_LIMIT;
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_LIMIT;
  return Math.min(Math.floor(raw), MAX_LIMIT);
};
