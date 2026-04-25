import { UnstyledButton } from "@mantine/core";
import type { FeedbackItem } from "../feedback.page";
import { StaticStar } from "#/pages/console/shared/static-star";

interface FeedbackRowProps {
	item: FeedbackItem;
	selected: boolean;
	onClick: () => void;
}

export const FeedbackRow = ({ item, selected, onClick }: FeedbackRowProps) => {
	const statusColor =
		item.status === "redeemed"
			? "var(--fb-olive)"
			: item.status === "expired"
				? "rgba(31,26,21,0.35)"
				: "var(--fb-primary)";
	const statusLabel =
		item.status === "redeemed"
			? "Redeemed"
			: item.status === "expired"
				? "Expired"
				: "Code open";

	return (
		<UnstyledButton
			onClick={onClick}
			style={{
				width: "100%",
				textAlign: "left",
				padding: "14px 18px",
				background: selected ? "var(--fb-cream)" : "transparent",
				borderBottom: "0.5px solid rgba(31,26,21,0.07)",
				borderLeft: selected
					? "2px solid var(--fb-primary)"
					: "2px solid transparent",
				fontFamily: "var(--fb-sans)",
				display: "block",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					marginBottom: 6,
				}}
			>
				<div style={{ display: "flex", gap: 1.5 }}>
					{[1, 2, 3, 4, 5].map((i) => (
						<StaticStar key={i} size={11} filled={i <= item.rating} />
					))}
				</div>
				<div style={{ flex: 1 }} />
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						color: "rgba(31,26,21,0.45)",
					}}
				>
					{item.when}
				</div>
			</div>
			<div
				style={{
					fontSize: 13.5,
					lineHeight: 1.45,
					color: item.text ? "var(--fb-ink)" : "rgba(31,26,21,0.4)",
					fontStyle: item.text ? "normal" : "italic",
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical",
					overflow: "hidden",
				}}
			>
				{item.text || "(no written comment)"}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					marginTop: 8,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 5,
						fontSize: 10.5,
						color: statusColor,
						fontFamily: "var(--fb-mono)",
						letterSpacing: "0.04em",
					}}
				>
					<span
						style={{
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: statusColor,
						}}
					/>
					{statusLabel}
				</div>
				<div
					style={{
						fontSize: 11,
						color: "rgba(31,26,21,0.4)",
						fontFamily: "var(--fb-mono)",
					}}
				>
					· {item.code} · {item.table}
				</div>
			</div>
		</UnstyledButton>
	);
};
