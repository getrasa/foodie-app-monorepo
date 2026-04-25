import { PrimaryButton } from "./primary-button";
import { StaticStar } from "#/pages/console/shared/static-star";

interface ScreenNudgeProps {
	googleMapsUrl: string;
	onDone: () => void;
	onShare: () => void;
}

export const ScreenNudge = ({ onDone, onShare }: ScreenNudgeProps) => {
	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			<div style={{ marginTop: 24 }}>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color: "rgba(31,26,21,0.5)",
					}}
				>
					One last thing — totally optional
				</div>

				<div
					style={{
						marginTop: 14,
						fontFamily: "var(--fb-serif)",
						fontSize: 32,
						lineHeight: 1.08,
						letterSpacing: "-0.02em",
						fontStyle: "italic",
						color: "var(--fb-ink)",
					}}
				>
					Enjoyed your meal?
					<br />
					Tell the internet.
				</div>
				<div
					style={{
						marginTop: 10,
						fontFamily: "var(--fb-sans)",
						fontSize: 14.5,
						lineHeight: 1.5,
						color: "rgba(31,26,21,0.62)",
					}}
				>
					A public review on Google Maps helps new neighbors find us.
					Your discount is already yours either way — no strings.
				</div>
			</div>

			{/* Google map card */}
			<div
				style={{
					marginTop: 20,
					padding: 16,
					background: "var(--fb-paper)",
					borderRadius: 14,
					border: "0.5px solid rgba(31,26,21,0.07)",
					display: "flex",
					flexDirection: "column",
					gap: 14,
				}}
			>
				<div
					style={{
						display: "flex",
						gap: 12,
						alignItems: "center",
					}}
				>
					{/* Google pin */}
					<div
						style={{
							width: 40,
							height: 40,
							borderRadius: 10,
							background: "#fff",
							border: "0.5px solid rgba(31,26,21,0.1)",
							display: "grid",
							placeItems: "center",
							flexShrink: 0,
						}}
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M10 1.5C6 1.5 2.8 4.6 2.8 8.5C2.8 13.7 10 18.5 10 18.5C10 18.5 17.2 13.7 17.2 8.5C17.2 4.6 14 1.5 10 1.5Z"
								fill="#EA4335"
							/>
							<circle cx="10" cy="8.3" r="2.8" fill="#fff" />
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
							Your restaurant on Google
						</div>
						<div
							style={{
								fontFamily: "var(--fb-sans)",
								fontSize: 12.5,
								color: "rgba(31,26,21,0.55)",
								marginTop: 2,
								display: "flex",
								alignItems: "center",
								gap: 5,
							}}
						>
							<StaticStar size={11} />
							<span>4.7 · 248 reviews on Google</span>
						</div>
					</div>
				</div>
				<div
					style={{
						borderTop: "0.5px solid rgba(31,26,21,0.08)",
						paddingTop: 12,
					}}
				>
					<div
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12.5,
							color: "rgba(31,26,21,0.55)",
							lineHeight: 1.5,
						}}
					>
						We'll open Google Maps in a new tab — you can write
						whatever you like, or change your mind.
					</div>
				</div>
			</div>

			<div style={{ flex: 1 }} />

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
			>
				<PrimaryButton onClick={onShare}>
					<svg width="16" height="16" viewBox="0 0 24 24">
						<path
							fill="#fff"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#fff"
							opacity=".7"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
					</svg>
					Leave a Google review
				</PrimaryButton>
				<button
					type="button"
					onClick={onDone}
					style={{
						background: "transparent",
						border: "none",
						cursor: "pointer",
						fontFamily: "var(--fb-sans)",
						fontSize: 14,
						color: "rgba(31,26,21,0.55)",
						padding: 12,
					}}
				>
					No thanks, I'm done
				</button>
			</div>
		</div>
	);
};
