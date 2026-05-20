import { Anchor, Paper, Rating, Stack, Text, Title } from "@mantine/core";

interface FeedbackEntry {
	id: string;
	rating: number;
	comment?: string;
	reviewerName: string;
	createdAt: string;
}

interface RecentFeedbackListProps {
	feedback: FeedbackEntry[];
}

export const RecentFeedbackList = ({ feedback }: RecentFeedbackListProps) => {
	return (
		<Paper p="md" radius="md" withBorder>
			<Title order={5} mb="md">
				Ostatnie opinie
			</Title>

			{feedback.length === 0 ? (
				<Text c="dimmed" ta="center" py="lg">
					Brak opinii. Udostępnij swój kod QR, żeby zacząć je zbierać!
				</Text>
			) : (
				<Stack gap="sm">
					{feedback.map((entry) => (
						<Paper key={entry.id} p="sm" radius="sm" bg="dark.6">
							<Rating value={entry.rating} readOnly size="sm" />
							<Text size="sm" mt={4} lineClamp={2}>
								{entry.comment || (
									<Text span c="dimmed" fs="italic">
										Brak komentarza
									</Text>
								)}
							</Text>
							<Text size="xs" c="dimmed" mt={4}>
								{entry.reviewerName} &middot; {entry.createdAt}
							</Text>
						</Paper>
					))}

					<Anchor href="/console/feedback" size="sm" ta="center">
						Zobacz wszystkie opinie
					</Anchor>
				</Stack>
			)}
		</Paper>
	);
};
