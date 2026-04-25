import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface RestaurantProfileValues {
	name: string;
	address: string;
	googleMapsUrl: string;
}

interface StepRestaurantProfileProps {
	initialValues?: RestaurantProfileValues;
	onNext: (values: RestaurantProfileValues) => void;
}

export const StepRestaurantProfile = ({
	initialValues,
	onNext,
}: StepRestaurantProfileProps) => {
	const form = useForm<RestaurantProfileValues>({
		initialValues: initialValues ?? {
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

	return (
		<form onSubmit={form.onSubmit(onNext)}>
			<Stack gap="md">
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
					description="This lets us direct happy diners to leave you a Google review"
					{...form.getInputProps("googleMapsUrl")}
				/>

				<Button type="submit" fullWidth size="md" mt="sm">
					Next
				</Button>
			</Stack>
		</form>
	);
};
