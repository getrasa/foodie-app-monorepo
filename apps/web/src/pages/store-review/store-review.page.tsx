import { useState } from "react";
import { ScreenComment } from "./components/screen-comment";
import { ScreenDiscount } from "./components/screen-discount";
import { ScreenEmail } from "./components/screen-email";
import { ScreenLanding } from "./components/screen-landing";
import { ScreenNudge } from "./components/screen-nudge";
import { ScreenRating } from "./components/screen-rating";
import { ScreenThanks } from "./components/screen-thanks";

type Screen =
	| "landing"
	| "rating"
	| "comment"
	| "nudge"
	| "email"
	| "discount"
	| "thanks";

interface StoreReviewPageProps {
	storeId: string;
}

export const StoreReviewPage = ({ storeId }: StoreReviewPageProps) => {
	const [screen, setScreen] = useState<Screen>("landing");
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [chips, setChips] = useState<string[]>([]);
	const [email, setEmail] = useState("");

	// TODO: Replace with actual Google Maps URL from store data
	const googleMapsUrl = `https://search.google.com/local/writereview?placeid=${storeId}`;

	const reset = () => {
		setScreen("landing");
		setRating(0);
		setComment("");
		setChips([]);
		setEmail("");
	};

	// 5★ flow: comment → nudge → email → discount
	// ≤4★ flow: comment (required) → email → discount
	const afterComment = () => setScreen(rating === 5 ? "nudge" : "email");
	const backFromEmail = () => setScreen(rating === 5 ? "nudge" : "comment");

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
						onNext={afterComment}
						onBack={() => setScreen("rating")}
					/>
				);
			case "nudge":
				return (
					<ScreenNudge
						googleMapsUrl={googleMapsUrl}
						comment={comment}
						chips={chips}
						onShare={() => setScreen("email")}
						onSkip={() => setScreen("email")}
						onBack={() => setScreen("comment")}
					/>
				);
			case "email":
				return (
					<ScreenEmail
						email={email}
						setEmail={setEmail}
						rating={rating}
						onNext={() => setScreen("discount")}
						onBack={backFromEmail}
					/>
				);
			case "discount":
				return (
					<ScreenDiscount email={email} onNext={() => setScreen("thanks")} />
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
