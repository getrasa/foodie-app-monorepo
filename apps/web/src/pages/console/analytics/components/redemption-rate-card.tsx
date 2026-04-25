import { Group, Paper, RingProgress, Stack, Text, Title } from "@mantine/core";

interface RedemptionRateCardProps {
	totalIssued: number;
	totalRedeemed: number;
	totalExpired: number;
}

export const RedemptionRateCard = ({
	totalIssued,
	totalRedeemed,
	totalExpired,
}: RedemptionRateCardProps) => {
	const rate = totalIssued > 0 ? (totalRedeemed / totalIssued) * 100 : 0;

	return (
		<Paper p="md" radius="md" withBorder>
			<Title order={5} mb="md">
				Discount Redemption
			</Title>

			{totalIssued === 0 ? (
				<Text c="dimmed" ta="center" py="md">
					No discount codes issued yet
				</Text>
			) : (
				<Group align="center" gap="xl">
					<RingProgress
						size={140}
						thickness={14}
						roundCaps
						sections={[{ value: rate, color: "orange" }]}
						label={
							<Text ta="center" fw={700} size="lg">
								{Math.round(rate)}%
							</Text>
						}
					/>

					<Stack gap="xs">
						<div>
							<Text size="xs" c="dimmed" tt="uppercase">
								Total Issued
							</Text>
							<Text fw={600}>{totalIssued}</Text>
						</div>
						<div>
							<Text size="xs" c="dimmed" tt="uppercase">
								Redeemed
							</Text>
							<Text fw={600} c="green">
								{totalRedeemed}
							</Text>
						</div>
						<div>
							<Text size="xs" c="dimmed" tt="uppercase">
								Expired
							</Text>
							<Text fw={600} c="red">
								{totalExpired}
							</Text>
						</div>
					</Stack>
				</Group>
			)}
		</Paper>
	);
};
