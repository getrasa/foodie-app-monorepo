import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
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
    const voucher = await this.em.findOne(
      Voucher,
      { id },
      {
        populate: [
          'venue.business.owner',
          'feedback',
          'feedback.feedbackTags.tag',
        ],
      },
    );
    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }
    this.ownership.assertOwnsVenue(voucher.venue, userId);

    if (voucher.status !== VoucherStatus.ACTIVE) {
      // 409 Conflict carries the current state so the UI can render the right
      // message (already redeemed, expired, voided).
      throw new ConflictException({
        message: `Voucher is not active (current status: ${voucher.status})`,
        status: voucher.status,
      });
    }

    voucher.status = VoucherStatus.REDEEMED;
    voucher.redeemedAt = new Date();
    await this.em.flush();
    return voucher;
  }
}
