import { apiClient } from "../api-client";

export type RatingDistribution = Record<"1" | "2" | "3" | "4" | "5", number>;

export interface RatingTrendBucket {
	date: string;
	avgRating: number;
	count: number;
}

export interface RedemptionRate {
	issued: number;
	redeemed: number;
	expired: number;
	voided: number;
	active: number;
	rate: number;
}

export interface AnalyticsRangeParams {
	from?: Date;
	to?: Date;
}

const buildRangeQuery = (params: AnalyticsRangeParams): string => {
	const search = new URLSearchParams();
	if (params.from) search.set("from", params.from.toISOString());
	if (params.to) search.set("to", params.to.toISOString());
	const qs = search.toString();
	return qs ? `?${qs}` : "";
};

export const analyticsApi = {
	ratingDistribution: (venueId: string, params: AnalyticsRangeParams) =>
		apiClient.get<RatingDistribution>(
			`/venues/${venueId}/analytics/rating-distribution${buildRangeQuery(params)}`,
		),
	ratingTrend: (venueId: string, params: AnalyticsRangeParams) =>
		apiClient.get<RatingTrendBucket[]>(
			`/venues/${venueId}/analytics/rating-trend${buildRangeQuery(params)}`,
		),
	redemptionRate: (venueId: string, params: AnalyticsRangeParams) =>
		apiClient.get<RedemptionRate>(
			`/venues/${venueId}/analytics/redemption-rate${buildRangeQuery(params)}`,
		),
};
