import { apiClient } from "../api-client";

export type RewardType = "percentage" | "fixed_amount" | "free_item";

export interface VenueSummary {
	id: string;
	name: string;
	address: string | null;
	googlePlaceId: string | null;
	googleMapsUrl: string | null;
	archivedAt: string | null;
}

export interface Business {
	id: string;
	name: string;
	logo: string | null;
	onboardingCompletedAt: string | null;
	archivedAt: string | null;
	createdAt: string;
	updatedAt: string;
	venues?: VenueSummary[];
}

export interface RewardOffer {
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

export interface QrCode {
	id: string;
	venueId: string;
	label: string | null;
	active: boolean;
	createdAt: string;
}

export interface CreateBusinessInput {
	name: string;
	logo?: string;
}

export interface UpdateBusinessInput {
	name?: string;
	logo?: string | null;
	archived?: boolean;
}

export interface UpdateVenueInput {
	name?: string;
	address?: string | null;
	googlePlaceId?: string | null;
	googleMapsUrl?: string | null;
	archived?: boolean;
}

export interface UpsertRewardOfferInput {
	type: RewardType;
	value: string;
	expiresInDays: number | null;
	dailyCap: number | null;
	active: boolean;
}

export interface CreateQrCodeInput {
	label?: string | null;
}

export interface UpdateQrCodeInput {
	label?: string | null;
	active?: boolean;
}

export const venueApi = {
	createBusiness: (input: CreateBusinessInput) =>
		apiClient.post<Business>("/businesses", input),
	getMyBusiness: () => apiClient.get<Business>("/businesses/me"),
	updateBusiness: (id: string, input: UpdateBusinessInput) =>
		apiClient.patch<Business>(`/businesses/${id}`, input),
	completeOnboarding: (businessId: string) =>
		apiClient.post<Business>(`/businesses/${businessId}/complete-onboarding`),

	getVenue: (id: string) => apiClient.get<VenueSummary>(`/venues/${id}`),
	updateVenue: (id: string, input: UpdateVenueInput) =>
		apiClient.patch<VenueSummary>(`/venues/${id}`, input),

	getRewardOffer: (venueId: string) =>
		apiClient.get<RewardOffer | null>(`/venues/${venueId}/reward-offer`),
	upsertRewardOffer: (venueId: string, input: UpsertRewardOfferInput) =>
		apiClient.put<RewardOffer>(`/venues/${venueId}/reward-offer`, input),

	listQrCodes: (venueId: string) =>
		apiClient.get<QrCode[]>(`/venues/${venueId}/qr-codes`),
	createQrCode: (venueId: string, input: CreateQrCodeInput) =>
		apiClient.post<QrCode>(`/venues/${venueId}/qr-codes`, input),
	updateQrCode: (id: string, input: UpdateQrCodeInput) =>
		apiClient.patch<QrCode>(`/qr-codes/${id}`, input),
};
