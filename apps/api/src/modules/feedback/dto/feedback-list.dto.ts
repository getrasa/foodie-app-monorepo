import { Feedback } from '../entities/feedback.entity';
import {
  computeEffectiveVoucherStatus,
  VoucherStatus,
} from '../../voucher/entities/voucher.entity';

export interface FeedbackListVoucher {
  code: string;
  status: VoucherStatus;
  expiresAt: string | null;
}

export interface FeedbackListItem {
  id: string;
  rating: number;
  comment: string | null;
  customerEmail: string | null;
  createdAt: string;
  readAt: string | null;
  spamMarkedAt: string | null;
  archivedAt: string | null;
  voucher: FeedbackListVoucher | null;
}

export const toFeedbackListItem = (f: Feedback): FeedbackListItem => ({
  id: f.id,
  rating: f.rating,
  comment: f.comment ?? null,
  customerEmail: f.customerEmail ?? null,
  createdAt: f.createdAt.toISOString(),
  readAt: f.readAt?.toISOString() ?? null,
  spamMarkedAt: f.spamMarkedAt?.toISOString() ?? null,
  archivedAt: f.archivedAt?.toISOString() ?? null,
  voucher: f.voucher
    ? {
        code: f.voucher.code,
        status: computeEffectiveVoucherStatus(
          f.voucher.status,
          f.voucher.expiresAt,
        ),
        expiresAt: f.voucher.expiresAt?.toISOString() ?? null,
      }
    : null,
});
