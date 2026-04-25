import { Select, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { RatingTrendChart } from "./components/rating-trend-chart";
import { RatingDistributionChart } from "./components/rating-distribution-chart";
import { RedemptionRateCard } from "./components/redemption-rate-card";

// TODO: Replace with API data using React Query
const mockTrend: { week: string; average: number }[] = [];
const mockDistribution: Record<number, number> = {
	5: 0,
	4: 0,
	3: 0,
	2: 0,
	1: 0,
};

const dateRangeOptions = [
	{ label: "Last 30 days", value: "30" },
	{ label: "Last 90 days", value: "90" },
	{ label: "All time", value: "all" },
];

export const AnalyticsPage = () => {
	const [dateRange, setDateRange] = useState("30");

	return (
		<Stack gap="lg">
			<Title order={3}>Analytics</Title>

			<Select
				data={dateRangeOptions}
				value={dateRange}
				onChange={(v) => setDateRange(v ?? "30")}
				w={200}
			/>

			<RatingTrendChart data={mockTrend} />

			<RatingDistributionChart distribution={mockDistribution} total={0} />

			<RedemptionRateCard
				totalIssued={0}
				totalRedeemed={0}
				totalExpired={0}
			/>
		</Stack>
	);
};
