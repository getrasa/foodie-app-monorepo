import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { QrCode } from '../entities/qr-code.entity';
import { OwnershipService } from './ownership.service';

export interface CreateQrCodeInput {
  label?: string | null;
}

export interface UpdateQrCodeInput {
  label?: string | null;
  active?: boolean;
}

@Injectable()
export class QrCodeService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async listForVenue(venueId: string, userId: string): Promise<QrCode[]> {
    await this.ownership.assertVenueOwnership(venueId, userId);
    return this.em.find(QrCode, { venue: { id: venueId } }, { orderBy: { createdAt: 'ASC' } });
  }

  async create(venueId: string, userId: string, input: CreateQrCodeInput): Promise<QrCode> {
    const venue = await this.ownership.assertVenueOwnership(venueId, userId);
    const label = input.label?.trim() || undefined;
    const qrCode = this.em.create(QrCode, { venue, label }, { partial: true });
    await this.em.persistAndFlush(qrCode);
    return qrCode;
  }

  async update(qrCodeId: string, userId: string, input: UpdateQrCodeInput): Promise<QrCode> {
    const qrCode = await this.ownership.assertQrCodeOwnership(qrCodeId, userId);
    if (input.label !== undefined) {
      qrCode.label = input.label?.trim() || undefined;
    }
    if (input.active !== undefined) {
      qrCode.active = input.active;
    }
    await this.em.flush();
    return qrCode;
  }
}
