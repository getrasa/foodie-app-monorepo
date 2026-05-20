import { useState } from "react";
import { FeedbackFilters } from "./components/feedback-filters";
import { FeedbackRow } from "./components/feedback-card";
import { FeedbackDetail } from "./components/feedback-detail";

const MOCK_FEEDBACK = [
	{
		id: 1,
		rating: 5,
		when: "12 min temu",
		code: "LUCIA-4KX9",
		status: "open" as const,
		text: "Tagliatelle al ragù było obłędne. Nasz kelner (Marco?) świetnie poradził sobie z naszym dzieckiem. Na pewno wrócimy w przyszłym miesiącu.",
		tags: ["Makaron", "Obsługa"],
		table: "T7",
	},
	{
		id: 2,
		rating: 5,
		when: "47 min temu",
		code: "LUCIA-8PQ2",
		status: "redeemed" as const,
		text: "Najlepsze tiramisù w okolicy, bez dwóch zdań.",
		tags: ["Deser"],
		table: "T3",
	},
	{
		id: 3,
		rating: 4,
		when: "1 godz. temu",
		code: "LUCIA-MN4V",
		status: "open" as const,
		text: "Świetna atmosfera, karta win mile zaskoczyła. Makaron przyszedł lekko wystygnięty.",
		tags: ["Karta win", "Atmosfera"],
		table: "T12",
	},
	{
		id: 4,
		rating: 5,
		when: "2 godz. temu",
		code: "LUCIA-ZX71",
		status: "open" as const,
		text: "",
		tags: [],
		table: "T5",
	},
	{
		id: 5,
		rating: 3,
		when: "3 godz. temu",
		code: "LUCIA-RR09",
		status: "open" as const,
		text: "Jedzenie było dobre, ale na primo czekaliśmy 40 minut. Lokal był jednak zapchany — rozumiem.",
		tags: ["Obsługa"],
		table: "T9",
	},
	{
		id: 6,
		rating: 5,
		when: "Wczoraj",
		code: "LUCIA-K2LM",
		status: "redeemed" as const,
		text: "Czułam się jak w Bolonii. Burrata z brzoskwiniami to objawienie.",
		tags: ["Makaron", "Atmosfera"],
		table: "T2",
	},
	{
		id: 7,
		rating: 4,
		when: "Wczoraj",
		code: "LUCIA-7YHT",
		status: "expired" as const,
		text: "Solidne miejsce na wieczór w tygodniu. Wpadnę tu z teściami.",
		tags: ["Atmosfera"],
		table: "T11",
	},
	{
		id: 8,
		rating: 5,
		when: "2 dni temu",
		code: "LUCIA-BB52",
		status: "open" as const,
		text: "Lucia podeszła osobiście do naszego stolika, żeby zapytać, jak się czujemy. Taka troska to rzadkość.",
		tags: ["Obsługa"],
		table: "T6",
	},
];

export type FeedbackItem = (typeof MOCK_FEEDBACK)[number];

export const FeedbackPage = () => {
	const [selected, setSelected] = useState(MOCK_FEEDBACK[0].id);
	const [filter, setFilter] = useState("all");

	const list =
		filter === "all"
			? MOCK_FEEDBACK
			: filter === "5"
				? MOCK_FEEDBACK.filter((f) => f.rating === 5)
				: filter === "low"
					? MOCK_FEEDBACK.filter((f) => f.rating <= 3)
					: MOCK_FEEDBACK;

	const selectedItem = MOCK_FEEDBACK.find((f) => f.id === selected);

	return (
		<div style={{ display: "flex", height: "100%", minHeight: "calc(100vh - 50px)" }}>
			{/* List panel */}
			<div
				style={{
					width: 340,
					borderRight: "0.5px solid rgba(31,26,21,0.08)",
					display: "flex",
					flexDirection: "column",
					flexShrink: 0,
				}}
			>
				<div style={{ padding: "18px 18px 12px" }}>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontSize: 24,
							fontStyle: "italic",
							letterSpacing: "-0.01em",
							color: "var(--fb-ink)",
						}}
					>
						Opinie
					</div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 11,
							color: "rgba(31,26,21,0.5)",
							marginTop: 3,
						}}
					>
						{MOCK_FEEDBACK.length} wpisów · 12 nieprzeczytanych
					</div>
					<FeedbackFilters filter={filter} onFilterChange={setFilter} />
				</div>
				<div style={{ flex: 1, overflowY: "auto" }}>
					{list.map((item) => (
						<FeedbackRow
							key={item.id}
							item={item}
							selected={selected === item.id}
							onClick={() => setSelected(item.id)}
						/>
					))}
				</div>
			</div>

			{/* Detail panel */}
			<div style={{ flex: 1, background: "#fff" }}>
				{selectedItem && <FeedbackDetail item={selectedItem} />}
			</div>
		</div>
	);
};
