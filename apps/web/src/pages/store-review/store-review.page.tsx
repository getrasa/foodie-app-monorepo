import { Container, Paper, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { DiscountResult } from "./components/discount-result";
import { GoogleMapsPrompt } from "./components/google-maps-prompt";
import { ReviewForm, type ReviewFormValues } from "./components/review-form";

type Screen = "review" | "google-maps" | "discount";

interface StoreReviewPageProps {
	storeId: string;
}

function generateDiscountCode(): string {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let code = "";
	for (let i = 0; i < 8; i++) {
		code += chars[Math.floor(Math.random() * chars.length)];
	}
	return code;
}

export const StoreReviewPage = ({ storeId }: StoreReviewPageProps) => {
	const [screen, setScreen] = useState<Screen>("review");
	const [reviewData, setReviewData] = useState<ReviewFormValues | null>(null);
	const [discountCode] = useState(() => generateDiscountCode());

	// TODO: Replace with actual Google Maps URL from store data
	const googleMapsUrl = `https://search.google.com/local/writereview?placeid=${storeId}`;

	const handleSubmit = (values: ReviewFormValues) => {
		setReviewData(values);

		// TODO: POST review to API

		if (values.rating === 5) {
			setScreen("google-maps");
		} else {
			setScreen("discount");
		}
	};

	return (
		<Container size="xs" py="xl" px="md">
			<Stack gap="lg">
				<Text ta="center" size="sm" c="dimmed">
					{/* TODO: Replace with store name from API */}
					Leave a review
				</Text>

				<Paper shadow="sm" p="xl" radius="md" withBorder>
					{screen === "review" && <ReviewForm onSubmit={handleSubmit} />}

					{screen === "google-maps" && (
						<GoogleMapsPrompt
							googleMapsUrl={googleMapsUrl}
							onSkip={() => setScreen("discount")}
						/>
					)}

					{screen === "discount" && reviewData && (
						<DiscountResult
							discountCode={discountCode}
							isFiveStar={reviewData.rating === 5}
						/>
					)}
				</Paper>
			</Stack>
		</Container>
	);
};
