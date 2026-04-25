import { UnstyledButton } from "@mantine/core";

const FILTERS = [
	{ key: "all", label: "All" },
	{ key: "5", label: "5 star" },
	{ key: "low", label: "≤3 star" },
];

interface FeedbackFiltersProps {
	filter: string;
	onFilterChange: (value: string) => void;
}

export const FeedbackFilters = ({ filter, onFilterChange }: FeedbackFiltersProps) => {
	return (
		<div style={{ display: "flex", gap: 6, marginTop: 14 }}>
			{FILTERS.map((f) => (
				<UnstyledButton
					key={f.key}
					onClick={() => onFilterChange(f.key)}
					style={{
						padding: "5px 10px",
						borderRadius: 999,
						background: filter === f.key ? "var(--fb-ink)" : "transparent",
						color: filter === f.key ? "var(--fb-cream)" : "rgba(31,26,21,0.7)",
						border: filter === f.key ? "none" : "0.5px solid rgba(31,26,21,0.15)",
						fontSize: 12,
						fontFamily: "var(--fb-sans)",
					}}
				>
					{f.label}
				</UnstyledButton>
			))}
		</div>
	);
};
