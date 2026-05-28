import type { RedemptionRate } from "#/lib/api/analytics-api";

interface RedemptionRateCardProps {
	data: RedemptionRate;
}

interface BreakdownRowProps {
	label: string;
	value: number;
	color: string;
}

const BreakdownRow = ({ label, value, color }: BreakdownRowProps) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "6px 0",
		}}
	>
		<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
			<div
				style={{
					width: 8,
					height: 8,
					borderRadius: "50%",
					background: color,
				}}
			/>
			<span style={{ fontSize: 13, color: "var(--fb-ink)" }}>{label}</span>
		</div>
		<span
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 12,
				color: "rgba(31,26,21,0.65)",
			}}
		>
			{value}
		</span>
	</div>
);

export const RedemptionRateCard = ({ data }: RedemptionRateCardProps) => {
	const ratePercent = Math.round(data.rate * 100);

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
					display: "flex",
					alignItems: "baseline",
					justifyContent: "space-between",
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
					Realizacja kodów
				</div>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						color: "rgba(31,26,21,0.5)",
					}}
				>
					{data.issued} wydanych
				</div>
			</div>

			<div
				style={{
					marginTop: 10,
					fontFamily: "var(--fb-serif)",
					fontSize: 38,
					fontStyle: "italic",
					letterSpacing: "-0.02em",
					color: "var(--fb-ink)",
					lineHeight: 1,
				}}
			>
				{ratePercent}%
			</div>
			<div
				style={{
					marginTop: 4,
					fontSize: 12,
					color: "rgba(31,26,21,0.55)",
				}}
			>
				{data.redeemed} z {data.issued} kodów zrealizowano
			</div>

			<div
				style={{
					marginTop: 16,
					borderTop: "0.5px solid rgba(31,26,21,0.08)",
					paddingTop: 8,
				}}
			>
				<BreakdownRow label="Aktywne" value={data.active} color="var(--fb-ink)" />
				<BreakdownRow
					label="Zrealizowane"
					value={data.redeemed}
					color="var(--fb-olive)"
				/>
				<BreakdownRow
					label="Wygasłe"
					value={data.expired}
					color="rgba(31,26,21,0.3)"
				/>
				<BreakdownRow
					label="Unieważnione"
					value={data.voided}
					color="var(--fb-primary)"
				/>
			</div>
		</div>
	);
};
