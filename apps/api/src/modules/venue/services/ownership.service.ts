import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Business } from '../entities/business.entity';
import { Venue } from '../entities/venue.entity';
import { QrCode } from '../entities/qr-code.entity';

@Injectable()
export class OwnershipService {
  constructor(private readonly em: EntityManager) {}

  async assertBusinessOwnership(businessId: string, userId: string): Promise<Business> {
    const business = await this.em.findOne(Business, { id: businessId }, { populate: ['owner'] });
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    if (business.owner.id !== userId) {
      throw new ForbiddenException('You do not own this Business');
    }
    return business;
  }

  async assertVenueOwnership(venueId: string, userId: string): Promise<Venue> {
    const venue = await this.em.findOne(Venue, { id: venueId }, { populate: ['business.owner'] });
    if (!venue) {
      throw new NotFoundException('Venue not found');
    }
    if (venue.business.owner.id !== userId) {
      throw new ForbiddenException('You do not own this Venue');
    }
    return venue;
  }

  async assertQrCodeOwnership(qrCodeId: string, userId: string): Promise<QrCode> {
    const qrCode = await this.em.findOne(
      QrCode,
      { id: qrCodeId },
      { populate: ['venue.business.owner'] },
    );
    if (!qrCode) {
      throw new NotFoundException('QrCode not found');
    }
    if (qrCode.venue.business.owner.id !== userId) {
      throw new ForbiddenException('You do not own this QrCode');
    }
    return qrCode;
  }
}
