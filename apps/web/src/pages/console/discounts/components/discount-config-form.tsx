import {
	Alert,
	Button,
	NumberInput,
	SegmentedControl,
	Stack,
	Switch,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export type DiscountType = "percentage" | "fixed_amount" | "free_item";

interface DiscountConfigFormValues {
	type: DiscountType;
	value: string;
	expiresInDays: number | "";
	dailyCap: number | "";
	active: boolean;
}

const discountTypeLabels = [
	{ label: "Procent zniżki", value: "percentage" },
	{ label: "Kwota stała", value: "fixed_amount" },
	{ label: "Darmowy produkt", value: "free_item" },
];

export const DiscountConfigForm = () => {
	const [saved, setSaved] = useState(false);

	// TODO: Load current config from API
	const form = useForm<DiscountConfigFormValues>({
		initialValues: {
			type: "percentage",
			value: "",
			expiresInDays: 30,
			dailyCap: "",
			active: true,
		},
		validate: {
			value: (value) =>
				value.trim().length > 0 ? null : "Podaj wartość rabatu",
		},
	});

	const handleSubmit = (values: DiscountConfigFormValues) => {
		// TODO: PUT discount config to API
		console.log("Save discount config:", values);
		setSaved(true);
		setTimeout(() => setSaved(false), 3000);
	};

	const valuePlaceholder = () => {
		switch (form.values.type) {
			case "percentage":
				return "np. 10";
			case "fixed_amount":
				return "np. 5,00";
			case "free_item":
				return "np. Darmowy deser";
		}
	};

	const valueLabel = () => {
		switch (form.values.type) {
			case "percentage":
				return "Procent rabatu";
			case "fixed_amount":
				return "Kwota rabatu";
			case "free_item":
				return "Opis darmowego produktu";
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="md">
				{saved && (
					<Alert color="green" variant="light">
						Konfiguracja rabatu zapisana
					</Alert>
				)}

				<div>
					<Text size="sm" fw={500} mb={4}>
						Rodzaj rabatu
					</Text>
					<SegmentedControl
						fullWidth
						data={discountTypeLabels}
						{...form.getInputProps("type")}
					/>
				</div>

				<TextInput
					label={valueLabel()}
					placeholder={valuePlaceholder()}
					required
					{...form.getInputProps("value")}
				/>

				<NumberInput
					label="Kod wygasa po (dni)"
					placeholder="30"
					description="Zostaw puste, żeby nie wygasał"
					min={1}
					{...form.getInputProps("expiresInDays")}
				/>

				<NumberInput
					label="Dzienny limit"
					placeholder="Bez limitu"
					description="Maks. kodów rabatowych dziennie. Zostaw puste, żeby bez limitu"
					min={1}
					{...form.getInputProps("dailyCap")}
				/>

				<Switch
					label="Rabaty aktywne"
					description="Wstrzymaj rabaty tymczasowo bez usuwania konfiguracji"
					{...form.getInputProps("active", { type: "checkbox" })}
				/>

				<Button type="submit" size="md">
					Zapisz konfigurację
				</Button>
			</Stack>
		</form>
	);
};
