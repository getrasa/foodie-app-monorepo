import { Monogram } from "./monogram";

interface ScreenThanksProps {
	onRestart: () => void;
}

export const ScreenThanks = ({ onRestart }: ScreenThanksProps) => {
	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
				textAlign: "center",
				alignItems: "center",
			}}
		>
			<div style={{ flex: 1 }} />

			<Monogram size={72} />

			<div
				style={{
					marginTop: 28,
					fontFamily: "var(--fb-serif)",
					fontSize: 44,
					lineHeight: 1.02,
					letterSpacing: "-0.02em",
					fontStyle: "italic",
					color: "var(--fb-ink)",
				}}
			>
				Grazie.
			</div>
			<div
				style={{
					marginTop: 12,
					fontFamily: "var(--fb-sans)",
					fontSize: 15,
					lineHeight: 1.5,
					color: "rgba(31,26,21,0.62)",
					maxWidth: 260,
				}}
			>
				Your code is saved.
				<br />
				We'll see you soon — come hungry.
			</div>

			<div style={{ flex: 1 }} />

			<button
				type="button"
				onClick={onRestart}
				style={{
					background: "transparent",
					border: "none",
					cursor: "pointer",
					fontFamily: "var(--fb-mono)",
					fontSize: 10.5,
					letterSpacing: "0.08em",
					textTransform: "uppercase",
					color: "rgba(31,26,21,0.4)",
				}}
			>
				Restart demo ↻
			</button>
		</div>
	);
};
