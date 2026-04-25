import { Group, Paper, Progress, Text, Title } from "@mantine/core";

interface RatingDistributionChartProps {
	distribution: Record<number, number>;
	total: number;
}

export const RatingDistributionChart = ({
	distribution,
	total,
}: RatingDistributionChartProps) => {
	return (
		<Paper p="md" radius="md" withBorder>
			<Title order={5} mb="md">
				Rating Distribution
			</Title>

			{total === 0 ? (
				<Text c="dimmed" ta="center" py="md">
					No reviews yet
				</Text>
			) : (
				[5, 4, 3, 2, 1].map((star) => {
					const count = distribution[star] ?? 0;
					const pct = (count / total) * 100;
					return (
						<Group key={star} gap="xs" mb="xs" wrap="nowrap">
							<Text size="sm" w={16} ta="right">
								{star}
							</Text>
							<Text size="xs" c="dimmed">
								&#9733;
							</Text>
							<Progress
								value={pct}
								color="orange"
								size="lg"
								radius="xl"
								style={{ flex: 1 }}
							/>
							<Text size="xs" c="dimmed" w={50} ta="right">
								{count} ({Math.round(pct)}%)
							</Text>
						</Group>
					);
				})
			)}
		</Paper>
	);
};
