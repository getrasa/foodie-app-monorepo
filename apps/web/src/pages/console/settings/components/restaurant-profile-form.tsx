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
					: "Restaurant name must be at least 2 characters",
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
						Restaurant profile saved
					</Alert>
				)}

				<TextInput
					label="Restaurant name"
					placeholder="e.g. Mario's Trattoria"
					required
					{...form.getInputProps("name")}
				/>

				<Textarea
					label="Address"
					placeholder="123 Main St, City"
					minRows={2}
					{...form.getInputProps("address")}
				/>

				<TextInput
					label="Google Maps link"
					placeholder="Paste your Google Maps restaurant URL"
					description="Used to direct happy diners to leave you a Google review"
					{...form.getInputProps("googleMapsUrl")}
				/>

				<Button type="submit" size="md">
					Save profile
				</Button>
			</Stack>
		</form>
	);
};
