import { Divider, Paper, Stack, Title } from "@mantine/core";
import { DiscountConfigForm } from "./components/discount-config-form";
import { RedeemCodeForm } from "./components/redeem-code-form";
import { RecentRedemptions } from "./components/recent-redemptions";

// TODO: Replace with API data
const mockRedemptions: {
	code: string;
	description: string;
	redeemedAt: string;
}[] = [];

export const DiscountsPage = () => {
	return (
		<Stack gap="lg">
			<Title order={3}>Discounts</Title>

			<Paper p="lg" radius="md" withBorder>
				<Title order={5} mb="md">
					Discount Configuration
				</Title>
				<DiscountConfigForm />
			</Paper>

			<Divider />

			<Paper p="lg" radius="md" withBorder>
				<Title order={5} mb="md">
					Redeem a Code
				</Title>
				<RedeemCodeForm />
			</Paper>

			<RecentRedemptions redemptions={mockRedemptions} />
		</Stack>
	);
};
