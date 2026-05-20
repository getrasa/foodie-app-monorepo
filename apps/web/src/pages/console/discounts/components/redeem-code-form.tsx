import { Alert, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";

type RedeemResult =
	| { status: "valid"; description: string; issuedAt: string }
	| { status: "redeemed"; redeemedAt: string }
	| { status: "expired"; expiredAt: string }
	| { status: "not_found" }
	| null;

export const RedeemCodeForm = () => {
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<RedeemResult>(null);

	const handleVerify = async () => {
		if (!code.trim()) return;
		setLoading(true);
		setResult(null);

		// TODO: POST to API to verify code
		// Simulating not found for now
		await new Promise((r) => setTimeout(r, 500));
		setResult({ status: "not_found" });

		setLoading(false);
	};

	const handleConfirmRedeem = async () => {
		// TODO: POST to API to mark code as redeemed
		setResult(null);
		setCode("");
	};

	return (
		<Stack gap="md">
			<Group gap="sm" align="flex-end">
				<TextInput
					label="Wpisz kod rabatowy"
					placeholder="np. ABCD1234"
					value={code}
					onChange={(e) => setCode(e.currentTarget.value)}
					style={{ flex: 1 }}
					styles={{ input: { fontFamily: "monospace", letterSpacing: "0.1em" } }}
				/>
				<Button onClick={() => void handleVerify()} loading={loading}>
					Sprawdź
				</Button>
			</Group>

			{result?.status === "valid" && (
				<Alert color="green" variant="light">
					<Stack gap="xs">
						<Text size="sm" fw={500}>
							Kod ważny: {result.description}
						</Text>
						<Text size="xs" c="dimmed">
							Wydany: {result.issuedAt}
						</Text>
						<Button
							size="sm"
							color="green"
							onClick={() => void handleConfirmRedeem()}
						>
							Potwierdź realizację
						</Button>
					</Stack>
				</Alert>
			)}

			{result?.status === "redeemed" && (
				<Alert color="yellow" variant="light">
					Ten kod został już zrealizowany {result.redeemedAt}
				</Alert>
			)}

			{result?.status === "expired" && (
				<Alert color="red" variant="light">
					Ten kod wygasł {result.expiredAt}
				</Alert>
			)}

			{result?.status === "not_found" && (
				<Alert color="red" variant="light">
					Nie znaleziono kodu
				</Alert>
			)}
		</Stack>
	);
};
