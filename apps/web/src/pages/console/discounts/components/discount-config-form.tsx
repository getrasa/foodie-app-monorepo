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
	{ label: "Percentage off", value: "percentage" },
	{ label: "Fixed amount", value: "fixed_amount" },
	{ label: "Free item", value: "free_item" },
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
				value.trim().length > 0 ? null : "Please enter a discount value",
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
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="md">
				{saved && (
					<Alert color="green" variant="light">
						Discount configuration saved
					</Alert>
				)}

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

				<Switch
					label="Discounts active"
					description="Pause discounts temporarily without deleting your configuration"
					{...form.getInputProps("active", { type: "checkbox" })}
				/>

				<Button type="submit" size="md">
					Save configuration
				</Button>
			</Stack>
		</form>
	);
};
