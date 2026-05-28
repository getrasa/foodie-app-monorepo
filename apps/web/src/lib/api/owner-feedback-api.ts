import { apiClient } from "../api-client";
import type { RewardType } from "./venue-api";

export type VoucherStatus = "active" | "redeemed" | "expired" | "voided";

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

export interface FeedbackDetail {
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

export type RatingFilterParam = "all" | "low" | 1 | 2 | 3 | 4 | 5;
export type ReadFilterParam = "all" | "read" | "unread";
export type ArchivedFilterParam = "all" | "yes" | "no";

export interface FeedbackListParams {
	rating?: RatingFilterParam;
	read?: ReadFilterParam;
	archived?: ArchivedFilterParam;
	from?: string;
	to?: string;
	limit?: number;
}

const buildQuery = (params: FeedbackListParams): string => {
	const search = new URLSearchParams();
	if (params.rating !== undefined && params.rating !== "all") {
		search.set("rating", String(params.rating));
	}
	if (params.read && params.read !== "all") {
		search.set("read", params.read);
	}
	if (params.archived !== undefined) {
		search.set("archived", params.archived);
	}
	if (params.from) search.set("from", params.from);
	if (params.to) search.set("to", params.to);
	if (params.limit) search.set("limit", String(params.limit));
	const qs = search.toString();
	return qs ? `?${qs}` : "";
};

export interface UpdateFeedbackBody {
	read?: boolean;
	archived?: boolean;
}

export const ownerFeedbackApi = {
	list: (venueId: string, params: FeedbackListParams = {}) =>
		apiClient.get<FeedbackListItem[]>(
			`/venues/${venueId}/feedback${buildQuery(params)}`,
		),
	get: (id: string) => apiClient.get<FeedbackDetail>(`/feedback/${id}`),
	update: (id: string, body: UpdateFeedbackBody) =>
		apiClient.patch<FeedbackDetail>(`/feedback/${id}`, body),
	markSpam: (id: string) =>
		apiClient.post<FeedbackDetail>(`/feedback/${id}/mark-spam`),
};
