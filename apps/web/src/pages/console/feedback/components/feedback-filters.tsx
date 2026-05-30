import { Popover, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import type {
	ArchivedFilterParam,
	RatingFilterParam,
	ReadFilterParam,
} from "#/lib/api/owner-feedback-api";
import { StaticStar } from "#/pages/console/shared/static-star";

interface FeedbackFiltersProps {
	rating: RatingFilterParam;
	read: ReadFilterParam;
	archived: ArchivedFilterParam;
	onRatingChange: (value: RatingFilterParam) => void;
	onReadChange: (value: ReadFilterParam) => void;
	onArchivedChange: (value: ArchivedFilterParam) => void;
}

const MAIN_RATING_OPTIONS: { key: RatingFilterParam; label: string }[] = [
	{ key: "all", label: "Wszystkie" },
	{ key: 5, label: "5 gwiazdek" },
	{ key: "low", label: "≤4 gwiazdki" },
];

const isMainRating = (value: RatingFilterParam): boolean =>
	MAIN_RATING_OPTIONS.some((opt) => opt.key === value);

const FINE_RATING_OPTIONS: {
	key: Exclude<RatingFilterParam, "all">;
	label: string;
}[] = [
	{ key: 5, label: "5" },
	{ key: 4, label: "4" },
	{ key: 3, label: "3" },
	{ key: 2, label: "2" },
	{ key: 1, label: "1" },
	{ key: "low", label: "≤4" },
];

const READ_OPTIONS: { key: ReadFilterParam; label: string }[] = [
	{ key: "all", label: "Wszystkie" },
	{ key: "unread", label: "Nieprzeczytane" },
	{ key: "read", label: "Przeczytane" },
];

const ARCHIVED_OPTIONS: { key: ArchivedFilterParam; label: string }[] = [
	{ key: "no", label: "Aktywne" },
	{ key: "yes", label: "Zarchiwizowane" },
	{ key: "all", label: "Wszystkie" },
];

interface ChipProps {
	selected: boolean;
	onClick: () => void;
	children: React.ReactNode;
}

const Chip = ({ selected, onClick, children }: ChipProps) => (
	<UnstyledButton
		onClick={onClick}
		style={{
			padding: "5px 10px",
			borderRadius: 999,
			background: selected ? "var(--fb-ink)" : "transparent",
			color: selected ? "var(--fb-cream)" : "rgba(12,10,7,0.7)",
			border: selected ? "none" : "0.5px solid rgba(12,10,7,0.15)",
			fontFamily: "var(--fb-sans)",
			fontSize: 12,
			display: "inline-flex",
			alignItems: "center",
			gap: 4,
		}}
	>
		{children}
	</UnstyledButton>
);

interface SectionProps {
	label: string;
	children: React.ReactNode;
}

const Section = ({ label, children }: SectionProps) => (
	<div>
		<div
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 9.5,
				letterSpacing: "0.06em",
				textTransform: "uppercase",
				color: "rgba(12,10,7,0.45)",
				marginBottom: 6,
			}}
		>
			{label}
		</div>
		<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{children}</div>
	</div>
);

export const FeedbackFilters = ({
	rating,
	read,
	archived,
	onRatingChange,
	onReadChange,
	onArchivedChange,
}: FeedbackFiltersProps) => {
	const [moreOpen, setMoreOpen] = useState(false);

	// Filtry badge counts filters not represented on the main row.
	const ratingOffMainRow = !isMainRating(rating);
	const moreCount =
		(ratingOffMainRow ? 1 : 0) +
		(read !== "all" ? 1 : 0) +
		(archived !== "no" ? 1 : 0);

	return (
		<div style={{ marginTop: 14 }}>
			<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
				{MAIN_RATING_OPTIONS.map((opt) => (
					<Chip
						key={String(opt.key)}
						selected={opt.key === rating}
						onClick={() => onRatingChange(opt.key)}
					>
						{opt.label}
					</Chip>
				))}
				<Popover
					opened={moreOpen}
					onChange={setMoreOpen}
					position="bottom-start"
					shadow="md"
					withinPortal
				>
					<Popover.Target>
						<UnstyledButton
							onClick={() => setMoreOpen((v) => !v)}
							style={{
								padding: "5px 10px",
								borderRadius: 999,
								background: moreCount > 0 ? "var(--fb-cream)" : "transparent",
								color: "rgba(12,10,7,0.7)",
								border: "0.5px solid rgba(12,10,7,0.15)",
								fontFamily: "var(--fb-sans)",
								fontSize: 12,
								display: "inline-flex",
								alignItems: "center",
								gap: 6,
							}}
						>
							<span>Filtry</span>
							{moreCount > 0 && (
								<span
									style={{
										display: "inline-grid",
										placeItems: "center",
										minWidth: 16,
										height: 16,
										padding: "0 5px",
										borderRadius: 8,
										background: "var(--fb-primary)",
										color: "var(--fb-ink)",
										fontSize: 10,
										fontFamily: "var(--fb-mono)",
										lineHeight: 1,
									}}
								>
									{moreCount}
								</span>
							)}
						</UnstyledButton>
					</Popover.Target>
					<Popover.Dropdown
						style={{
							padding: 14,
							minWidth: 260,
							display: "flex",
							flexDirection: "column",
							gap: 14,
						}}
					>
						<Section label="Ocena (dokładnie)">
							<Chip
								selected={rating === "all"}
								onClick={() => onRatingChange("all")}
							>
								Wszystkie
							</Chip>
							{FINE_RATING_OPTIONS.map((opt) => (
								<Chip
									key={String(opt.key)}
									selected={opt.key === rating}
									onClick={() => onRatingChange(opt.key)}
								>
									<span>{opt.label}</span>
									{typeof opt.key === "number" && (
										<StaticStar size={10} filled />
									)}
								</Chip>
							))}
						</Section>
						<Section label="Status">
							{READ_OPTIONS.map((opt) => (
								<Chip
									key={opt.key}
									selected={opt.key === read}
									onClick={() => onReadChange(opt.key)}
								>
									{opt.label}
								</Chip>
							))}
						</Section>
						<Section label="Archiwum">
							{ARCHIVED_OPTIONS.map((opt) => (
								<Chip
									key={opt.key}
									selected={opt.key === archived}
									onClick={() => onArchivedChange(opt.key)}
								>
									{opt.label}
								</Chip>
							))}
						</Section>
						{moreCount > 0 && (
							<UnstyledButton
								onClick={() => {
									onRatingChange("all");
									onReadChange("all");
									onArchivedChange("no");
								}}
								style={{
									alignSelf: "flex-start",
									fontFamily: "var(--fb-sans)",
									fontSize: 11.5,
									color: "rgba(12,10,7,0.55)",
									textDecoration: "underline",
								}}
							>
								Wyczyść filtry
							</UnstyledButton>
						)}
					</Popover.Dropdown>
				</Popover>
			</div>
		</div>
	);
};
