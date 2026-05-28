import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Tag } from '../entities/tag.entity';
import { OwnershipService } from './ownership.service';

export interface CreateTagInput {
  label: string;
  sortOrder?: number | null;
}

export interface UpdateTagInput {
  label?: string;
  sortOrder?: number;
}

const MAX_LABEL_LENGTH = 64;

const normalizeLabel = (raw: string | undefined): string => {
  const trimmed = (raw ?? '').trim();
  if (!trimmed) {
    throw new BadRequestException('Tag label is required');
  }
  if (trimmed.length > MAX_LABEL_LENGTH) {
    throw new BadRequestException(
      `Tag label must be ${MAX_LABEL_LENGTH} characters or fewer`,
    );
  }
  return trimmed;
};

@Injectable()
export class TagService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async listForVenue(venueId: string, userId: string): Promise<Tag[]> {
    await this.ownership.assertVenueOwnership(venueId, userId);
    return this.em.find(
      Tag,
      { venue: { id: venueId }, archivedAt: null },
      { orderBy: { sortOrder: 'ASC', createdAt: 'ASC' } },
    );
  }

  async create(
    venueId: string,
    userId: string,
    input: CreateTagInput,
  ): Promise<Tag> {
    const venue = await this.ownership.assertVenueOwnership(venueId, userId);
    const label = normalizeLabel(input.label);

    let sortOrder = input.sortOrder ?? null;
    if (sortOrder == null) {
      // Default to max(existing sortOrder) + 1 so new tags land at the bottom.
      // Archived tags are still considered so we don't reuse a slot that the
      // owner may un-archive later by reordering manually.
      const tags = await this.em.find(
        Tag,
        { venue: { id: venueId } },
        { fields: ['sortOrder'] },
      );
      const max = tags.reduce(
        (acc, t) => (t.sortOrder > acc ? t.sortOrder : acc),
        -1,
      );
      sortOrder = max + 1;
    }

    const tag = this.em.create(
      Tag,
      { venue, label, sortOrder },
      { partial: true },
    );
    await this.em.persistAndFlush(tag);
    return tag;
  }

  async update(
    tagId: string,
    userId: string,
    input: UpdateTagInput,
  ): Promise<Tag> {
    const tag = await this.loadOwned(tagId, userId);

    if (input.label !== undefined) {
      tag.label = normalizeLabel(input.label);
    }
    if (input.sortOrder !== undefined) {
      if (!Number.isInteger(input.sortOrder) || input.sortOrder < 0) {
        throw new BadRequestException('sortOrder must be a non-negative integer');
      }
      tag.sortOrder = input.sortOrder;
    }

    await this.em.flush();
    return tag;
  }

  // Soft-delete via archivedAt — keeps FeedbackTag history intact.
  async archive(tagId: string, userId: string): Promise<Tag> {
    const tag = await this.loadOwned(tagId, userId);
    if (!tag.archivedAt) {
      tag.archivedAt = new Date();
      await this.em.flush();
    }
    return tag;
  }

  private async loadOwned(tagId: string, userId: string): Promise<Tag> {
    const tag = await this.em.findOne(
      Tag,
      { id: tagId },
      { populate: ['venue.business.owner'] },
    );
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    this.ownership.assertOwnsVenue(tag.venue, userId);
    return tag;
  }
}
