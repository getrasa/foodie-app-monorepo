import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Business } from '../entities/business.entity';
import { Venue } from '../entities/venue.entity';
import { QrCode } from '../entities/qr-code.entity';
import { User } from '../../auth/entities/user.entity';
import { OwnershipService } from './ownership.service';

export interface CreateBusinessInput {
  name: string;
  logo?: string;
}

export interface UpdateBusinessInput {
  name?: string;
  logo?: string | null;
  archived?: boolean;
}

@Injectable()
export class BusinessService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async create(userId: string, input: CreateBusinessInput): Promise<Business> {
    const name = input.name?.trim();
    if (!name) {
      throw new BadRequestException('Business name is required');
    }

    const owner = await this.em.findOne(User, { id: userId });
    if (!owner) {
      throw new NotFoundException('User not found');
    }

    const existing = await this.em.findOne(Business, { owner, archivedAt: null });
    if (existing) {
      throw new BadRequestException('User already has an active Business');
    }

    const business = this.em.create(
      Business,
      { owner, name, logo: input.logo },
      { partial: true },
    );

    // MVP: signup auto-creates one Venue with the same name as the Business.
    // See docs/adr/0001 + CONTEXT.md ("MVP UI hides it").
    const venue = this.em.create(Venue, { business, name }, { partial: true });

    // One label-less QrCode per Venue (see ADR-0004).
    const qrCode = this.em.create(QrCode, { venue }, { partial: true });

    await this.em.persistAndFlush([business, venue, qrCode]);
    return business;
  }

  async findForOwner(userId: string): Promise<Business | null> {
    return this.em.findOne(
      Business,
      { owner: { id: userId }, archivedAt: null },
      { populate: ['venues'] },
    );
  }

  async update(
    businessId: string,
    userId: string,
    input: UpdateBusinessInput,
  ): Promise<Business> {
    const business = await this.ownership.assertBusinessOwnership(businessId, userId);

    if (input.name !== undefined) {
      const trimmed = input.name.trim();
      if (!trimmed) {
        throw new BadRequestException('Business name cannot be empty');
      }
      business.name = trimmed;
    }
    if (input.logo !== undefined) {
      business.logo = input.logo ?? undefined;
    }
    if (input.archived !== undefined) {
      business.archivedAt = input.archived ? new Date() : undefined;
    }

    await this.em.flush();
    return business;
  }

  async completeOnboarding(businessId: string, userId: string): Promise<Business> {
    const business = await this.ownership.assertBusinessOwnership(businessId, userId);
    if (!business.onboardingCompletedAt) {
      business.onboardingCompletedAt = new Date();
      await this.em.flush();
    }
    return business;
  }
}
