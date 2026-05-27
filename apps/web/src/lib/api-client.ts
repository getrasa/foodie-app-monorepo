const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

export class ApiError extends Error {
	constructor(
		message: string,
		readonly status: number,
		readonly body?: unknown,
	) {
		super(message);
		this.name = "ApiError";
	}
}

interface RequestOptions {
	method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
	body?: unknown;
	signal?: AbortSignal;
}

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
	const url = `${API_BASE_URL}${path}`;
	const response = await fetch(url, {
		method: options.method ?? "GET",
		credentials: "include",
		headers: options.body
			? { "Content-Type": "application/json" }
			: undefined,
		body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
		signal: options.signal,
	});

	if (response.status === 204) {
		return undefined as T;
	}

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

export const apiClient = {
	get: <T>(path: string, signal?: AbortSignal) =>
		request<T>(path, { method: "GET", signal }),
	post: <T>(path: string, body?: unknown) =>
		request<T>(path, { method: "POST", body }),
	patch: <T>(path: string, body?: unknown) =>
		request<T>(path, { method: "PATCH", body }),
	put: <T>(path: string, body?: unknown) =>
		request<T>(path, { method: "PUT", body }),
};

export const PUBLIC_BASE_URL =
	import.meta.env.VITE_PUBLIC_URL ??
	(typeof window !== "undefined" ? window.location.origin : "");
