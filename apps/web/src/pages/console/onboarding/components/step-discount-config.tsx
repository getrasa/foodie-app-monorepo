import {
	Button,
	Group,
	NumberInput,
	SegmentedControl,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export type DiscountType = "percentage" | "fixed_amount" | "free_item";

export interface DiscountConfigValues {
	type: DiscountType;
	value: string;
	expiresInDays: number | "";
	dailyCap: number | "";
}

interface StepDiscountConfigProps {
	initialValues?: DiscountConfigValues;
	onNext: (values: DiscountConfigValues) => void;
	onBack: () => void;
}

const discountTypeLabels = [
	{ label: "Procent zniżki", value: "percentage" },
	{ label: "Kwota stała", value: "fixed_amount" },
	{ label: "Darmowy produkt", value: "free_item" },
];

export const StepDiscountConfig = ({
	initialValues,
	onNext,
	onBack,
}: StepDiscountConfigProps) => {
	const form = useForm<DiscountConfigValues>({
		initialValues: initialValues ?? {
			type: "percentage",
			value: "",
			expiresInDays: 30,
			dailyCap: "",
		},
		validate: {
			value: (value) =>
				value.trim().length > 0 ? null : "Podaj wartość rabatu",
		},
	});

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
		<form onSubmit={form.onSubmit(onNext)}>
			<Stack gap="md">
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

				<Group grow mt="sm">
					<Button variant="default" onClick={onBack}>
						Wstecz
					</Button>
					<Button type="submit">Dalej</Button>
				</Group>
			</Stack>
		</form>
	);
};
