import { Button } from "@mantine/core";
import type { FeedbackItem } from "../feedback.page";
import { StaticStar } from "#/pages/console/shared/static-star";

interface FeedbackDetailProps {
	item: FeedbackItem;
}

export const FeedbackDetail = ({ item }: FeedbackDetailProps) => {
	return (
		<div
			style={{
				padding: "24px 28px",
				fontFamily: "var(--fb-sans)",
				overflowY: "auto",
				height: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", gap: 3 }}>
					{[1, 2, 3, 4, 5].map((i) => (
						<StaticStar key={i} size={22} filled={i <= item.rating} />
					))}
				</div>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						color: "rgba(31,26,21,0.5)",
					}}
				>
					{item.when} · {item.table}
				</div>
			</div>

			<div
				style={{
					marginTop: 22,
					fontFamily: "var(--fb-serif)",
					fontSize: 26,
					lineHeight: 1.3,
					fontStyle: "italic",
					letterSpacing: "-0.01em",
					color: "var(--fb-ink)",
				}}
			>
				{item.text ? `"${item.text}"` : "Rating only — no comment left."}
			</div>

			{item.tags.length > 0 && (
				<div
					style={{
						display: "flex",
						gap: 6,
						flexWrap: "wrap",
						marginTop: 18,
					}}
				>
					{item.tags.map((t) => (
						<div
							key={t}
							style={{
								padding: "5px 11px",
								borderRadius: 999,
								background: "var(--fb-paper)",
								border: "0.5px solid rgba(31,26,21,0.08)",
								fontSize: 12,
								color: "rgba(31,26,21,0.7)",
							}}
						>
							{t}
						</div>
					))}
				</div>
			)}

			{/* Discount block */}
			<div
				style={{
					marginTop: 28,
					padding: 16,
					borderRadius: 12,
					background: "var(--fb-paper)",
					border: "0.5px solid rgba(31,26,21,0.08)",
				}}
			>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						letterSpacing: "0.06em",
						textTransform: "uppercase",
						color: "rgba(31,26,21,0.5)",
					}}
				>
					Discount code issued
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						marginTop: 8,
					}}
				>
					<div
						style={{
							flex: 1,
							fontFamily: "var(--fb-mono)",
							fontSize: 20,
							letterSpacing: "0.1em",
							color: "var(--fb-ink)",
						}}
					>
						{item.code}
					</div>
					<div style={{ fontSize: 12, color: "rgba(31,26,21,0.55)" }}>
						15% off · exp May 24
					</div>
				</div>
			</div>

			<div style={{ display: "flex", gap: 10, marginTop: 18 }}>
				<Button
					style={{
						flex: 1,
						height: 40,
						borderRadius: 10,
						background: "var(--fb-ink)",
						color: "var(--fb-cream)",
						border: "none",
						fontSize: 13,
						fontFamily: "var(--fb-sans)",
						fontWeight: 500,
					}}
				>
					Mark redeemed
				</Button>
				<Button
					variant="default"
					style={{
						height: 40,
						borderRadius: 10,
						background: "transparent",
						color: "var(--fb-ink)",
						border: "0.5px solid rgba(31,26,21,0.2)",
						fontSize: 13,
						fontFamily: "var(--fb-sans)",
					}}
				>
					Reply privately
				</Button>
			</div>
		</div>
	);
};
