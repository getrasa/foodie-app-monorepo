import { StatTile } from "./components/stats-cards";
import { RatingTrendChart } from "./components/rating-trend-chart";
import { RatingDistributionChart } from "./components/rating-distribution-chart";
import { MostMentionedTags } from "./components/redemption-rate-card";

const STATS = {
	total: 247,
	avg: 4.6,
	thisWeek: 38,
	weekDelta: 12,
	redeemed: 41,
	redemptionRate: 0.17,
};

const TREND = [4.4, 4.5, 4.3, 4.6, 4.7, 4.5, 4.4, 4.6, 4.8, 4.7, 4.5, 4.6, 4.8, 4.7];

const DISTRIBUTION = [
	{ stars: 5, count: 168 },
	{ stars: 4, count: 52 },
	{ stars: 3, count: 15 },
	{ stars: 2, count: 8 },
	{ stars: 1, count: 4 },
];

const TAGS = [
	["The pasta", 142],
	["Service", 98],
	["Atmosphere", 71],
	["Wine list", 42],
	["Dessert", 38],
	["Bread", 12],
] as const;

export const AnalyticsPage = () => {
	return (
		<div
			style={{
				padding: "28px 32px",
				overflowY: "auto",
				height: "100%",
				fontFamily: "var(--fb-sans)",
			}}
		>
			<div
				style={{
					fontFamily: "var(--fb-serif)",
					fontSize: 28,
					fontStyle: "italic",
					letterSpacing: "-0.01em",
					color: "var(--fb-ink)",
				}}
			>
				Analytics
			</div>
			<div
				style={{
					fontSize: 13,
					color: "rgba(31,26,21,0.55)",
					marginTop: 4,
				}}
			>
				Last 14 days · updates in real time
			</div>

			{/* Stat tiles */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: 14,
					marginTop: 22,
				}}
			>
				<StatTile
					label="Total feedback"
					value={STATS.total}
					sub={`+${STATS.weekDelta} this week`}
					deltaUp
				/>
				<StatTile
					label="Average rating"
					value={STATS.avg}
					sub="out of 5.0"
				/>
				<StatTile
					label="This week"
					value={STATS.thisWeek}
					sub="new entries"
				/>
				<StatTile
					label="Redemption"
					value={`${Math.round(STATS.redemptionRate * 100)}%`}
					sub={`${STATS.redeemed} of ${STATS.total} redeemed`}
				/>
			</div>

			{/* Charts */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1.6fr 1fr",
					gap: 14,
					marginTop: 14,
				}}
			>
				<RatingTrendChart data={TREND} />
				<RatingDistributionChart distribution={DISTRIBUTION} />
			</div>

			{/* Tags */}
			<MostMentionedTags tags={TAGS} />
		</div>
	);
};
