import { Group, Paper, Progress, Text, Title } from "@mantine/core";

interface RatingSnapshotProps {
	distribution: Record<number, number>;
	total: number;
}

export const RatingSnapshot = ({ distribution, total }: RatingSnapshotProps) => {
	return (
		<Paper p="md" radius="md" withBorder>
			<Title order={5} mb="md">
				Rating Distribution
			</Title>
			{[5, 4, 3, 2, 1].map((star) => {
				const count = distribution[star] ?? 0;
				const pct = total > 0 ? (count / total) * 100 : 0;
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
						<Text size="sm" c="dimmed" w={30} ta="right">
							{count}
						</Text>
					</Group>
				);
			})}
		</Paper>
	);
};
