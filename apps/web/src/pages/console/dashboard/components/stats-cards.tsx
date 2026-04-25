import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { MessageSquare, Star, Ticket } from "lucide-react";

interface StatsCardsProps {
	totalReviews: number;
	averageRating: number;
	redemptionRate: number;
}

const statConfig = [
	{
		key: "totalReviews",
		label: "Total Reviews",
		icon: MessageSquare,
		format: (v: number) => v.toString(),
	},
	{
		key: "averageRating",
		label: "Average Rating",
		icon: Star,
		format: (v: number) => `${v.toFixed(1)} / 5`,
	},
	{
		key: "redemptionRate",
		label: "Redemption Rate",
		icon: Ticket,
		format: (v: number) => `${Math.round(v)}%`,
	},
] as const;

export const StatsCards = ({
	totalReviews,
	averageRating,
	redemptionRate,
}: StatsCardsProps) => {
	const values = { totalReviews, averageRating, redemptionRate };

	return (
		<SimpleGrid cols={{ base: 1, sm: 3 }}>
			{statConfig.map((stat) => (
				<Paper key={stat.key} p="md" radius="md" withBorder>
					<Group justify="space-between">
						<div>
							<Text size="xs" c="dimmed" tt="uppercase" fw={700}>
								{stat.label}
							</Text>
							<Text size="xl" fw={700} mt={4}>
								{stat.format(values[stat.key])}
							</Text>
						</div>
						<stat.icon
							size={28}
							style={{ color: "var(--mantine-color-orange-5)" }}
						/>
					</Group>
				</Paper>
			))}
		</SimpleGrid>
	);
};
