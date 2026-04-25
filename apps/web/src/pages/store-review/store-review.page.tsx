import { useState } from "react";
import { ScreenLanding } from "./components/screen-landing";
import { ScreenRating } from "./components/screen-rating";
import { ScreenComment } from "./components/screen-comment";
import { ScreenDiscount } from "./components/screen-discount";
import { ScreenNudge } from "./components/screen-nudge";
import { ScreenThanks } from "./components/screen-thanks";

type Screen = "landing" | "rating" | "comment" | "discount" | "nudge" | "thanks";

interface StoreReviewPageProps {
	storeId: string;
}

export const StoreReviewPage = ({ storeId }: StoreReviewPageProps) => {
	const [screen, setScreen] = useState<Screen>("landing");
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [chips, setChips] = useState<string[]>([]);

	// TODO: Replace with actual Google Maps URL from store data
	const googleMapsUrl = `https://search.google.com/local/writereview?placeid=${storeId}`;

	const reset = () => {
		setScreen("landing");
		setRating(0);
		setComment("");
		setChips([]);
	};

	const renderScreen = () => {
		switch (screen) {
			case "landing":
				return <ScreenLanding onStart={() => setScreen("rating")} />;
			case "rating":
				return (
					<ScreenRating
						rating={rating}
						setRating={setRating}
						onNext={() => setScreen("comment")}
						onBack={() => setScreen("landing")}
					/>
				);
			case "comment":
				return (
					<ScreenComment
						rating={rating}
						comment={comment}
						setComment={setComment}
						selectedChips={chips}
						setSelectedChips={setChips}
						onNext={() => setScreen("discount")}
						onBack={() => setScreen("rating")}
					/>
				);
			case "discount":
				return <ScreenDiscount onNext={() => setScreen("nudge")} />;
			case "nudge":
				return (
					<ScreenNudge
						googleMapsUrl={googleMapsUrl}
						onDone={() => setScreen("thanks")}
						onShare={() => {
							window.open(googleMapsUrl, "_blank");
							setScreen("thanks");
						}}
					/>
				);
			case "thanks":
				return <ScreenThanks onRestart={reset} />;
			default:
				return null;
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				maxWidth: 430,
				margin: "0 auto",
				background: "var(--fb-cream)",
				fontFamily: "var(--fb-sans)",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{renderScreen()}
		</div>
	);
};
