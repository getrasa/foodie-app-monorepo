import { PrimaryButton } from "./primary-button";
import { BackRow } from "./back-row";
import { StaticStar } from "#/pages/console/shared/static-star";

const RATING_WORDS: Record<number, string> = {
	1: "Off night",
	2: "Could be better",
	3: "Solid",
	4: "Really good",
	5: "Delizioso",
};

const PROMPT_CHIPS = ["The pasta", "Service", "Wine list", "Atmosphere", "Dessert"];

interface ScreenCommentProps {
	rating: number;
	comment: string;
	setComment: (c: string) => void;
	selectedChips: string[];
	setSelectedChips: (chips: string[]) => void;
	onNext: () => void;
	onBack: () => void;
}

export const ScreenComment = ({
	rating,
	comment,
	setComment,
	selectedChips,
	setSelectedChips,
	onNext,
	onBack,
}: ScreenCommentProps) => {
	const toggleChip = (c: string) => {
		setSelectedChips(
			selectedChips.includes(c)
				? selectedChips.filter((x) => x !== c)
				: [...selectedChips, c],
		);
	};

	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			<BackRow onBack={onBack} step={2} />

			<div style={{ marginTop: 24 }}>
				{/* Rating pill */}
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 6,
						padding: "6px 12px",
						borderRadius: 999,
						background: "var(--fb-paper)",
						border: "0.5px solid rgba(31,26,21,0.07)",
					}}
				>
					{[1, 2, 3, 4, 5].map((i) => (
						<StaticStar key={i} size={11} filled={i <= rating} />
					))}
					<span
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12,
							color: "rgba(31,26,21,0.65)",
							marginLeft: 4,
						}}
					>
						{RATING_WORDS[rating]}
					</span>
				</div>

				<div
					style={{
						marginTop: 16,
						fontFamily: "var(--fb-serif)",
						fontSize: 32,
						lineHeight: 1.08,
						letterSpacing: "-0.02em",
						fontStyle: "italic",
						color: "var(--fb-ink)",
					}}
				>
					Want to say more?
				</div>
				<div
					style={{
						marginTop: 8,
						fontFamily: "var(--fb-sans)",
						fontSize: 14,
						color: "rgba(31,26,21,0.6)",
					}}
				>
					Optional — but we do read them all.
				</div>
			</div>

			{/* Chips */}
			<div
				style={{
					marginTop: 18,
					display: "flex",
					flexWrap: "wrap",
					gap: 6,
				}}
			>
				{PROMPT_CHIPS.map((c) => {
					const on = selectedChips.includes(c);
					return (
						<button
							key={c}
							type="button"
							onClick={() => toggleChip(c)}
							style={{
								padding: "7px 12px",
								borderRadius: 999,
								fontFamily: "var(--fb-sans)",
								fontSize: 13,
								background: on ? "var(--fb-ink)" : "transparent",
								color: on ? "var(--fb-cream)" : "var(--fb-ink)",
								border: on
									? "1px solid var(--fb-ink)"
									: "1px solid rgba(31,26,21,0.15)",
								cursor: "pointer",
								transition: "all 0.15s",
							}}
						>
							{c}
						</button>
					);
				})}
			</div>

			{/* Textarea */}
			<div
				style={{
					marginTop: 14,
					padding: 14,
					background: "var(--fb-paper)",
					borderRadius: 14,
					border: "0.5px solid rgba(31,26,21,0.07)",
					flex: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="The tagliatelle al ragù was unreal…"
					maxLength={240}
					style={{
						flex: 1,
						width: "100%",
						border: "none",
						background: "transparent",
						resize: "none",
						outline: "none",
						fontFamily: "var(--fb-sans)",
						fontSize: 15,
						lineHeight: 1.45,
						color: "var(--fb-ink)",
						minHeight: 90,
					}}
				/>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						letterSpacing: "0.04em",
						color: "rgba(31,26,21,0.35)",
						textAlign: "right",
					}}
				>
					{comment.length}/240
				</div>
			</div>

			<div style={{ marginTop: 14 }}>
				<PrimaryButton onClick={onNext}>
					{comment.trim() || selectedChips.length
						? "Submit & get discount"
						: "Skip & get discount"}
				</PrimaryButton>
			</div>
		</div>
	);
};
