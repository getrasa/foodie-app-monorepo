interface MonogramProps {
	size?: number;
}

export const Monogram = ({ size = 56 }: MonogramProps) => {
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: "50%",
				background: "var(--fb-ink)",
				color: "var(--fb-cream)",
				display: "grid",
				placeItems: "center",
				fontFamily: "var(--fb-serif)",
				fontSize: size * 0.46,
				fontStyle: "italic",
				letterSpacing: "-0.02em",
				boxShadow:
					"0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 24px rgba(31,26,21,0.18)",
				flexShrink: 0,
			}}
		>
			L
		</div>
	);
};
