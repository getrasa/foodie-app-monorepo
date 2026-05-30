interface TrendBucket {
	date: string;
	avgRating: number;
	count: number;
}

interface RatingTrendChartProps {
	data: TrendBucket[];
	rangeLabel: string;
}

const Sparkline = ({ data }: { data: number[] }) => {
	const w = 420;
	const h = 120;
	const max = 5;
	const min = 1;

	if (data.length === 0) {
		return null;
	}

	const denom = data.length === 1 ? 1 : data.length - 1;
	const pts = data.map((v, i) => {
		const x = (i / denom) * w;
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

const formatBucketLabel = (iso: string): string => {
	const d = new Date(`${iso}T00:00:00Z`);
	if (Number.isNaN(d.getTime())) return iso;
	const day = String(d.getUTCDate()).padStart(2, "0");
	const month = String(d.getUTCMonth() + 1).padStart(2, "0");
	return `${day}.${month}`;
};

const ratingBuckets = (buckets: TrendBucket[]): number[] =>
	buckets.filter((b) => b.count > 0).map((b) => b.avgRating);

const overallAverage = (buckets: TrendBucket[]): number | null => {
	let sum = 0;
	let count = 0;
	for (const b of buckets) {
		if (b.count > 0) {
			sum += b.avgRating * b.count;
			count += b.count;
		}
	}
	return count === 0 ? null : sum / count;
};

const headline = (avg: number | null): string => {
	if (avg == null) return "Brak ocen w tym okresie";
	if (avg >= 4.5) return "Świetna seria";
	if (avg >= 4.0) return "Stabilnie wysoko";
	if (avg >= 3.0) return "Jest co poprawiać";
	return "Trzeba zareagować";
};

export const RatingTrendChart = ({ data, rangeLabel }: RatingTrendChartProps) => {
	const sparkPoints = ratingBuckets(data);
	const avg = overallAverage(data);
	const first = data[0];
	const middle = data[Math.floor(data.length / 2)];
	const last = data[data.length - 1];

	return (
		<div
			style={{
				padding: "20px 22px",
				borderRadius: 14,
				background: "#fff",
				border: "0.5px solid rgba(12,10,7,0.08)",
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
							color: "rgba(12,10,7,0.5)",
						}}
					>
						Trend ocen
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
						{headline(avg)}
					</div>
				</div>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						color: "rgba(12,10,7,0.5)",
					}}
				>
					{rangeLabel}
				</div>
			</div>
			<div style={{ marginTop: 16, minHeight: 120 }}>
				{sparkPoints.length === 0 ? (
					<div
						style={{
							height: 120,
							display: "grid",
							placeItems: "center",
							fontFamily: "var(--fb-sans)",
							fontSize: 13,
							color: "rgba(12,10,7,0.45)",
						}}
					>
						Brak ocen w tym okresie
					</div>
				) : (
					<Sparkline data={sparkPoints} />
				)}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: 6,
					fontFamily: "var(--fb-mono)",
					fontSize: 10,
					color: "rgba(12,10,7,0.45)",
				}}
			>
				<span>{first ? formatBucketLabel(first.date) : ""}</span>
				<span>{middle ? formatBucketLabel(middle.date) : ""}</span>
				<span>{last ? formatBucketLabel(last.date) : ""}</span>
			</div>
		</div>
	);
};
