import { QrCode } from '../../venue/entities/qr-code.entity';
import { RewardOffer, RewardType } from '../../venue/entities/reward-offer.entity';
import { Tag } from '../../venue/entities/tag.entity';
import { describeRewardOffer } from '../../voucher/services/reward-description';

export interface ResolveQrVenue {
  id: string;
  name: string;
  googleMapsUrl: string | null;
}

export interface ResolveQrRewardOffer {
  type: RewardType;
  value: string;
  description: string;
  expiresInDays: number | null;
  active: boolean;
}

export interface ResolveQrTag {
  id: string;
  label: string;
}

export interface ResolveQrResponse {
  qrCodeId: string;
  experience: 'feedback';
  venueId: string;
  venue: ResolveQrVenue;
  rewardOffer: ResolveQrRewardOffer | null;
  tags: ResolveQrTag[];
}

export const toResolveQrResponse = (
  qrCode: QrCode,
  rewardOffer: RewardOffer | null,
  tags: Tag[],
): ResolveQrResponse => {
  const venue = qrCode.venue;
  return {
    qrCodeId: qrCode.id,
    experience: 'feedback',
    venueId: venue.id,
    venue: {
      id: venue.id,
      name: venue.name,
      googleMapsUrl: venue.googleMapsUrl ?? null,
    },
    rewardOffer: rewardOffer
      ? {
          type: rewardOffer.type,
          value: rewardOffer.value,
          description: describeRewardOffer(rewardOffer.type, rewardOffer.value),
          expiresInDays: rewardOffer.expiresInDays ?? null,
          active: rewardOffer.active,
        }
      : null,
    tags: tags.map((t) => ({ id: t.id, label: t.label })),
  };
};
