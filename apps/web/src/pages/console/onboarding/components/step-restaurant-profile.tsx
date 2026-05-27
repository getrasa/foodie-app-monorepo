import { Alert, Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface RestaurantProfileValues {
	name: string;
	address: string;
	googleMapsUrl: string;
}

interface StepRestaurantProfileProps {
	initialValues?: RestaurantProfileValues;
	submitting?: boolean;
	error?: string | null;
	onNext: (values: RestaurantProfileValues) => void;
}

export const StepRestaurantProfile = ({
	initialValues,
	submitting,
	error,
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
					: "Nazwa restauracji musi mieć co najmniej 2 znaki",
		},
	});

	return (
		<form onSubmit={form.onSubmit(onNext)}>
			<Stack gap="md">
				{error && (
					<Alert color="red" variant="light">
						{error}
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
					description="Dzięki temu możemy kierować zadowolonych gości do wystawienia opinii w Google"
					{...form.getInputProps("googleMapsUrl")}
				/>

				<Button type="submit" fullWidth size="md" mt="sm" loading={submitting}>
					Dalej
				</Button>
			</Stack>
		</form>
	);
};
