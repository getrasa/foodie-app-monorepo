import { Voucher } from '../../voucher/entities/voucher.entity';
import { Feedback } from '../entities/feedback.entity';
import { RewardType } from '../../venue/entities/reward-offer.entity';

export type VoucherUnavailableReason =
  | 'no_offer'
  | 'offer_paused'
  | 'daily_cap_reached';

export interface SubmitFeedbackBody {
  rating: number;
  comment?: string | null;
  customerEmail?: string | null;
  tagIds?: string[];
}

export interface SubmitFeedbackVoucher {
  id: string;
  code: string;
  type: RewardType;
  value: string;
  description: string;
  expiresAt: string | null;
}

export interface SubmitFeedbackResponse {
  feedback: {
    id: string;
    rating: number;
    createdAt: string;
  };
  voucher: SubmitFeedbackVoucher | null;
  voucherUnavailableReason: VoucherUnavailableReason | null;
}

export const toSubmitFeedbackResponse = (
  feedback: Feedback,
  voucher: Voucher | null,
  voucherUnavailableReason: VoucherUnavailableReason | null,
): SubmitFeedbackResponse => ({
  feedback: {
    id: feedback.id,
    rating: feedback.rating,
    createdAt: feedback.createdAt.toISOString(),
  },
  voucher: voucher
    ? {
        id: voucher.id,
        code: voucher.code,
        type: voucher.type,
        value: voucher.value,
        description: voucher.description,
        expiresAt: voucher.expiresAt?.toISOString() ?? null,
      }
    : null,
  voucherUnavailableReason,
});
