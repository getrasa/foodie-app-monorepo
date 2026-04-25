import { Stack, Title } from "@mantine/core";
import { StatsCards } from "./components/stats-cards";
import { RatingSnapshot } from "./components/rating-snapshot";
import { RecentFeedbackList } from "./components/recent-feedback-list";

// TODO: Replace mock data with API calls using React Query
const mockStats = {
	totalReviews: 0,
	averageRating: 0,
	redemptionRate: 0,
};

const mockDistribution: Record<number, number> = {
	5: 0,
	4: 0,
	3: 0,
	2: 0,
	1: 0,
};

const mockFeedback: {
	id: string;
	rating: number;
	comment?: string;
	reviewerName: string;
	createdAt: string;
}[] = [];

export const DashboardPage = () => {
	return (
		<Stack gap="lg">
			<Title order={3}>Dashboard</Title>

			<StatsCards
				totalReviews={mockStats.totalReviews}
				averageRating={mockStats.averageRating}
				redemptionRate={mockStats.redemptionRate}
			/>

			<RatingSnapshot
				distribution={mockDistribution}
				total={mockStats.totalReviews}
			/>

			<RecentFeedbackList feedback={mockFeedback} />
		</Stack>
	);
};
