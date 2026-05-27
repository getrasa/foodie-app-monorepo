import { useState } from "react";

interface GoogleMapsNudgeProps {
	venueName: string;
	googleMapsUrl: string;
	comment: string;
}

export const GoogleMapsNudge = ({
	venueName,
	googleMapsUrl,
	comment,
}: GoogleMapsNudgeProps) => {
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

	return (
		<div
			style={{
				padding: 18,
				background: "var(--fb-paper)",
				borderRadius: 16,
				border: "0.5px solid rgba(31,26,21,0.07)",
			}}
		>
			<div
				style={{
					fontFamily: "var(--fb-mono)",
					fontSize: 10,
					letterSpacing: "0.08em",
					textTransform: "uppercase",
					color: "rgba(31,26,21,0.5)",
					marginBottom: 8,
				}}
			>
				Bonus · całkowicie opcjonalne
			</div>
			<div
				style={{
					fontFamily: "var(--fb-serif)",
					fontSize: 22,
					lineHeight: 1.15,
					letterSpacing: "-0.02em",
					fontStyle: "italic",
					color: "var(--fb-ink)",
				}}
			>
				Skoro było wyśmienicie — pomożesz innym to znaleźć?
			</div>
			<div
				style={{
					marginTop: 8,
					fontFamily: "var(--fb-sans)",
					fontSize: 13.5,
					lineHeight: 1.5,
					color: "rgba(31,26,21,0.62)",
				}}
			>
				Krótka opinia w Mapach Google daje{" "}
				<em style={{ fontStyle: "italic" }}>{venueName}</em> realny zasięg.
				Kod rabatowy już masz — to niezależne.
			</div>

			{trimmed && (
				<div
					style={{
						marginTop: 12,
						padding: 10,
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
							marginBottom: 4,
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
							marginTop: 8,
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
						{copied ? "Skopiowane" : "Skopiuj do schowka"}
					</button>
				</div>
			)}

			<a
				href={googleMapsUrl}
				target="_blank"
				rel="noopener noreferrer"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 8,
					marginTop: 14,
					height: 46,
					borderRadius: 12,
					textDecoration: "none",
					background: "#fff",
					border: "1px solid rgba(31,26,21,0.12)",
					fontFamily: "var(--fb-sans)",
					fontSize: 14.5,
					fontWeight: 500,
					color: "var(--fb-ink)",
				}}
			>
				<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
					<path
						d="M10 1.5C6 1.5 2.8 4.6 2.8 8.5C2.8 13.7 10 18.5 10 18.5C10 18.5 17.2 13.7 17.2 8.5C17.2 4.6 14 1.5 10 1.5Z"
						fill="#EA4335"
					/>
					<circle cx="10" cy="8.3" r="2.8" fill="#fff" />
				</svg>
				Wystaw opinię w Google
			</a>
		</div>
	);
};
