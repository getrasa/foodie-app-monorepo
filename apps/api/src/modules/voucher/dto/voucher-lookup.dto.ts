import { Feedback } from '../../feedback/entities/feedback.entity';
import { RewardType } from '../../venue/entities/reward-offer.entity';
import {
  computeEffectiveVoucherStatus,
  Voucher,
  VoucherStatus,
} from '../entities/voucher.entity';

export interface VoucherFeedbackSummary {
  id: string;
  rating: number;
  commentSnippet: string | null;
  createdAt: string;
  spamMarkedAt: string | null;
  tagLabels: string[];
}

export interface VoucherResponse {
  id: string;
  code: string;
  venueId: string;
  venueName: string;
  type: RewardType;
  value: string;
  description: string;
  status: VoucherStatus;
  expiresAt: string | null;
  redeemedAt: string | null;
  voidedAt: string | null;
  createdAt: string;
}

export interface VoucherLookupResponse {
  voucher: VoucherResponse;
  feedback: VoucherFeedbackSummary | null;
}

const COMMENT_SNIPPET_MAX = 140;

const buildSnippet = (comment: string | null | undefined): string | null => {
  if (!comment) return null;
  return comment.length > COMMENT_SNIPPET_MAX
    ? `${comment.slice(0, COMMENT_SNIPPET_MAX).trimEnd()}…`
    : comment;
};

export const toVoucherResponse = (v: Voucher): VoucherResponse => ({
  id: v.id,
  code: v.code,
  venueId: v.venue.id,
  venueName: v.venue.name,
  type: v.type,
  value: v.value,
  description: v.description,
  // Apply the effective-status check so a stored ACTIVE that's past its
  // expiresAt is reported as EXPIRED — keeps lookup and redeem responses
  // consistent regardless of when the nightly sweep last ran.
  status: computeEffectiveVoucherStatus(v.status, v.expiresAt),
  expiresAt: v.expiresAt?.toISOString() ?? null,
  redeemedAt: v.redeemedAt?.toISOString() ?? null,
  voidedAt: v.voidedAt?.toISOString() ?? null,
  createdAt: v.createdAt.toISOString(),
});

export const toFeedbackSummary = (f: Feedback): VoucherFeedbackSummary => {
  const tagLabels = f.feedbackTags.isInitialized()
    ? f.feedbackTags.getItems().map((ft) => ft.tag.label)
    : [];
  return {
    id: f.id,
    rating: f.rating,
    commentSnippet: buildSnippet(f.comment),
    createdAt: f.createdAt.toISOString(),
    spamMarkedAt: f.spamMarkedAt?.toISOString() ?? null,
    tagLabels,
  };
};

export const toVoucherLookupResponse = (v: Voucher): VoucherLookupResponse => ({
  voucher: toVoucherResponse(v),
  feedback: v.feedback ? toFeedbackSummary(v.feedback) : null,
});
