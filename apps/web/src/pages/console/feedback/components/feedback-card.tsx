import { Badge, Group, Paper, Rating, Text } from "@mantine/core";

interface FeedbackCardProps {
	rating: number;
	comment?: string;
	reviewerName: string;
	createdAt: string;
	discountStatus?: "active" | "redeemed" | "expired";
}

const statusColors: Record<string, string> = {
	active: "blue",
	redeemed: "green",
	expired: "gray",
};

const statusLabels: Record<string, string> = {
	active: "Code issued",
	redeemed: "Code redeemed",
	expired: "Code expired",
};

export const FeedbackCard = ({
	rating,
	comment,
	reviewerName,
	createdAt,
	discountStatus,
}: FeedbackCardProps) => {
	return (
		<Paper p="md" radius="md" withBorder>
			<Group justify="space-between" mb="xs">
				<Rating value={rating} readOnly size="sm" />
				{discountStatus && (
					<Badge color={statusColors[discountStatus]} variant="light" size="sm">
						{statusLabels[discountStatus]}
					</Badge>
				)}
			</Group>

			<Text size="sm">
				{comment || (
					<Text span c="dimmed" fs="italic">
						No comment left
					</Text>
				)}
			</Text>

			<Text size="xs" c="dimmed" mt="xs">
				{reviewerName} &middot; {createdAt}
			</Text>
		</Paper>
	);
};
