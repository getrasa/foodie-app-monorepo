import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { RewardOffer, RewardType } from '../entities/reward-offer.entity';
import { OwnershipService } from './ownership.service';

export interface UpsertRewardOfferInput {
  type: RewardType;
  value: string;
  expiresInDays?: number | null;
  dailyCap?: number | null;
  active: boolean;
}

const REWARD_TYPES: ReadonlySet<RewardType> = new Set([
  RewardType.PERCENTAGE,
  RewardType.FIXED_AMOUNT,
  RewardType.FREE_ITEM,
]);

const validate = (input: UpsertRewardOfferInput): void => {
  if (!REWARD_TYPES.has(input.type)) {
    throw new BadRequestException(`Unknown reward type: ${input.type}`);
  }
  const value = input.value?.trim();
  if (!value) {
    throw new BadRequestException('Reward value is required');
  }
  if (input.type === RewardType.PERCENTAGE) {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0 || n > 100) {
      throw new BadRequestException('Percentage must be between 1 and 100');
    }
  }
  if (input.type === RewardType.FIXED_AMOUNT) {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) {
      throw new BadRequestException('Fixed amount must be positive');
    }
  }
  if (input.expiresInDays != null) {
    if (!Number.isInteger(input.expiresInDays) || input.expiresInDays < 1) {
      throw new BadRequestException('expiresInDays must be a positive integer');
    }
  }
  if (input.dailyCap != null) {
    if (!Number.isInteger(input.dailyCap) || input.dailyCap < 1) {
      throw new BadRequestException('dailyCap must be a positive integer');
    }
  }
};

@Injectable()
export class RewardOfferService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async findForVenue(venueId: string, userId: string): Promise<RewardOffer | null> {
    await this.ownership.assertVenueOwnership(venueId, userId);
    return this.em.findOne(RewardOffer, { venue: { id: venueId } });
  }

  async upsert(
    venueId: string,
    userId: string,
    input: UpsertRewardOfferInput,
  ): Promise<RewardOffer> {
    const venue = await this.ownership.assertVenueOwnership(venueId, userId);
    validate(input);

    let offer = await this.em.findOne(RewardOffer, { venue });
    if (!offer) {
      offer = this.em.create(
        RewardOffer,
        {
          venue,
          type: input.type,
          value: input.value.trim(),
          expiresInDays: input.expiresInDays ?? undefined,
          dailyCap: input.dailyCap ?? undefined,
          active: input.active,
        },
        { partial: true },
      );
    } else {
      offer.type = input.type;
      offer.value = input.value.trim();
      offer.expiresInDays = input.expiresInDays ?? undefined;
      offer.dailyCap = input.dailyCap ?? undefined;
      offer.active = input.active;
    }

    await this.em.persistAndFlush(offer);
    return offer;
  }
}
