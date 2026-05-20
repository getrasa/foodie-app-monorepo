import { Alert, Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface RestaurantProfileFormValues {
	name: string;
	address: string;
	googleMapsUrl: string;
}

export const RestaurantProfileForm = () => {
	const [saved, setSaved] = useState(false);

	// TODO: Load current restaurant data from API
	const form = useForm<RestaurantProfileFormValues>({
		initialValues: {
			name: "",
			address: "",
			googleMapsUrl: "",
		},
		validate: {
			name: (value) =>
				value.trim().length >= 2
					? null
					: "Nazwa restauracji musi mieć co najmniej 2 znaki",
		},
	});

	const handleSubmit = (values: RestaurantProfileFormValues) => {
		// TODO: PUT restaurant profile to API
		console.log("Save restaurant profile:", values);
		setSaved(true);
		setTimeout(() => setSaved(false), 3000);
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="md">
				{saved && (
					<Alert color="green" variant="light">
						Profil restauracji zapisany
					</Alert>
				)}

				<TextInput
					label="Nazwa restauracji"
					placeholder="np. Trattoria u Mario"
					required
					{...form.getInputProps("name")}
				/>

				<Textarea
					label="Adres"
					placeholder="ul. Główna 123, Miasto"
					minRows={2}
					{...form.getInputProps("address")}
				/>

				<TextInput
					label="Link do Google Maps"
					placeholder="Wklej link Google Maps do swojej restauracji"
					description="Wykorzystywany, żeby kierować zadowolonych gości do wystawienia opinii w Google"
					{...form.getInputProps("googleMapsUrl")}
				/>

				<Button type="submit" size="md">
					Zapisz profil
				</Button>
			</Stack>
		</form>
	);
};
