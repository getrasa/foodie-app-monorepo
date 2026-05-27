import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Venue } from '../entities/venue.entity';
import { OwnershipService } from './ownership.service';

export interface UpdateVenueInput {
  name?: string;
  address?: string | null;
  googlePlaceId?: string | null;
  googleMapsUrl?: string | null;
  archived?: boolean;
}

@Injectable()
export class VenueService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async findOne(venueId: string, userId: string): Promise<Venue> {
    return this.ownership.assertVenueOwnership(venueId, userId);
  }

  async update(venueId: string, userId: string, input: UpdateVenueInput): Promise<Venue> {
    const venue = await this.ownership.assertVenueOwnership(venueId, userId);

    if (input.name !== undefined) {
      const trimmed = input.name.trim();
      if (!trimmed) {
        throw new BadRequestException('Venue name cannot be empty');
      }
      venue.name = trimmed;
    }
    if (input.address !== undefined) {
      venue.address = input.address ?? undefined;
    }
    if (input.googlePlaceId !== undefined) {
      venue.googlePlaceId = input.googlePlaceId ?? undefined;
    }
    if (input.googleMapsUrl !== undefined) {
      venue.googleMapsUrl = input.googleMapsUrl ?? undefined;
    }
    if (input.archived !== undefined) {
      venue.archivedAt = input.archived ? new Date() : undefined;
    }

    await this.em.flush();
    return venue;
  }
}
