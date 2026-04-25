import { PrimaryButton } from "./primary-button";
import { Monogram } from "./monogram";

interface ScreenLandingProps {
	onStart: () => void;
}

export const ScreenLanding = ({ onStart }: ScreenLandingProps) => {
	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			{/* Header chip */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					marginBottom: 36,
				}}
			>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: "50%",
						background: "var(--fb-primary)",
						boxShadow: "0 0 0 4px rgba(200,106,62,0.15)",
					}}
				/>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color: "rgba(31,26,21,0.55)",
					}}
				>
					Scanned · Table 7
				</div>
			</div>

			<Monogram size={64} />

			<div style={{ marginTop: 28 }}>
				<div
					style={{
						fontFamily: "var(--fb-serif)",
						fontSize: 42,
						lineHeight: 1.02,
						letterSpacing: "-0.02em",
						color: "var(--fb-ink)",
						fontStyle: "italic",
					}}
				>
					How was
					<br />
					the meal?
				</div>
				<div
					style={{
						marginTop: 12,
						fontFamily: "var(--fb-sans)",
						fontSize: 15,
						lineHeight: 1.5,
						color: "rgba(31,26,21,0.62)",
						maxWidth: 280,
					}}
				>
					A quick note from your table. Takes about 30 seconds, and
					lands you a little something for next time.
				</div>
			</div>

			{/* Gift row */}
			<div
				style={{
					marginTop: 32,
					padding: "14px 16px",
					background: "var(--fb-paper)",
					borderRadius: 14,
					display: "flex",
					alignItems: "center",
					gap: 14,
					border: "0.5px solid rgba(31,26,21,0.07)",
				}}
			>
				<div
					style={{
						width: 38,
						height: 38,
						borderRadius: 10,
						background: "var(--fb-ink)",
						color: "var(--fb-cream)",
						display: "grid",
						placeItems: "center",
						flexShrink: 0,
					}}
				>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M2.5 6.5h13v9h-13z M1 4.5h16v3H1z M9 4.5v11 M5.5 4.5c-1.4 0-2.5-1-2.5-2s1.1-2 2.5-2c2 0 3.5 3 3.5 4 M12.5 4.5c1.4 0 2.5-1 2.5-2s-1.1-2-2.5-2c-2 0-3.5 3-3.5 4"
							stroke="currentColor"
							strokeWidth="1.2"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div style={{ flex: 1, minWidth: 0 }}>
					<div
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 14,
							fontWeight: 500,
							color: "var(--fb-ink)",
						}}
					>
						15% off your next visit
					</div>
					<div
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12.5,
							color: "rgba(31,26,21,0.55)",
							marginTop: 2,
						}}
					>
						Unlocked as soon as you leave a rating
					</div>
				</div>
			</div>

			<div style={{ flex: 1 }} />

			<PrimaryButton onClick={onStart}>Leave feedback →</PrimaryButton>
			<div
				style={{
					marginTop: 12,
					fontFamily: "var(--fb-mono)",
					fontSize: 10.5,
					letterSpacing: "0.04em",
					color: "rgba(31,26,21,0.4)",
					textAlign: "center",
				}}
			>
				No sign-up · No app · 30 seconds
			</div>
		</div>
	);
};
