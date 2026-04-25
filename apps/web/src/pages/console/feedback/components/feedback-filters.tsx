import { Group, SegmentedControl, Select, TextInput } from "@mantine/core";
import { Search } from "lucide-react";

interface FeedbackFiltersProps {
	ratingFilter: string;
	onRatingFilterChange: (value: string) => void;
	dateRange: string;
	onDateRangeChange: (value: string | null) => void;
	search: string;
	onSearchChange: (value: string) => void;
}

const ratingOptions = [
	{ label: "All", value: "all" },
	{ label: "5\u2605", value: "5" },
	{ label: "4\u2605", value: "4" },
	{ label: "3\u2605", value: "3" },
	{ label: "2\u2605", value: "2" },
	{ label: "1\u2605", value: "1" },
];

const dateOptions = [
	{ label: "All time", value: "all" },
	{ label: "Last 7 days", value: "7" },
	{ label: "Last 30 days", value: "30" },
	{ label: "Last 90 days", value: "90" },
];

export const FeedbackFilters = ({
	ratingFilter,
	onRatingFilterChange,
	dateRange,
	onDateRangeChange,
	search,
	onSearchChange,
}: FeedbackFiltersProps) => {
	return (
		<Group gap="md" wrap="wrap">
			<SegmentedControl
				data={ratingOptions}
				value={ratingFilter}
				onChange={onRatingFilterChange}
				size="xs"
			/>
			<Select
				data={dateOptions}
				value={dateRange}
				onChange={onDateRangeChange}
				size="sm"
				w={160}
			/>
			<TextInput
				placeholder="Search by name or comment"
				leftSection={<Search size={16} />}
				value={search}
				onChange={(e) => onSearchChange(e.currentTarget.value)}
				size="sm"
				style={{ flex: 1, minWidth: 200 }}
			/>
		</Group>
	);
};
