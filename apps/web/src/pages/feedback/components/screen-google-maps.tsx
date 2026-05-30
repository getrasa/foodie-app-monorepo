import { useState } from "react";
import { PrimaryButton } from "./primary-button";

interface ScreenGoogleMapsProps {
	venueName: string;
	googleMapsUrl: string;
	comment: string;
	onContinue: () => void;
}

export const ScreenGoogleMaps = ({
	venueName,
	googleMapsUrl,
	comment,
	onContinue,
}: ScreenGoogleMapsProps) => {
	const [copied, setCopied] = useState(false);
	const trimmed = comment.trim();

	const copyComment = async () => {
		if (!trimmed) return;
		try {
			await navigator.clipboard.writeText(trimmed);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = trimmed;
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
		window.setTimeout(() => setCopied(false), 1800);
	};

	const handleOpen = () => {
		window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
		onContinue();
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
			<div
				style={{
					fontFamily: "var(--fb-mono)",
					fontSize: 11,
					letterSpacing: "0.08em",
					textTransform: "uppercase",
					color: "rgba(12,10,7,0.5)",
				}}
			>
				Krok dodatkowy · opcjonalny
			</div>

			<div
				style={{
					marginTop: 14,
					fontFamily: "var(--fb-serif)",
					fontSize: 34,
					lineHeight: 1.05,
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
					color: "rgba(12,10,7,0.62)",
				}}
			>
				Krótka opinia w Mapach Google daje{" "}
				<em style={{ fontStyle: "italic" }}>{venueName}</em> realny zasięg.
				Kod rabatowy zobaczysz zaraz po — niezależnie od tego, czy zostawisz
				opinię w Google, czy nie.
			</div>

			<div
				style={{
					marginTop: 20,
					padding: 16,
					background: "var(--fb-paper)",
					borderRadius: 14,
					border: "0.5px solid rgba(12,10,7,0.07)",
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
							border: "0.5px solid rgba(12,10,7,0.1)",
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
							{venueName}
						</div>
						<div
							style={{
								fontFamily: "var(--fb-sans)",
								fontSize: 12.5,
								color: "rgba(12,10,7,0.55)",
								marginTop: 2,
							}}
						>
							Mapy Google
						</div>
					</div>
				</div>
				<div
					style={{
						borderTop: "0.5px solid rgba(12,10,7,0.08)",
						paddingTop: 12,
						fontFamily: "var(--fb-sans)",
						fontSize: 12.5,
						color: "rgba(12,10,7,0.55)",
						lineHeight: 1.5,
					}}
				>
					Otworzymy Mapy Google w nowej karcie — wystarczy, że napiszesz kilka
					słów lub wkleisz swój komentarz.
				</div>

				{trimmed && (
					<div
						style={{
							padding: 12,
							borderRadius: 10,
							background: "var(--fb-cream)",
							border: "0.5px solid rgba(12,10,7,0.1)",
						}}
					>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 10,
								letterSpacing: "0.06em",
								textTransform: "uppercase",
								color: "rgba(12,10,7,0.5)",
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
							{trimmed}
						</div>
						<button
							type="button"
							onClick={copyComment}
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
							{copied ? "Skopiowane" : "Skopiuj opinię do schowka"}
						</button>
					</div>
				)}
			</div>

			<div style={{ flex: 1 }} />

			<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
				<PrimaryButton onClick={handleOpen}>
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
					onClick={onContinue}
					style={{
						background: "transparent",
						border: "none",
						cursor: "pointer",
						fontFamily: "var(--fb-sans)",
						fontSize: 14,
						color: "rgba(12,10,7,0.55)",
						padding: 12,
					}}
				>
					Pomiń — pokaż mi kod
				</button>
			</div>
		</div>
	);
};
