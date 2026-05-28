import { ApiError } from "../api-client";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

export type RewardType = "percentage" | "fixed_amount" | "free_item";

export interface ResolvedVenue {
	id: string;
	name: string;
	googleMapsUrl: string | null;
}

export interface ResolvedRewardOffer {
	type: RewardType;
	value: string;
	description: string;
	expiresInDays: number | null;
	active: boolean;
}

export interface ResolvedTag {
	id: string;
	label: string;
}

export interface ResolvedQrCode {
	qrCodeId: string;
	experience: "feedback";
	venueId: string;
	venue: ResolvedVenue;
	rewardOffer: ResolvedRewardOffer | null;
	tags: ResolvedTag[];
}

export type VoucherUnavailableReason =
	| "no_offer"
	| "offer_paused"
	| "daily_cap_reached";

export interface IssuedVoucher {
	id: string;
	code: string;
	type: RewardType;
	value: string;
	description: string;
	expiresAt: string | null;
}

export interface FeedbackSubmissionResult {
	feedback: { id: string; rating: number; createdAt: string };
	voucher: IssuedVoucher | null;
	voucherUnavailableReason: VoucherUnavailableReason | null;
}

export interface FeedbackSubmissionInput {
	rating: number;
	comment?: string | null;
	customerEmail?: string | null;
	tagIds?: string[];
	deviceFingerprint: string | null;
	localStorageToken: string | null;
}

export const resolveQrCode = async (
	qrCodeId: string,
	signal?: AbortSignal,
): Promise<ResolvedQrCode> => {
	const response = await fetch(`${API_BASE_URL}/q/${encodeURIComponent(qrCodeId)}/resolve`, {
		method: "GET",
		credentials: "omit",
		signal,
	});
	return parseJson<ResolvedQrCode>(response);
};

export const submitFeedback = async (
	qrCodeId: string,
	input: FeedbackSubmissionInput,
): Promise<FeedbackSubmissionResult> => {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	if (input.deviceFingerprint) {
		headers["x-device-fingerprint"] = input.deviceFingerprint;
	}
	if (input.localStorageToken) {
		headers["x-localstorage-token"] = input.localStorageToken;
	}
	const body = {
		rating: input.rating,
		comment: input.comment ?? null,
		customerEmail: input.customerEmail ?? null,
		tagIds: input.tagIds,
	};
	const response = await fetch(`${API_BASE_URL}/q/${encodeURIComponent(qrCodeId)}/feedback`, {
		method: "POST",
		credentials: "omit",
		headers,
		body: JSON.stringify(body),
	});
	return parseJson<FeedbackSubmissionResult>(response);
};

const parseJson = async <T>(response: Response): Promise<T> => {
	const text = await response.text();
	const data: unknown = text ? JSON.parse(text) : null;
	if (!response.ok) {
		let message = `Request failed: ${response.status}`;
		if (
			data &&
			typeof data === "object" &&
			"message" in data &&
			typeof (data as { message: unknown }).message === "string"
		) {
			message = (data as { message: string }).message;
		}
		throw new ApiError(message, response.status, data);
	}
	return data as T;
};
