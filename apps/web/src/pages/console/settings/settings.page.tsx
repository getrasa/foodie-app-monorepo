import { Paper, Stack, Title } from "@mantine/core";
import { RestaurantProfileForm } from "./components/restaurant-profile-form";
import { AccountSettings } from "./components/account-settings";

export const SettingsPage = () => {
	return (
		<Stack gap="lg">
			<Title order={3}>Ustawienia</Title>

			<Paper p="lg" radius="md" withBorder>
				<Title order={5} mb="md">
					Profil restauracji
				</Title>
				<RestaurantProfileForm />
			</Paper>

			<Paper p="lg" radius="md" withBorder>
				<Title order={5} mb="md">
					Konto
				</Title>
				<AccountSettings />
			</Paper>
		</Stack>
	);
};
