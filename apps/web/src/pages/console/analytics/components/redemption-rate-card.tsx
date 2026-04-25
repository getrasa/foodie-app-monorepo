interface MostMentionedTagsProps {
	tags: readonly (readonly [string, number])[];
}

export const MostMentionedTags = ({ tags }: MostMentionedTagsProps) => {
	return (
		<div
			style={{
				marginTop: 14,
				padding: "20px 22px",
				borderRadius: 14,
				background: "#fff",
				border: "0.5px solid rgba(31,26,21,0.08)",
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
				Most mentioned
			</div>
			<div
				style={{
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					marginTop: 12,
				}}
			>
				{tags.map(([tag, count]) => (
					<div
						key={tag}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "6px 12px",
							borderRadius: 999,
							background: "var(--fb-paper)",
							border: "0.5px solid rgba(31,26,21,0.08)",
						}}
					>
						<span
							style={{
								fontSize: 13,
								color: "var(--fb-ink)",
							}}
						>
							{tag}
						</span>
						<span
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 11,
								color: "rgba(31,26,21,0.5)",
							}}
						>
							{count}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
