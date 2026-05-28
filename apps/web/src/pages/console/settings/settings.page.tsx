import { Paper, Stack, Text, Title } from "@mantine/core";
import { useMyBusiness } from "#/lib/api/use-my-business";
import { RestaurantProfileForm } from "./components/restaurant-profile-form";
import { AccountSettings } from "./components/account-settings";
import { TagManager } from "./components/tag-manager";

export const SettingsPage = () => {
	const businessQuery = useMyBusiness();
	const venue = businessQuery.data?.venues?.[0];

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
				<Title order={5} mb={4}>
					Tagi opinii
				</Title>
				<Text size="sm" c="dimmed" mb="md">
					Krótkie etykiety, które gość może wybrać przy ocenie zamiast pisać
					komentarz.
				</Text>
				{venue ? (
					<TagManager venueId={venue.id} />
				) : (
					<Text size="sm" c="dimmed">
						Najpierw skonfiguruj swoją restaurację, by zarządzać tagami.
					</Text>
				)}
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
