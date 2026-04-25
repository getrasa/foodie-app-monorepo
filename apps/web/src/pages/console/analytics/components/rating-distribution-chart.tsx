import { StaticStar } from "#/pages/console/shared/static-star";

interface DistributionItem {
	stars: number;
	count: number;
}

interface RatingDistributionChartProps {
	distribution: DistributionItem[];
}

export const RatingDistributionChart = ({
	distribution,
}: RatingDistributionChartProps) => {
	const maxCount = Math.max(...distribution.map((d) => d.count));

	return (
		<div
			style={{
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
				Distribution
			</div>
			<div
				style={{
					marginTop: 14,
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
			>
				{distribution.map((d) => (
					<div
						key={d.stars}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
						}}
					>
						<div
							style={{
								display: "flex",
								gap: 1,
								width: 14,
								alignItems: "center",
							}}
						>
							<span
								style={{
									fontFamily: "var(--fb-mono)",
									fontSize: 11,
									color: "rgba(31,26,21,0.6)",
								}}
							>
								{d.stars}
							</span>
							<StaticStar size={10} />
						</div>
						<div
							style={{
								flex: 1,
								height: 8,
								borderRadius: 4,
								background: "var(--fb-paper)",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: `${(d.count / maxCount) * 100}%`,
									height: "100%",
									background:
										d.stars >= 4
											? "var(--fb-primary)"
											: d.stars === 3
												? "var(--fb-ink)"
												: "rgba(31,26,21,0.3)",
									borderRadius: 4,
								}}
							/>
						</div>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 11,
								color: "rgba(31,26,21,0.6)",
								width: 30,
								textAlign: "right",
							}}
						>
							{d.count}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
