import { RewardType } from '../../venue/entities/reward-offer.entity';

// Polish UI strings — see "Polish UI strings" in the PR handoff.
// Used both by the resolver (preview on the diner page) and the Voucher snapshot
// (per ADR-0003, description lives on the issued Voucher row).
export const describeRewardOffer = (type: RewardType, value: string): string => {
  const trimmed = value.trim();
  switch (type) {
    case RewardType.PERCENTAGE:
      return `${trimmed}% rabatu`;
    case RewardType.FIXED_AMOUNT:
      return `${trimmed} zł rabatu`;
    case RewardType.FREE_ITEM:
      return trimmed || 'Gratis';
    default:
      return trimmed;
  }
};
