import { Alert, Button, Divider, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

export const AccountSettings = () => {
	const { data: session } = authClient.useSession();
	const navigate = useNavigate();
	const [saved, setSaved] = useState(false);

	const form = useForm({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validate: {
			currentPassword: (value) =>
				value.length >= 8 ? null : "Password must be at least 8 characters",
			newPassword: (value) =>
				value.length >= 8 ? null : "Password must be at least 8 characters",
			confirmPassword: (value, values) =>
				value === values.newPassword ? null : "Passwords do not match",
		},
	});

	const handleChangePassword = (values: typeof form.values) => {
		// TODO: Call API to change password
		console.log("Change password:", values);
		form.reset();
		setSaved(true);
		setTimeout(() => setSaved(false), 3000);
	};

	const handleSignOut = async () => {
		await authClient.signOut();
		void navigate({ to: "/login" });
	};

	return (
		<Stack gap="md">
			<TextInput
				label="Email"
				value={session?.user.email ?? ""}
				disabled
				description="Contact support to change your email"
			/>

			<Divider my="sm" label="Change password" labelPosition="center" />

			{saved && (
				<Alert color="green" variant="light">
					Password updated successfully
				</Alert>
			)}

			<form onSubmit={form.onSubmit(handleChangePassword)}>
				<Stack gap="md">
					<PasswordInput
						label="Current password"
						placeholder="Your current password"
						required
						{...form.getInputProps("currentPassword")}
					/>

					<PasswordInput
						label="New password"
						placeholder="At least 8 characters"
						required
						{...form.getInputProps("newPassword")}
					/>

					<PasswordInput
						label="Confirm new password"
						placeholder="Repeat new password"
						required
						{...form.getInputProps("confirmPassword")}
					/>

					<Button type="submit" size="md">
						Update password
					</Button>
				</Stack>
			</form>

			<Divider my="sm" />

			<Button
				variant="subtle"
				color="red"
				onClick={() => void handleSignOut()}
			>
				Sign out
			</Button>
		</Stack>
	);
};
