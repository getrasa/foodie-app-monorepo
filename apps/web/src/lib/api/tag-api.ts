import { apiClient } from "../api-client";

export interface Tag {
	id: string;
	venueId: string;
	label: string;
	sortOrder: number;
	archivedAt: string | null;
	createdAt: string;
}

export interface CreateTagInput {
	label: string;
	sortOrder?: number;
}

export interface UpdateTagInput {
	label?: string;
	sortOrder?: number;
}

export const tagApi = {
	listForVenue: (venueId: string, signal?: AbortSignal) =>
		apiClient.get<Tag[]>(`/venues/${venueId}/tags`, signal),
	create: (venueId: string, input: CreateTagInput) =>
		apiClient.post<Tag>(`/venues/${venueId}/tags`, input),
	update: (id: string, input: UpdateTagInput) =>
		apiClient.patch<Tag>(`/tags/${id}`, input),
	archive: (id: string) => apiClient.delete<void>(`/tags/${id}`),
};
