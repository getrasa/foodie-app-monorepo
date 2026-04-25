import { Group, Paper, Progress, Stack, Text, Title } from "@mantine/core";

interface WeeklyAverage {
	week: string;
	average: number;
}

interface RatingTrendChartProps {
	data: WeeklyAverage[];
}

export const RatingTrendChart = ({ data }: RatingTrendChartProps) => {
	return (
		<Paper p="md" radius="md" withBorder>
			<Title order={5} mb="md">
				Rating Trend
			</Title>

			{data.length === 0 ? (
				<Text c="dimmed" ta="center" py="md">
					Not enough data yet
				</Text>
			) : (
				<Stack gap="xs">
					{data.map((entry) => (
						<Group key={entry.week} gap="xs" wrap="nowrap">
							<Text size="xs" c="dimmed" w={70}>
								{entry.week}
							</Text>
							<Progress
								value={(entry.average / 5) * 100}
								color="orange"
								size="lg"
								radius="xl"
								style={{ flex: 1 }}
							/>
							<Text size="sm" fw={500} w={30} ta="right">
								{entry.average.toFixed(1)}
							</Text>
						</Group>
					))}
				</Stack>
			)}
		</Paper>
	);
};
