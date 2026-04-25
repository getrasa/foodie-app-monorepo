import { Container, Stepper, Title } from "@mantine/core";
import { useState } from "react";
import {
	StepRestaurantProfile,
	type RestaurantProfileValues,
} from "./components/step-restaurant-profile";
import {
	StepDiscountConfig,
	type DiscountConfigValues,
} from "./components/step-discount-config";
import { StepQrDownload } from "./components/step-qr-download";

export const OnboardingPage = () => {
	const [active, setActive] = useState(0);
	const [restaurantProfile, setRestaurantProfile] =
		useState<RestaurantProfileValues | null>(null);
	const [discountConfig, setDiscountConfig] =
		useState<DiscountConfigValues | null>(null);

	// TODO: Replace with actual restaurant ID from API after creation
	const [restaurantId] = useState("demo-restaurant-id");

	const handleRestaurantNext = (values: RestaurantProfileValues) => {
		setRestaurantProfile(values);
		// TODO: POST restaurant profile to API
		setActive(1);
	};

	const handleDiscountNext = (values: DiscountConfigValues) => {
		setDiscountConfig(values);
		// TODO: POST discount config to API
		setActive(2);
	};

	return (
		<Container size="sm" py="xl">
			<Title order={2} mb="xl">
				Set up your restaurant
			</Title>

			<Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
				<Stepper.Step label="Restaurant" description="Your profile">
					<StepRestaurantProfile
						initialValues={restaurantProfile ?? undefined}
						onNext={handleRestaurantNext}
					/>
				</Stepper.Step>

				<Stepper.Step label="Discount" description="Configure offer">
					<StepDiscountConfig
						initialValues={discountConfig ?? undefined}
						onNext={handleDiscountNext}
						onBack={() => setActive(0)}
					/>
				</Stepper.Step>

				<Stepper.Step label="QR Code" description="Download & share">
					<StepQrDownload restaurantId={restaurantId} />
				</Stepper.Step>
			</Stepper>
		</Container>
	);
};
