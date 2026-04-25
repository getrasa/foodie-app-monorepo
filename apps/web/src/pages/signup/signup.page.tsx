import {
	Alert,
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

interface SignupFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const SignupPage = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const form = useForm<SignupFormValues>({
		initialValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate: {
			name: (value) =>
				value.trim().length >= 2 ? null : "Name must be at least 2 characters",
			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value) ? null : "Please enter a valid email",
			password: (value) =>
				value.length >= 8 ? null : "Password must be at least 8 characters",
			confirmPassword: (value, values) =>
				value === values.password ? null : "Passwords do not match",
		},
	});

	const handleSubmit = async (values: SignupFormValues) => {
		setError(null);
		setLoading(true);

		const { error: signUpError } = await authClient.signUp.email({
			name: values.name,
			email: values.email,
			password: values.password,
		});

		setLoading(false);

		if (signUpError) {
			setError(signUpError.message ?? "Something went wrong. Please try again.");
			return;
		}

		void navigate({ to: "/console/onboarding" });
	};

	return (
		<Container size="xs" py="xl" px="md">
			<Stack gap="lg">
				<div>
					<Title order={2} ta="center">
						Get started with FeedbackBite
					</Title>
					<Text c="dimmed" ta="center" mt="xs">
						Create your account and set up your restaurant in minutes
					</Text>
				</div>

				<Paper shadow="sm" p="xl" radius="md" withBorder>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Stack gap="md">
							{error && (
								<Alert color="red" variant="light">
									{error}
								</Alert>
							)}

							<TextInput
								label="Name"
								placeholder="Your name"
								required
								{...form.getInputProps("name")}
							/>

							<TextInput
								label="Email"
								placeholder="you@example.com"
								required
								{...form.getInputProps("email")}
							/>

							<PasswordInput
								label="Password"
								placeholder="At least 8 characters"
								required
								{...form.getInputProps("password")}
							/>

							<PasswordInput
								label="Confirm password"
								placeholder="Repeat your password"
								required
								{...form.getInputProps("confirmPassword")}
							/>

							<Button type="submit" fullWidth size="md" loading={loading}>
								Create account
							</Button>

							<Text ta="center" size="sm">
								Already have an account?{" "}
								<Anchor href="/login">Sign in</Anchor>
							</Text>
						</Stack>
					</form>
				</Paper>
			</Stack>
		</Container>
	);
};
