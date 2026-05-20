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
				value.length >= 8 ? null : "Hasło musi mieć co najmniej 8 znaków",
			newPassword: (value) =>
				value.length >= 8 ? null : "Hasło musi mieć co najmniej 8 znaków",
			confirmPassword: (value, values) =>
				value === values.newPassword ? null : "Hasła nie pasują do siebie",
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
				description="Skontaktuj się z pomocą, żeby zmienić adres email"
			/>

			<Divider my="sm" label="Zmień hasło" labelPosition="center" />

			{saved && (
				<Alert color="green" variant="light">
					Hasło zostało zmienione
				</Alert>
			)}

			<form onSubmit={form.onSubmit(handleChangePassword)}>
				<Stack gap="md">
					<PasswordInput
						label="Aktualne hasło"
						placeholder="Twoje aktualne hasło"
						required
						{...form.getInputProps("currentPassword")}
					/>

					<PasswordInput
						label="Nowe hasło"
						placeholder="Co najmniej 8 znaków"
						required
						{...form.getInputProps("newPassword")}
					/>

					<PasswordInput
						label="Potwierdź nowe hasło"
						placeholder="Powtórz nowe hasło"
						required
						{...form.getInputProps("confirmPassword")}
					/>

					<Button type="submit" size="md">
						Zaktualizuj hasło
					</Button>
				</Stack>
			</form>

			<Divider my="sm" />

			<Button
				variant="subtle"
				color="red"
				onClick={() => void handleSignOut()}
			>
				Wyloguj
			</Button>
		</Stack>
	);
};
