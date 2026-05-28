import { apiClient } from "../api-client";
import type { VoucherStatus } from "./owner-feedback-api";
import type { RewardType } from "./venue-api";

export interface VoucherSummary {
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

export interface VoucherFeedbackSummary {
	id: string;
	rating: number;
	commentSnippet: string | null;
	createdAt: string;
	spamMarkedAt: string | null;
	tagLabels: string[];
}

export interface VoucherLookupResult {
	voucher: VoucherSummary;
	feedback: VoucherFeedbackSummary | null;
}

export const voucherApi = {
	lookupByCode: (code: string) =>
		apiClient.get<VoucherLookupResult>(
			`/vouchers/by-code/${encodeURIComponent(code)}`,
		),
	redeem: (id: string) =>
		apiClient.post<VoucherSummary>(`/vouchers/${id}/redeem`),
};
