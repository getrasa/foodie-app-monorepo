import { useState } from "react";
import { FeedbackFilters } from "./components/feedback-filters";
import { FeedbackRow } from "./components/feedback-card";
import { FeedbackDetail } from "./components/feedback-detail";

const MOCK_FEEDBACK = [
	{
		id: 1,
		rating: 5,
		when: "12 min ago",
		code: "LUCIA-4KX9",
		status: "open" as const,
		text: "The tagliatelle al ragù was unreal. Our server (Marco?) was wonderful with our kid. Back next month for sure.",
		tags: ["The pasta", "Service"],
		table: "T7",
	},
	{
		id: 2,
		rating: 5,
		when: "47 min ago",
		code: "LUCIA-8PQ2",
		status: "redeemed" as const,
		text: "Best tiramisù in the neighborhood, hands down.",
		tags: ["Dessert"],
		table: "T3",
	},
	{
		id: 3,
		rating: 4,
		when: "1 hr ago",
		code: "LUCIA-MN4V",
		status: "open" as const,
		text: "Lovely atmosphere, wine list was surprising in the best way. Pasta arrived a touch cold.",
		tags: ["Wine list", "Atmosphere"],
		table: "T12",
	},
	{
		id: 4,
		rating: 5,
		when: "2 hr ago",
		code: "LUCIA-ZX71",
		status: "open" as const,
		text: "",
		tags: [],
		table: "T5",
	},
	{
		id: 5,
		rating: 3,
		when: "3 hr ago",
		code: "LUCIA-RR09",
		status: "open" as const,
		text: "Food was good but we waited 40 minutes for the primo. Place was packed though — understandable.",
		tags: ["Service"],
		table: "T9",
	},
	{
		id: 6,
		rating: 5,
		when: "Yesterday",
		code: "LUCIA-K2LM",
		status: "redeemed" as const,
		text: "Felt like being in Bologna. The burrata with peaches is a revelation.",
		tags: ["The pasta", "Atmosphere"],
		table: "T2",
	},
	{
		id: 7,
		rating: 4,
		when: "Yesterday",
		code: "LUCIA-7YHT",
		status: "expired" as const,
		text: "Solid spot for a weeknight. Will bring the in-laws.",
		tags: ["Atmosphere"],
		table: "T11",
	},
	{
		id: 8,
		rating: 5,
		when: "2 days ago",
		code: "LUCIA-BB52",
		status: "open" as const,
		text: "Lucia came out to our table to check on us. That kind of care is rare.",
		tags: ["Service"],
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
						Feedback
					</div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 11,
							color: "rgba(31,26,21,0.5)",
							marginTop: 3,
						}}
					>
						{MOCK_FEEDBACK.length} entries · 12 unread
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
