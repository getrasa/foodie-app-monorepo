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
	{ label: "Percentage off", value: "percentage" },
	{ label: "Fixed amount", value: "fixed_amount" },
	{ label: "Free item", value: "free_item" },
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
				value.trim().length > 0 ? null : "Please enter a discount value",
		},
	});

	const valuePlaceholder = () => {
		switch (form.values.type) {
			case "percentage":
				return "e.g. 10";
			case "fixed_amount":
				return "e.g. 5.00";
			case "free_item":
				return "e.g. Free dessert";
		}
	};

	const valueLabel = () => {
		switch (form.values.type) {
			case "percentage":
				return "Discount percentage";
			case "fixed_amount":
				return "Discount amount";
			case "free_item":
				return "Free item description";
		}
	};

	return (
		<form onSubmit={form.onSubmit(onNext)}>
			<Stack gap="md">
				<div>
					<Text size="sm" fw={500} mb={4}>
						Discount type
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
					label="Code expires after (days)"
					placeholder="30"
					description="Leave blank for no expiry"
					min={1}
					{...form.getInputProps("expiresInDays")}
				/>

				<NumberInput
					label="Daily cap"
					placeholder="Unlimited"
					description="Max discount codes per day. Leave blank for unlimited"
					min={1}
					{...form.getInputProps("dailyCap")}
				/>

				<Group grow mt="sm">
					<Button variant="default" onClick={onBack}>
						Back
					</Button>
					<Button type="submit">Next</Button>
				</Group>
			</Stack>
		</form>
	);
};
