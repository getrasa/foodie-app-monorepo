import { Alert, Center, Loader, UnstyledButton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { analyticsApi } from "#/lib/api/analytics-api";
import { useMyBusiness } from "#/lib/api/use-my-business";
import { StatTile } from "./components/stats-cards";
import { RatingTrendChart } from "./components/rating-trend-chart";
import { RatingDistributionChart } from "./components/rating-distribution-chart";
import { RedemptionRateCard } from "./components/redemption-rate-card";

type RangeKey = "7" | "30" | "90";

interface RangeOption {
	key: RangeKey;
	label: string;
	days: number;
}

const RANGE_OPTIONS: RangeOption[] = [
	{ key: "7", label: "7 dni", days: 7 },
	{ key: "30", label: "30 dni", days: 30 },
	{ key: "90", label: "90 dni", days: 90 },
];

const startOfDayUtc = (d: Date): Date => {
	const out = new Date(d);
	out.setUTCHours(0, 0, 0, 0);
	return out;
};

const endOfDayUtc = (d: Date): Date => {
	const out = new Date(d);
	out.setUTCHours(23, 59, 59, 999);
	return out;
};

const computeRange = (days: number): { from: Date; to: Date } => {
	const to = endOfDayUtc(new Date());
	const from = startOfDayUtc(new Date(to.getTime() - (days - 1) * 24 * 60 * 60 * 1000));
	return { from, to };
};

export const AnalyticsPage = () => {
	const businessQuery = useMyBusiness();
	const venue = businessQuery.data?.venues?.[0];
	const [rangeKey, setRangeKey] = useState<RangeKey>("30");

	const range = useMemo(() => {
		const opt = RANGE_OPTIONS.find((o) => o.key === rangeKey) ?? RANGE_OPTIONS[1];
		return { ...computeRange(opt.days), label: opt.label, days: opt.days };
	}, [rangeKey]);

	const distributionQuery = useQuery({
		queryKey: ["analytics", "distribution", venue?.id, range.from.toISOString(), range.to.toISOString()],
		queryFn: () =>
			analyticsApi.ratingDistribution(venue!.id, {
				from: range.from,
				to: range.to,
			}),
		enabled: !!venue?.id,
	});
	const trendQuery = useQuery({
		queryKey: ["analytics", "trend", venue?.id, range.from.toISOString(), range.to.toISOString()],
		queryFn: () =>
			analyticsApi.ratingTrend(venue!.id, { from: range.from, to: range.to }),
		enabled: !!venue?.id,
	});
	const redemptionQuery = useQuery({
		queryKey: ["analytics", "redemption", venue?.id, range.from.toISOString(), range.to.toISOString()],
		queryFn: () =>
			analyticsApi.redemptionRate(venue!.id, {
				from: range.from,
				to: range.to,
			}),
		enabled: !!venue?.id,
	});

	if (businessQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (!venue) {
		return (
			<div style={{ padding: "28px 32px" }}>
				<Alert color="yellow" variant="light">
					Najpierw przejdź przez konfigurację swojej restauracji.
				</Alert>
			</div>
		);
	}

	const isPending =
		distributionQuery.isPending ||
		trendQuery.isPending ||
		redemptionQuery.isPending;

	const distribution = distributionQuery.data;
	const trend = trendQuery.data ?? [];
	const redemption = redemptionQuery.data;

	const totalFeedback = distribution
		? distribution["1"] +
			distribution["2"] +
			distribution["3"] +
			distribution["4"] +
			distribution["5"]
		: 0;

	const avgRating = (() => {
		if (!distribution || totalFeedback === 0) return null;
		const sum =
			distribution["1"] * 1 +
			distribution["2"] * 2 +
			distribution["3"] * 3 +
			distribution["4"] * 4 +
			distribution["5"] * 5;
		return sum / totalFeedback;
	})();

	const lastSevenDaysCount = trend
		.slice(-7)
		.reduce((acc, b) => acc + b.count, 0);

	const distributionRows = distribution
		? ([5, 4, 3, 2, 1] as const).map((stars) => ({
				stars,
				count: distribution[String(stars) as "1" | "2" | "3" | "4" | "5"],
			}))
		: [];

	const emptyState = !isPending && totalFeedback === 0 && (redemption?.issued ?? 0) === 0;

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
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<div>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontSize: 28,
							fontStyle: "italic",
							letterSpacing: "-0.01em",
							color: "var(--fb-ink)",
						}}
					>
						Analityka
					</div>
					<div
						style={{
							fontSize: 13,
							color: "rgba(31,26,21,0.55)",
							marginTop: 4,
						}}
					>
						Ostatnie {range.label} · aktualizacja na żywo
					</div>
				</div>

				<div
					style={{
						display: "inline-flex",
						background: "#fff",
						border: "0.5px solid rgba(31,26,21,0.12)",
						borderRadius: 10,
						padding: 3,
					}}
				>
					{RANGE_OPTIONS.map((opt) => (
						<UnstyledButton
							key={opt.key}
							onClick={() => setRangeKey(opt.key)}
							style={{
								padding: "6px 14px",
								borderRadius: 8,
								background:
									opt.key === rangeKey ? "var(--fb-ink)" : "transparent",
								color:
									opt.key === rangeKey ? "var(--fb-cream)" : "var(--fb-ink)",
								fontSize: 12,
								fontFamily: "var(--fb-sans)",
								fontWeight: opt.key === rangeKey ? 500 : 400,
							}}
						>
							{opt.label}
						</UnstyledButton>
					))}
				</div>
			</div>

			{isPending ? (
				<Center h={320}>
					<Loader color="var(--fb-primary)" />
				</Center>
			) : emptyState ? (
				<div
					style={{
						marginTop: 24,
						padding: "32px 28px",
						borderRadius: 14,
						background: "#fff",
						border: "0.5px solid rgba(31,26,21,0.08)",
						textAlign: "center",
					}}
				>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontSize: 22,
							fontStyle: "italic",
							color: "var(--fb-ink)",
						}}
					>
						Jeszcze nie ma danych
					</div>
					<div
						style={{
							marginTop: 8,
							fontSize: 14,
							color: "rgba(31,26,21,0.6)",
							lineHeight: 1.5,
						}}
					>
						Gdy goście zaczną wystawiać opinie, zobaczysz tu rozkład ocen, trend i
						realizację kodów.
					</div>
				</div>
			) : (
				<>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(4, 1fr)",
							gap: 14,
							marginTop: 22,
						}}
					>
						<StatTile
							label="Wszystkie opinie"
							value={totalFeedback}
							sub={`w ostatnich ${range.days} dniach`}
						/>
						<StatTile
							label="Średnia ocena"
							value={avgRating != null ? avgRating.toFixed(1) : "—"}
							sub="na 5,0"
						/>
						<StatTile
							label="Ostatnie 7 dni"
							value={lastSevenDaysCount}
							sub="nowych wpisów"
						/>
						<StatTile
							label="Realizacja"
							value={
								redemption ? `${Math.round(redemption.rate * 100)}%` : "—"
							}
							sub={
								redemption
									? `${redemption.redeemed} z ${redemption.issued} zrealizowanych`
									: undefined
							}
						/>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1.6fr 1fr",
							gap: 14,
							marginTop: 14,
						}}
					>
						<RatingTrendChart
							data={trend}
							rangeLabel={`${range.days}D`}
						/>
						<RatingDistributionChart distribution={distributionRows} />
					</div>

					{redemption && <RedemptionRateCard data={redemption} />}
				</>
			)}
		</div>
	);
};
