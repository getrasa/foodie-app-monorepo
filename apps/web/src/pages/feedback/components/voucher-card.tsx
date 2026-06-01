import { useEffect, useState } from "react";
import type { IssuedVoucher } from "#/lib/api/feedback-api";

const formatExpiry = (iso: string | null): string | null => {
	if (!iso) return null;
	try {
		const date = new Date(iso);
		return new Intl.DateTimeFormat("pl-PL", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(date);
	} catch {
		return null;
	}
};

interface VoucherCardProps {
	venueName: string;
	voucher: IssuedVoucher;
}

export const VoucherCard = ({ venueName, voucher }: VoucherCardProps) => {
	const [revealed, setRevealed] = useState(false);
	const expiryLabel = formatExpiry(voucher.expiresAt);

	useEffect(() => {
		const t = window.setTimeout(() => setRevealed(true), 250);
		return () => window.clearTimeout(t);
	}, []);

	return (
		<div
			style={{
				position: "relative",
				opacity: revealed ? 1 : 0,
				transform: revealed
					? "translateY(0) scale(1)"
					: "translateY(12px) scale(0.96)",
				transition:
					"opacity 0.4s, transform 0.5s cubic-bezier(0.2,0.8,0.3,1.2)",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: -10,
					top: "58%",
					width: 20,
					height: 20,
					borderRadius: "50%",
					background: "var(--fb-cream)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					right: -10,
					top: "58%",
					width: 20,
					height: 20,
					borderRadius: "50%",
					background: "var(--fb-cream)",
				}}
			/>
			<div
				style={{
					background: "var(--fb-ink)",
					color: "var(--fb-cream)",
					borderRadius: 20,
					padding: "22px 22px 0",
					overflow: "hidden",
					boxShadow: "0 20px 40px -12px rgba(31,26,21,0.3)",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						gap: 12,
					}}
				>
					<div style={{ minWidth: 0 }}>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 10,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								opacity: 0.55,
								wordBreak: "break-word",
							}}
						>
							{venueName}
						</div>
						<div
							style={{
								fontFamily: "var(--fb-serif)",
								fontSize: 40,
								lineHeight: 1,
								marginTop: 4,
								fontStyle: "italic",
								letterSpacing: "-0.02em",
								wordBreak: "break-word",
							}}
						>
							{voucher.description}
						</div>
						<div
							style={{
								fontFamily: "var(--fb-sans)",
								fontSize: 13,
								opacity: 0.7,
								marginTop: 2,
							}}
						>
							następna wizyta · na miejscu
						</div>
					</div>
					<svg width="18" height="18" viewBox="0 0 14 14" fill="none">
						<path
							d="M7 0.5L8.2 5.3L13 6.5L8.2 7.7L7 12.5L5.8 7.7L1 6.5L5.8 5.3L7 0.5Z"
							fill="var(--fb-primary)"
						/>
					</svg>
				</div>

				<div
					style={{
						marginTop: 20,
						borderTop: "1px dashed rgba(251,247,239,0.25)",
						padding: "18px 0 22px",
					}}
				>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							opacity: 0.5,
						}}
					>
						Kod
					</div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 28,
							letterSpacing: "0.12em",
							marginTop: 4,
						}}
					>
						{voucher.code}
					</div>
					<div
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12,
							opacity: 0.55,
							marginTop: 6,
						}}
					>
						Pokaż ten ekran kelnerowi.
						{expiryLabel ? (
							<>
								<br />
								Ważny do {expiryLabel}.
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};
