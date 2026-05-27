import { RewardOffer, RewardType } from '../entities/reward-offer.entity';

export interface RewardOfferResponse {
  id: string;
  venueId: string;
  type: RewardType;
  value: string;
  expiresInDays: number | null;
  dailyCap: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const toRewardOfferResponse = (offer: RewardOffer): RewardOfferResponse => ({
  id: offer.id,
  venueId: offer.venue.id,
  type: offer.type,
  value: offer.value,
  expiresInDays: offer.expiresInDays ?? null,
  dailyCap: offer.dailyCap ?? null,
  active: offer.active,
  createdAt: offer.createdAt.toISOString(),
  updatedAt: offer.updatedAt.toISOString(),
});
