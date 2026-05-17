import { useState } from "react";
import { StaticStar } from "#/pages/console/shared/static-star";
import { BackRow } from "./back-row";
import { PrimaryButton } from "./primary-button";

interface ScreenNudgeProps {
	googleMapsUrl: string;
	comment: string;
	chips: string[];
	onShare: () => void;
	onSkip: () => void;
	onBack: () => void;
}

export const ScreenNudge = ({
	googleMapsUrl,
	comment,
	chips,
	onShare,
	onSkip,
	onBack,
}: ScreenNudgeProps) => {
	const [copied, setCopied] = useState(false);

	const trimmed = comment.trim();
	const hasReview = trimmed.length > 0 || chips.length > 0;
	const reviewText = [trimmed, chips.length ? `(${chips.join(", ")})` : null]
		.filter(Boolean)
		.join(" ");

	const copyReview = async () => {
		try {
			await navigator.clipboard.writeText(reviewText);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = reviewText;
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand("copy");
			} catch {
				// ignore
			}
			document.body.removeChild(ta);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1800);
	};

	const handleShare = () => {
		window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
		onShare();
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
			<BackRow onBack={onBack} step={3} total={4} />

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
					Krok 3 z 4 — opcjonalne
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
					Skoro było wyśmienicie —
					<br />
					podziel się ze światem.
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
					Publiczna opinia w Mapach Google pomoże nowym gościom znaleźć
					Helenę — w ten sposób realnie wspierasz naszą restaurację. Rabat
					dostaniesz tak czy inaczej, bez zobowiązań.
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
				<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
							Restauracja u Heleny
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
							<span>4,7 · 248 opinii w Google</span>
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
						Otworzymy Mapy Google w nowej karcie — wystarczy, że wkleisz
						lub napiszesz kilka słów.
					</div>
				</div>

				{hasReview && (
					<div
						style={{
							marginTop: 2,
							padding: 12,
							borderRadius: 10,
							background: "var(--fb-cream)",
							border: "0.5px solid rgba(31,26,21,0.1)",
						}}
					>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 10,
								letterSpacing: "0.06em",
								textTransform: "uppercase",
								color: "rgba(31,26,21,0.5)",
								marginBottom: 6,
							}}
						>
							Twoja opinia
						</div>
						<div
							style={{
								fontSize: 12.5,
								lineHeight: 1.45,
								color: "var(--fb-ink)",
								display: "-webkit-box",
								WebkitLineClamp: 3,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							{reviewText}
						</div>
						<button
							type="button"
							onClick={copyReview}
							style={{
								marginTop: 10,
								display: "inline-flex",
								alignItems: "center",
								gap: 6,
								padding: "6px 10px",
								borderRadius: 8,
								background: copied ? "var(--fb-olive)" : "var(--fb-ink)",
								color: "var(--fb-cream)",
								border: "none",
								cursor: "pointer",
								fontFamily: "var(--fb-sans)",
								fontSize: 12,
								fontWeight: 500,
								transition: "background 0.2s",
							}}
						>
							{copied ? (
								<>
									<svg width="11" height="11" viewBox="0 0 10 10">
										<path
											d="M2 5.2L4 7.2L8 2.8"
											stroke="currentColor"
											strokeWidth="1.8"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									Skopiowane
								</>
							) : (
								<>
									<svg width="11" height="11" viewBox="0 0 12 12" fill="none">
										<rect
											x="3.5"
											y="3.5"
											width="6"
											height="7"
											rx="1"
											stroke="currentColor"
											strokeWidth="1.2"
										/>
										<path
											d="M5.5 3.5V2.5a1 1 0 011-1h2a1 1 0 011 1v6"
											stroke="currentColor"
											strokeWidth="1.2"
											fill="none"
										/>
									</svg>
									Skopiuj opinię do schowka
								</>
							)}
						</button>
						<div
							style={{
								marginTop: 6,
								fontSize: 11,
								color: "rgba(31,26,21,0.5)",
							}}
						>
							Wklej w Mapach Google jednym ruchem.
						</div>
					</div>
				)}
			</div>

			<div style={{ flex: 1 }} />

			<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
				<PrimaryButton onClick={handleShare}>
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
					Wystaw opinię w Google
				</PrimaryButton>
				<button
					type="button"
					onClick={onSkip}
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
					Nie, dziękuję — pomiń
				</button>
			</div>
		</div>
	);
};
