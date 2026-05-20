interface BrandLogoProps {
	size?: number;
	wordmarkSize?: number;
	color?: string;
	accent?: string;
	bg?: string;
	hideWordmark?: boolean;
}

export const BrandLogo = ({
	size = 32,
	wordmarkSize,
	color = "var(--fb-cream)",
	accent = "var(--fb-primary)",
	bg = "var(--fb-ink)",
	hideWordmark = false,
}: BrandLogoProps) => {
	const wm = wordmarkSize ?? Math.round(size * 0.58);
	const sparkleSize = Math.round(size * 0.32);

	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: Math.round(size * 0.36),
				color: "var(--fb-ink)",
			}}
		>
			{/* Mark */}
			<div
				style={{
					position: "relative",
					width: size,
					height: size,
					borderRadius: "50%",
					background: bg,
					color,
					display: "grid",
					placeItems: "center",
					fontFamily: "var(--fb-serif)",
					fontStyle: "italic",
					fontSize: Math.round(size * 0.58),
					letterSpacing: "-0.04em",
					lineHeight: 1,
					boxShadow:
						"0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 10px rgba(31,26,21,0.18)",
					flexShrink: 0,
				}}
			>
				<span
					style={{
						transform: "translate(-1px, 1px)",
						display: "inline-block",
					}}
				>
					jb
				</span>
				{/* Sparkle accent */}
				<svg
					aria-hidden="true"
					width={sparkleSize}
					height={sparkleSize}
					viewBox="0 0 14 14"
					fill="none"
					style={{
						position: "absolute",
						top: -Math.round(size * 0.06),
						right: -Math.round(size * 0.06),
						filter: "drop-shadow(0 1px 2px rgba(31,26,21,0.25))",
					}}
				>
					<path
						d="M7 0.5L8.2 5.3L13 6.5L8.2 7.7L7 12.5L5.8 7.7L1 6.5L5.8 5.3L7 0.5Z"
						fill={accent}
					/>
				</svg>
			</div>

			{/* Wordmark */}
			{!hideWordmark && (
				<span
					style={{
						fontFamily: "var(--fb-serif)",
						fontStyle: "italic",
						fontSize: wm,
						lineHeight: 1,
						letterSpacing: "-0.015em",
						whiteSpace: "nowrap",
					}}
				>
					Jak By
					<span style={{ color: accent }}>ł</span>o
				</span>
			)}
		</div>
	);
};
