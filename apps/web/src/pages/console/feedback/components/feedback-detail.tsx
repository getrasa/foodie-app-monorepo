import { Button } from "@mantine/core";
import type { FeedbackDetail } from "#/lib/api/owner-feedback-api";
import { StaticStar } from "#/pages/console/shared/static-star";
import { formatExpiry, formatRelativeTime, voucherStatusLabel } from "../utils";

interface FeedbackDetailProps {
	item: FeedbackDetail;
	mutating: boolean;
	onToggleArchive: () => void;
	onMarkSpam: () => void;
}

export const FeedbackDetailView = ({
	item,
	mutating,
	onToggleArchive,
	onMarkSpam,
}: FeedbackDetailProps) => {
	const voucherPill = item.voucher
		? voucherStatusLabel(item.voucher.status)
		: null;
	const expiryLabel = item.voucher
		? formatExpiry(item.voucher.expiresAt)
		: null;
	const spam = item.spamMarkedAt !== null;
	const archived = item.archivedAt !== null;
	const voucherActive = item.voucher?.status === "active";

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
					{formatRelativeTime(item.createdAt)}
					{item.qrCodeLabel ? ` · ${item.qrCodeLabel}` : ""}
				</div>
			</div>

			{spam && (
				<div
					style={{
						marginTop: 18,
						padding: "8px 12px",
						borderRadius: 8,
						background: "rgba(166,61,42,0.08)",
						color: "#A63D2A",
						fontSize: 12,
						fontFamily: "var(--fb-mono)",
						letterSpacing: "0.04em",
					}}
				>
					Oznaczone jako spam · kod rabatowy unieważniony
				</div>
			)}

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
				{item.comment ? `„${item.comment}”` : "Sama ocena — bez komentarza."}
			</div>

			{item.customerEmail && (
				<div
					style={{
						marginTop: 14,
						fontSize: 12.5,
						color: "rgba(31,26,21,0.55)",
					}}
				>
					Gość zostawił email: {item.customerEmail}
				</div>
			)}

			{/* Voucher block */}
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
					Wydany kod rabatowy
				</div>
				{item.voucher ? (
					<>
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
								{item.voucher.code}
							</div>
							<div
								style={{
									fontSize: 12,
									color: "rgba(31,26,21,0.55)",
								}}
							>
								{item.voucher.description}
								{expiryLabel ? ` · ważny do ${expiryLabel}` : ""}
							</div>
						</div>
						{voucherPill && (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 5,
									marginTop: 10,
									fontSize: 11,
									color: voucherPill.color,
									fontFamily: "var(--fb-mono)",
									letterSpacing: "0.04em",
								}}
							>
								<span
									style={{
										width: 5,
										height: 5,
										borderRadius: "50%",
										background: voucherPill.color,
									}}
								/>
								{voucherPill.label}
							</div>
						)}
					</>
				) : (
					<div
						style={{
							marginTop: 8,
							fontSize: 13,
							color: "rgba(31,26,21,0.55)",
						}}
					>
						Ten gość nie dostał kodu (oferta wstrzymana, limit dzienny lub
						wykrycie nadużycia).
					</div>
				)}
			</div>

			<div
				style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}
			>
				<Button
					variant="default"
					disabled={mutating}
					onClick={onToggleArchive}
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
					{archived ? "Przywróć z archiwum" : "Zarchiwizuj"}
				</Button>
				<Button
					variant="default"
					disabled={mutating || spam}
					onClick={onMarkSpam}
					style={{
						height: 40,
						borderRadius: 10,
						background: "transparent",
						color: spam ? "rgba(166,61,42,0.5)" : "#A63D2A",
						border: spam
							? "0.5px solid rgba(166,61,42,0.25)"
							: "0.5px solid rgba(166,61,42,0.4)",
						fontSize: 13,
						fontFamily: "var(--fb-sans)",
					}}
				>
					{spam
						? "Już oznaczone jako spam"
						: voucherActive
							? "Oznacz spam · unieważnij kod"
							: "Oznacz spam"}
				</Button>
			</div>
		</div>
	);
};
