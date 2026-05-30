import { UnstyledButton } from "@mantine/core";
import type { FeedbackListItem } from "#/lib/api/owner-feedback-api";
import { StaticStar } from "#/pages/console/shared/static-star";
import { formatRelativeTime, voucherStatusPill } from "../utils";

interface FeedbackRowProps {
	item: FeedbackListItem;
	selected: boolean;
	onClick: () => void;
}

export const FeedbackRow = ({ item, selected, onClick }: FeedbackRowProps) => {
	const pill = voucherStatusPill(item.voucher);
	const unread = item.readAt === null;
	const spam = item.spamMarkedAt !== null;

	return (
		<UnstyledButton
			onClick={onClick}
			style={{
				width: "100%",
				textAlign: "left",
				padding: "14px 18px",
				background: selected ? "var(--fb-cream)" : "transparent",
				borderBottom: "0.5px solid rgba(12,10,7,0.07)",
				borderLeft: selected
					? "2px solid var(--fb-primary)"
					: "2px solid transparent",
				fontFamily: "var(--fb-sans)",
				display: "block",
				opacity: item.archivedAt ? 0.55 : 1,
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
				{unread && !spam && (
					<span
						title="Nieprzeczytane"
						style={{
							width: 6,
							height: 6,
							borderRadius: "50%",
							background: "var(--fb-primary)",
						}}
					/>
				)}
				{spam && (
					<span
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 9.5,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "#A63D2A",
						}}
					>
						Spam
					</span>
				)}
				<div style={{ flex: 1 }} />
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						color: "rgba(12,10,7,0.45)",
					}}
				>
					{formatRelativeTime(item.createdAt)}
				</div>
			</div>
			<div
				style={{
					fontSize: 13.5,
					lineHeight: 1.45,
					color: item.comment ? "var(--fb-ink)" : "rgba(12,10,7,0.4)",
					fontStyle: item.comment ? "normal" : "italic",
					fontWeight: unread && !spam ? 500 : 400,
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical",
					overflow: "hidden",
				}}
			>
				{item.comment || "(brak komentarza)"}
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
						color: pill.color,
						fontFamily: "var(--fb-mono)",
						letterSpacing: "0.04em",
					}}
				>
					<span
						style={{
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: pill.color,
						}}
					/>
					{pill.label}
				</div>
				{item.voucher?.code && (
					<div
						style={{
							fontSize: 11,
							color: "rgba(12,10,7,0.4)",
							fontFamily: "var(--fb-mono)",
						}}
					>
						· {item.voucher.code}
					</div>
				)}
			</div>
		</UnstyledButton>
	);
};
