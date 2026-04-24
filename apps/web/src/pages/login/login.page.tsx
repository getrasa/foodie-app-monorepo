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

interface LoginFormValues {
	email: string;
	password: string;
}

export const LoginPage = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const form = useForm<LoginFormValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validate: {
			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value) ? null : "Please enter a valid email",
			password: (value) =>
				value.length >= 8 ? null : "Password must be at least 8 characters",
		},
	});

	const handleSubmit = async (values: LoginFormValues) => {
		setError(null);
		setLoading(true);

		const { error: signInError } = await authClient.signIn.email({
			email: values.email,
			password: values.password,
		});

		setLoading(false);

		if (signInError) {
			setError(signInError.message ?? "Invalid email or password");
			return;
		}

		void navigate({ to: "/" });
	};

	return (
		<Container size="xs" py="xl" px="md">
			<Stack gap="lg">
				<div>
					<Title order={2} ta="center">
						Welcome back
					</Title>
					<Text c="dimmed" ta="center" mt="xs">
						Sign in to your FeedbackBite account
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
								label="Email"
								placeholder="you@example.com"
								required
								{...form.getInputProps("email")}
							/>

							<PasswordInput
								label="Password"
								placeholder="Your password"
								required
								{...form.getInputProps("password")}
							/>

							<Button type="submit" fullWidth size="md" loading={loading}>
								Sign in
							</Button>

							<Text ta="center" size="sm">
								<Anchor href="/forgot-password">Forgot your password?</Anchor>
							</Text>
						</Stack>
					</form>
				</Paper>
			</Stack>
		</Container>
	);
};
