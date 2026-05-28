import { Feedback } from '../entities/feedback.entity';
import { RewardType } from '../../venue/entities/reward-offer.entity';
import {
  computeEffectiveVoucherStatus,
  VoucherStatus,
} from '../../voucher/entities/voucher.entity';

export interface FeedbackDetailVoucher {
  id: string;
  code: string;
  type: RewardType;
  value: string;
  description: string;
  status: VoucherStatus;
  expiresAt: string | null;
  redeemedAt: string | null;
  voidedAt: string | null;
  createdAt: string;
}

export interface FeedbackDetailTag {
  id: string;
  label: string;
}

export interface FeedbackDetailResponse {
  id: string;
  venueId: string;
  rating: number;
  comment: string | null;
  customerEmail: string | null;
  createdAt: string;
  readAt: string | null;
  spamMarkedAt: string | null;
  archivedAt: string | null;
  qrCodeLabel: string | null;
  voucher: FeedbackDetailVoucher | null;
  tags: FeedbackDetailTag[];
}

export const toFeedbackDetailResponse = (
  f: Feedback,
): FeedbackDetailResponse => {
  const tagsList = f.feedbackTags.isInitialized()
    ? f.feedbackTags
        .getItems()
        .map((ft) => ({ id: ft.tag.id, label: ft.tag.label }))
    : [];

  return {
    id: f.id,
    venueId: f.venue.id,
    rating: f.rating,
    comment: f.comment ?? null,
    customerEmail: f.customerEmail ?? null,
    createdAt: f.createdAt.toISOString(),
    readAt: f.readAt?.toISOString() ?? null,
    spamMarkedAt: f.spamMarkedAt?.toISOString() ?? null,
    archivedAt: f.archivedAt?.toISOString() ?? null,
    qrCodeLabel: f.qrCode?.label ?? null,
    voucher: f.voucher
      ? {
          id: f.voucher.id,
          code: f.voucher.code,
          type: f.voucher.type,
          value: f.voucher.value,
          description: f.voucher.description,
          status: computeEffectiveVoucherStatus(
            f.voucher.status,
            f.voucher.expiresAt,
          ),
          expiresAt: f.voucher.expiresAt?.toISOString() ?? null,
          redeemedAt: f.voucher.redeemedAt?.toISOString() ?? null,
          voidedAt: f.voucher.voidedAt?.toISOString() ?? null,
          createdAt: f.voucher.createdAt.toISOString(),
        }
      : null,
    tags: tagsList,
  };
};
