import { useState } from "react";
import { PrimaryButton } from "./primary-button";
import { BackRow } from "./back-row";

const RATING_WORDS: Record<number, { word: string; color: string }> = {
	0: { word: "—", color: "rgba(31,26,21,0.35)" },
	1: { word: "Off night", color: "var(--fb-ink)" },
	2: { word: "Could be better", color: "var(--fb-ink)" },
	3: { word: "Solid", color: "var(--fb-ink)" },
	4: { word: "Really good", color: "var(--fb-ink)" },
	5: { word: "Delizioso", color: "var(--fb-primary)" },
};

const Star = ({
	filled,
	size = 46,
	onPointerDown,
}: {
	filled: boolean;
	size?: number;
	onPointerDown: () => void;
}) => {
	const fill = filled ? "var(--fb-primary)" : "transparent";
	const stroke = filled ? "var(--fb-primary)" : "rgba(31,26,21,0.22)";
	return (
		<button
			type="button"
			onPointerDown={onPointerDown}
			style={{
				width: size + 4,
				height: size + 4,
				background: "transparent",
				border: "none",
				padding: 2,
				cursor: "pointer",
				display: "grid",
				placeItems: "center",
			}}
		>
			<svg width={size} height={size} viewBox="0 0 44 44" fill="none">
				<path
					d="M22 3.5L27.4 15.6L40.5 17.1L30.8 26.2L33.4 39.2L22 32.6L10.6 39.2L13.2 26.2L3.5 17.1L16.6 15.6L22 3.5Z"
					fill={fill}
					stroke={stroke}
					strokeWidth="1.6"
					strokeLinejoin="round"
					strokeLinecap="round"
				/>
			</svg>
		</button>
	);
};

interface ScreenRatingProps {
	rating: number;
	setRating: (r: number) => void;
	onNext: () => void;
	onBack: () => void;
}

export const ScreenRating = ({
	rating,
	setRating,
	onNext,
	onBack,
}: ScreenRatingProps) => {
	const [hoverIdx, setHoverIdx] = useState(0);
	const display = hoverIdx || rating;
	const wordInfo = RATING_WORDS[display];

	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			<BackRow onBack={onBack} step={1} />

			<div style={{ marginTop: 28 }}>
				<div
					style={{
						fontFamily: "var(--fb-serif)",
						fontSize: 38,
						lineHeight: 1.05,
						letterSpacing: "-0.02em",
						fontStyle: "italic",
						color: "var(--fb-ink)",
					}}
				>
					How many stars?
				</div>
				<div
					style={{
						marginTop: 10,
						fontFamily: "var(--fb-sans)",
						fontSize: 15,
						color: "rgba(31,26,21,0.6)",
					}}
				>
					Tap to rate your experience.
				</div>
			</div>

			{/* Stars */}
			<div
				style={{
					marginTop: 44,
					display: "flex",
					justifyContent: "center",
					gap: 2,
				}}
				onPointerLeave={() => setHoverIdx(0)}
			>
				{[1, 2, 3, 4, 5].map((i) => (
					<Star
						key={i}
						filled={i <= display}
						size={46}
						onPointerDown={() => setRating(i)}
					/>
				))}
			</div>

			{/* Word */}
			<div
				style={{
					marginTop: 28,
					textAlign: "center",
					fontFamily: "var(--fb-serif)",
					fontSize: 22,
					fontStyle: "italic",
					letterSpacing: "-0.01em",
					color: wordInfo.color,
					transition: "color 0.2s",
					minHeight: 28,
				}}
			>
				{display ? wordInfo.word : "\u00A0"}
			</div>

			<div style={{ flex: 1 }} />

			<PrimaryButton onClick={onNext} disabled={!rating}>
				Continue
			</PrimaryButton>
		</div>
	);
};
