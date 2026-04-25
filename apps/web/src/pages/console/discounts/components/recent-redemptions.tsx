import { Paper, Table, Text, Title } from "@mantine/core";

interface Redemption {
	code: string;
	description: string;
	redeemedAt: string;
}

interface RecentRedemptionsProps {
	redemptions: Redemption[];
}

export const RecentRedemptions = ({ redemptions }: RecentRedemptionsProps) => {
	return (
		<Paper p="md" radius="md" withBorder>
			<Title order={5} mb="md">
				Recent Redemptions
			</Title>

			{redemptions.length === 0 ? (
				<Text c="dimmed" ta="center" py="md">
					No codes redeemed yet
				</Text>
			) : (
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Code</Table.Th>
							<Table.Th>Discount</Table.Th>
							<Table.Th>Redeemed</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{redemptions.map((r) => (
							<Table.Tr key={r.code}>
								<Table.Td ff="monospace">{r.code}</Table.Td>
								<Table.Td>{r.description}</Table.Td>
								<Table.Td>{r.redeemedAt}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			)}
		</Paper>
	);
};
