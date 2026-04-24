import {
	Alert,
	Anchor,
	Button,
	Container,
	Paper,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

interface ForgotPasswordFormValues {
	email: string;
}

export const ForgotPasswordPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);

	const form = useForm<ForgotPasswordFormValues>({
		initialValues: {
			email: "",
		},
		validate: {
			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value) ? null : "Please enter a valid email",
		},
	});

	const handleSubmit = async (values: ForgotPasswordFormValues) => {
		setError(null);
		setLoading(true);

		const { error: forgotError } = await authClient.requestPasswordReset({
			email: values.email,
			redirectTo: "/reset-password",
		});

		setLoading(false);

		if (forgotError) {
			setError(
				forgotError.message ?? "Something went wrong. Please try again.",
			);
			return;
		}

		setSent(true);
	};

	return (
		<Container size="xs" py="xl" px="md">
			<Stack gap="lg">
				<div>
					<Title order={2} ta="center">
						Forgot your password?
					</Title>
					<Text c="dimmed" ta="center" mt="xs">
						Enter your email and we'll send you a reset link
					</Text>
				</div>

				<Paper shadow="sm" p="xl" radius="md" withBorder>
					{sent ? (
						<Stack gap="md" ta="center">
							<Alert color="green" variant="light">
								Check your email for a password reset link.
							</Alert>
							<Text size="sm">
								<Anchor href="/login">Back to sign in</Anchor>
							</Text>
						</Stack>
					) : (
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

								<Button type="submit" fullWidth size="md" loading={loading}>
									Send reset link
								</Button>

								<Text ta="center" size="sm">
									<Anchor href="/login">Back to sign in</Anchor>
								</Text>
							</Stack>
						</form>
					)}
				</Paper>
			</Stack>
		</Container>
	);
};
