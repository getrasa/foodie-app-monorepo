import { Alert } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";
import {
	brandInputStyle,
	brandPrimaryButtonStyle,
	brandSecondaryButtonStyle,
} from "./brand-styles";
import { FormLabel } from "./form-label";

interface PasswordFormState {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const EMPTY_FORM: PasswordFormState = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};

export const AccountSettings = () => {
	const { data: session } = authClient.useSession();
	const navigate = useNavigate();
	const [form, setForm] = useState<PasswordFormState>(EMPTY_FORM);
	const [errors, setErrors] = useState<Partial<Record<keyof PasswordFormState, string>>>({});
	const [banner, setBanner] = useState<{ kind: "success" | "error"; text: string } | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const dirty =
		form.currentPassword.length > 0 ||
		form.newPassword.length > 0 ||
		form.confirmPassword.length > 0;

	const update = <K extends keyof PasswordFormState>(key: K, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: undefined }));
		setBanner(null);
	};

	const validate = (): boolean => {
		const next: Partial<Record<keyof PasswordFormState, string>> = {};
		if (form.currentPassword.length < 8)
			next.currentPassword = "Hasło musi mieć co najmniej 8 znaków";
		if (form.newPassword.length < 8)
			next.newPassword = "Hasło musi mieć co najmniej 8 znaków";
		if (form.confirmPassword !== form.newPassword)
			next.confirmPassword = "Hasła nie pasują do siebie";
		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!dirty) return;
		if (!validate()) return;
		setSubmitting(true);
		const { error } = await authClient.changePassword({
			currentPassword: form.currentPassword,
			newPassword: form.newPassword,
			revokeOtherSessions: true,
		});
		setSubmitting(false);
		if (error) {
			if (error.code === "INVALID_PASSWORD") {
				setErrors({ currentPassword: "Aktualne hasło jest niepoprawne" });
				return;
			}
			setBanner({
				kind: "error",
				text: error.message ?? "Nie udało się zmienić hasła",
			});
			return;
		}
		setForm(EMPTY_FORM);
		setBanner({
			kind: "success",
			text: "Hasło zostało zmienione. Inne urządzenia zostały wylogowane.",
		});
	};

	const handleSignOut = async () => {
		await authClient.signOut();
		void navigate({ to: "/login" });
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
			<FormLabel label="Email" hint="Skontaktuj się z pomocą, żeby zmienić">
				<input
					value={session?.user.email ?? ""}
					disabled
					style={{
						...brandInputStyle(false),
						background: "rgba(31,26,21,0.04)",
						color: "rgba(31,26,21,0.55)",
						cursor: "not-allowed",
					}}
				/>
			</FormLabel>

			<div
				style={{
					height: 1,
					background: "rgba(31,26,21,0.08)",
					margin: "2px 0",
				}}
			/>

			<form onSubmit={(e) => void handleChangePassword(e)}>
				<div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "rgba(31,26,21,0.55)",
						}}
					>
						Zmień hasło
					</div>

					{banner && (
						<Alert
							color={banner.kind === "success" ? "olive" : "red"}
							variant="light"
						>
							{banner.text}
						</Alert>
					)}

					<FormLabel label="Aktualne hasło">
						<input
							type="password"
							value={form.currentPassword}
							onChange={(e) => update("currentPassword", e.target.value)}
							placeholder="Twoje aktualne hasło"
							style={brandInputStyle(!!errors.currentPassword)}
						/>
						{errors.currentPassword && (
							<FieldError text={errors.currentPassword} />
						)}
					</FormLabel>

					<FormLabel label="Nowe hasło">
						<input
							type="password"
							value={form.newPassword}
							onChange={(e) => update("newPassword", e.target.value)}
							placeholder="Co najmniej 8 znaków"
							style={brandInputStyle(!!errors.newPassword)}
						/>
						{errors.newPassword && <FieldError text={errors.newPassword} />}
					</FormLabel>

					<FormLabel label="Potwierdź nowe hasło">
						<input
							type="password"
							value={form.confirmPassword}
							onChange={(e) => update("confirmPassword", e.target.value)}
							placeholder="Powtórz nowe hasło"
							style={brandInputStyle(!!errors.confirmPassword)}
						/>
						{errors.confirmPassword && (
							<FieldError text={errors.confirmPassword} />
						)}
					</FormLabel>

					<div style={{ paddingTop: 2 }}>
						<button
							type="submit"
							disabled={!dirty || submitting}
							style={brandPrimaryButtonStyle(!dirty || submitting)}
						>
							{submitting ? "Zapisuję…" : "Zaktualizuj hasło"}
						</button>
					</div>
				</div>
			</form>

			<div
				style={{
					height: 1,
					background: "rgba(31,26,21,0.08)",
					margin: "2px 0",
				}}
			/>

			<div>
				<button
					type="button"
					onClick={() => void handleSignOut()}
					style={{
						...brandSecondaryButtonStyle(false),
						display: "inline-flex",
						alignItems: "center",
						gap: 8,
						color: "var(--fb-primary)",
						borderColor: "rgba(31,26,21,0.15)",
					}}
				>
					<LogOut size={14} />
					Wyloguj
				</button>
			</div>
		</div>
	);
};

const FieldError = ({ text }: { text: string }) => (
	<div
		style={{
			fontSize: 12,
			color: "var(--fb-primary)",
			marginTop: 6,
		}}
	>
		{text}
	</div>
);
