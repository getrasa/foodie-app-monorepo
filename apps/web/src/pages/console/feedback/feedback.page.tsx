import { Pagination, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { FeedbackFilters } from "./components/feedback-filters";
import { FeedbackCard } from "./components/feedback-card";

// TODO: Replace mock data with API calls using React Query
const mockFeedback: {
	id: string;
	rating: number;
	comment?: string;
	reviewerName: string;
	createdAt: string;
	discountStatus?: "active" | "redeemed" | "expired";
}[] = [];

export const FeedbackPage = () => {
	const [ratingFilter, setRatingFilter] = useState("all");
	const [dateRange, setDateRange] = useState("all");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	// TODO: Wire up filtering to API query params
	const filtered = mockFeedback;
	const totalPages = Math.max(1, Math.ceil(filtered.length / 10));

	return (
		<Stack gap="lg">
			<Title order={3}>Feedback</Title>

			<FeedbackFilters
				ratingFilter={ratingFilter}
				onRatingFilterChange={setRatingFilter}
				dateRange={dateRange}
				onDateRangeChange={(v) => setDateRange(v ?? "all")}
				search={search}
				onSearchChange={setSearch}
			/>

			{filtered.length === 0 ? (
				<Text c="dimmed" ta="center" py="xl">
					No feedback yet. Share your QR code to start collecting reviews!
				</Text>
			) : (
				<Stack gap="sm">
					{filtered.map((entry) => (
						<FeedbackCard
							key={entry.id}
							rating={entry.rating}
							comment={entry.comment}
							reviewerName={entry.reviewerName}
							createdAt={entry.createdAt}
							discountStatus={entry.discountStatus}
						/>
					))}
				</Stack>
			)}

			{filtered.length > 0 && (
				<Pagination
					total={totalPages}
					value={page}
					onChange={setPage}
					mx="auto"
				/>
			)}
		</Stack>
	);
};
