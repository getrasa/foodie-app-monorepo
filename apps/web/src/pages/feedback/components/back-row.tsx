interface BackRowProps {
	onBack: () => void;
	step: number;
	total?: number;
}

export const BackRow = ({ onBack, step, total = 3 }: BackRowProps) => {
	const steps = Array.from({ length: total }, (_, i) => i + 1);
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<button
				type="button"
				onClick={onBack}
				style={{
					background: "transparent",
					border: "none",
					padding: 0,
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					gap: 6,
					fontFamily: "var(--fb-sans)",
					fontSize: 14,
					color: "rgba(31,26,21,0.6)",
				}}
			>
				<svg width="16" height="16" viewBox="0 0 16 16">
					<path
						d="M10 3L5 8l5 5"
						stroke="currentColor"
						strokeWidth="1.6"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Wstecz
			</button>
			<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
				{steps.map((s) => (
					<div
						key={s}
						style={{
							width: s === step ? 18 : 6,
							height: 6,
							borderRadius: 3,
							background: s <= step ? "var(--fb-ink)" : "rgba(31,26,21,0.15)",
							transition: "width 0.2s, background 0.2s",
						}}
					/>
				))}
			</div>
		</div>
	);
};
