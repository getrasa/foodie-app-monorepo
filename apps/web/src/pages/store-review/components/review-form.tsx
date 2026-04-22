import {
	Button,
	Rating,
	Stack,
	Text,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export interface ReviewFormValues {
	rating: number;
	review: string;
	name: string;
	email: string;
}

interface ReviewFormProps {
	onSubmit: (values: ReviewFormValues) => void;
}

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
	const form = useForm<ReviewFormValues>({
		initialValues: {
			rating: 0,
			review: "",
			name: "",
			email: "",
		},
		validate: {
			rating: (value) => (value < 1 ? "Please select a rating" : null),
			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value) ? null : "Please enter a valid email",
		},
	});

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap="lg">
				<div>
					<Title order={2} ta="center">
						How was your experience?
					</Title>
					<Text c="dimmed" ta="center" mt="xs">
						We'd love to hear your feedback
					</Text>
				</div>

				<Stack gap="xs" align="center">
					<Rating size="xl" {...form.getInputProps("rating")} />
					{form.errors.rating && (
						<Text c="red" size="sm">
							{form.errors.rating}
						</Text>
					)}
				</Stack>

				<Textarea
					label="Your review"
					placeholder="Tell us about your experience..."
					minRows={3}
					{...form.getInputProps("review")}
				/>

				<TextInput
					label="Your name"
					placeholder="John Doe"
					{...form.getInputProps("name")}
				/>

				<TextInput
					label="Email"
					placeholder="you@example.com"
					required
					{...form.getInputProps("email")}
				/>

				<Button type="submit" fullWidth size="md" mt="sm">
					Submit Review
				</Button>
			</Stack>
		</form>
	);
};
