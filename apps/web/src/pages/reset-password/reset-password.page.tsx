import {
	Alert,
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

interface ResetPasswordFormValues {
	password: string;
	confirmPassword: string;
}

interface ResetPasswordPageProps {
	token: string;
}

export const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const form = useForm<ResetPasswordFormValues>({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validate: {
			password: (value) =>
				value.length >= 8 ? null : "Password must be at least 8 characters",
			confirmPassword: (value, values) =>
				value === values.password ? null : "Passwords do not match",
		},
	});

	const handleSubmit = async (values: ResetPasswordFormValues) => {
		setError(null);
		setLoading(true);

		const { error: resetError } = await authClient.resetPassword({
			newPassword: values.password,
			token,
		});

		setLoading(false);

		if (resetError) {
			setError(resetError.message ?? "Something went wrong. Please try again.");
			return;
		}

		void navigate({ to: "/login" });
	};

	return (
		<Container size="xs" py="xl" px="md">
			<Stack gap="lg">
				<div>
					<Title order={2} ta="center">
						Set a new password
					</Title>
					<Text c="dimmed" ta="center" mt="xs">
						Enter your new password below
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

							<PasswordInput
								label="New password"
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
								Reset password
							</Button>

							<Text ta="center" size="sm">
								<Anchor href="/login">Back to sign in</Anchor>
							</Text>
						</Stack>
					</form>
				</Paper>
			</Stack>
		</Container>
	);
};
