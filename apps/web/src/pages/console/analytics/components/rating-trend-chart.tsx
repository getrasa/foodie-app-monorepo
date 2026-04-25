interface RatingTrendChartProps {
	data: number[];
}

const Sparkline = ({ data }: { data: number[] }) => {
	const w = 420;
	const h = 120;
	const max = 5;
	const min = 3.8;

	const pts = data.map((v, i) => {
		const x = (i / (data.length - 1)) * w;
		const y = h - ((v - min) / (max - min)) * h;
		return [x, y] as const;
	});

	const d = pts
		.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
		.join(" ");
	const area = `${d} L${w},${h} L0,${h} Z`;

	return (
		<svg
			width="100%"
			height={h}
			viewBox={`0 0 ${w} ${h}`}
			preserveAspectRatio="none"
			style={{ display: "block" }}
		>
			<defs>
				<linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="var(--fb-primary)" stopOpacity={0.18} />
					<stop offset="100%" stopColor="var(--fb-primary)" stopOpacity={0} />
				</linearGradient>
			</defs>
			<path d={area} fill="url(#sparkFill)" />
			<path
				d={d}
				fill="none"
				stroke="var(--fb-ink)"
				strokeWidth="1.5"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			{pts.map(([x, y], i) => (
				<circle
					key={i}
					cx={x}
					cy={y}
					r={i === pts.length - 1 ? 3 : 1.5}
					fill={i === pts.length - 1 ? "var(--fb-primary)" : "var(--fb-ink)"}
				/>
			))}
		</svg>
	);
};

export const RatingTrendChart = ({ data }: RatingTrendChartProps) => {
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
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "rgba(31,26,21,0.5)",
						}}
					>
						Rating trend
					</div>
					<div
						style={{
							marginTop: 4,
							fontFamily: "var(--fb-serif)",
							fontSize: 22,
							fontStyle: "italic",
							letterSpacing: "-0.01em",
						}}
					>
						Holding steady, trending up
					</div>
				</div>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						color: "rgba(31,26,21,0.5)",
					}}
				>
					14D
				</div>
			</div>
			<div style={{ marginTop: 16 }}>
				<Sparkline data={data} />
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: 6,
					fontFamily: "var(--fb-mono)",
					fontSize: 10,
					color: "rgba(31,26,21,0.45)",
				}}
			>
				<span>Apr 10</span>
				<span>Apr 17</span>
				<span>Apr 24</span>
			</div>
		</div>
	);
};
