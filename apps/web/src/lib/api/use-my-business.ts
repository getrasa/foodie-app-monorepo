import { useQuery } from "@tanstack/react-query";
import { ApiError } from "../api-client";
import { venueApi, type Business } from "./venue-api";

export const MY_BUSINESS_QUERY_KEY = ["business", "me"] as const;

export const useMyBusiness = () =>
	useQuery<Business | null, Error>({
		queryKey: MY_BUSINESS_QUERY_KEY,
		queryFn: async () => {
			try {
				return await venueApi.getMyBusiness();
			} catch (err) {
				if (err instanceof ApiError && err.status === 404) {
					return null;
				}
				throw err;
			}
		},
		staleTime: 30 * 1000,
	});
