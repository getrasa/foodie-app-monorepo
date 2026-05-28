import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, LockMode } from '@mikro-orm/core';
import { Voucher, VoucherStatus } from '../entities/voucher.entity';
import { OwnershipService } from '../../venue/services/ownership.service';

@Injectable()
export class VoucherService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async lookupByCode(code: string, userId: string): Promise<Voucher> {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      throw new NotFoundException('Voucher code not found');
    }
    const voucher = await this.em.findOne(
      Voucher,
      { code: normalized },
      {
        populate: [
          'venue.business.owner',
          'feedback',
          'feedback.feedbackTags.tag',
        ],
      },
    );
    if (!voucher) {
      throw new NotFoundException('Voucher code not found');
    }
    this.ownership.assertOwnsVenue(voucher.venue, userId);
    return voucher;
  }

  async redeem(id: string, userId: string): Promise<Voucher> {
    // Pessimistic write lock + transaction so two concurrent redemptions of
    // the same code serialise — the second one observes status=REDEEMED.
    return this.em.transactional(async (em) => {
      const voucher = await em.findOne(
        Voucher,
        { id },
        {
          populate: [
            'venue.business.owner',
            'feedback',
            'feedback.feedbackTags.tag',
          ],
          lockMode: LockMode.PESSIMISTIC_WRITE,
        },
      );
      if (!voucher) {
        throw new NotFoundException('Voucher not found');
      }
      this.ownership.assertOwnsVenue(voucher.venue, userId);

      const now = new Date();
      // Treat past-expiry actives as expired even if the nightly sweep hasn't
      // run yet — the sweep is a backstop, not the source of truth.
      const effectiveStatus =
        voucher.status === VoucherStatus.ACTIVE &&
        voucher.expiresAt &&
        voucher.expiresAt <= now
          ? VoucherStatus.EXPIRED
          : voucher.status;

      if (effectiveStatus !== VoucherStatus.ACTIVE) {
        // 409 Conflict carries the current state so the UI can render the right
        // message (already redeemed, expired, voided).
        throw new ConflictException({
          message: `Voucher is not active (current status: ${effectiveStatus})`,
          status: effectiveStatus,
        });
      }

      voucher.status = VoucherStatus.REDEEMED;
      voucher.redeemedAt = now;
      return voucher;
    });
  }
}
