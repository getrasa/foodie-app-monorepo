interface StatTileProps {
	label: string;
	value: number | string;
	sub?: string;
	deltaUp?: boolean;
}

export const StatTile = ({ label, value, sub, deltaUp }: StatTileProps) => {
	return (
		<div
			style={{
				padding: "18px 20px",
				borderRadius: 14,
				background: "#fff",
				border: "0.5px solid rgba(31,26,21,0.08)",
				boxShadow: "0 1px 2px rgba(31,26,21,0.025)",
			}}
		>
			<div
				style={{
					fontFamily: "var(--fb-mono)",
					fontSize: 10,
					letterSpacing: "0.06em",
					textTransform: "uppercase",
					color: "rgba(31,26,21,0.5)",
				}}
			>
				{label}
			</div>
			<div
				style={{
					marginTop: 8,
					fontFamily: "var(--fb-serif)",
					fontSize: 38,
					fontStyle: "italic",
					letterSpacing: "-0.02em",
					color: "var(--fb-ink)",
					lineHeight: 1,
				}}
			>
				{value}
			</div>
			{sub && (
				<div
					style={{
						marginTop: 6,
						fontSize: 12,
						color: deltaUp ? "var(--fb-olive)" : "rgba(31,26,21,0.55)",
					}}
				>
					{sub}
				</div>
			)}
		</div>
	);
};
