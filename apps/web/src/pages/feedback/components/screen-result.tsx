import type {
	FeedbackSubmissionResult,
	ResolvedVenue,
} from "#/lib/api/feedback-api";
import { VoucherCard } from "./voucher-card";

const NO_VOUCHER_COPY: Record<string, { title: string; body: string }> = {
	no_offer: {
		title: "Opinia przyjęta",
		body: "Aktualnie ten lokal nie prowadzi promocji — ale Twoja opinia trafiła do właściciela. Dzięki!",
	},
	offer_paused: {
		title: "Opinia przyjęta",
		body: "Promocja jest tymczasowo wstrzymana — kod rabatowy nie został wystawiony. Twoja opinia trafiła do właściciela.",
	},
	daily_cap_reached: {
		title: "Już dziś korzystałeś z promocji",
		body: "Limit kodów na dziś dla tego urządzenia został wyczerpany. Twoja opinia mimo to trafiła do właściciela.",
	},
};

interface ScreenResultProps {
	venue: ResolvedVenue;
	result: FeedbackSubmissionResult;
}

export const ScreenResult = ({ venue, result }: ScreenResultProps) => {
	const { voucher, voucherUnavailableReason } = result;
	const fallback = voucherUnavailableReason
		? NO_VOUCHER_COPY[voucherUnavailableReason]
		: null;

	return (
		<div
			style={{
				padding: "60px 24px 32px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
				gap: 18,
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
				<div
					style={{
						width: 20,
						height: 20,
						borderRadius: "50%",
						background: "var(--fb-olive)",
						color: "#fff",
						display: "grid",
						placeItems: "center",
					}}
				>
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
						<path
							d="M2 5.2L4 7.2L8 2.8"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color: "rgba(31,26,21,0.6)",
					}}
				>
					Opinia przyjęta · Dziękujemy
				</div>
			</div>

			{voucher ? (
				<>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontSize: 36,
							lineHeight: 1.04,
							letterSpacing: "-0.02em",
							fontStyle: "italic",
							color: "var(--fb-ink)",
						}}
					>
						Twój kod
						<br />
						rabatowy.
					</div>
					<VoucherCard venueName={venue.name} voucher={voucher} />
					<div
						style={{
							padding: "12px 14px",
							borderRadius: 12,
							background: "var(--fb-paper)",
							border: "0.5px solid rgba(31,26,21,0.08)",
							fontFamily: "var(--fb-sans)",
							fontSize: 12.5,
							lineHeight: 1.5,
							color: "rgba(31,26,21,0.65)",
						}}
					>
						Zrób zrzut ekranu tego kodu — to Twoja najpewniejsza kopia.
					</div>
				</>
			) : (
				<div
					style={{
						padding: "20px 18px",
						borderRadius: 16,
						background: "var(--fb-paper)",
						border: "0.5px solid rgba(31,26,21,0.07)",
					}}
				>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontSize: 28,
							lineHeight: 1.08,
							letterSpacing: "-0.02em",
							fontStyle: "italic",
							color: "var(--fb-ink)",
						}}
					>
						{fallback?.title ?? "Dziękujemy za opinię"}
					</div>
					<div
						style={{
							marginTop: 8,
							fontFamily: "var(--fb-sans)",
							fontSize: 14,
							lineHeight: 1.5,
							color: "rgba(31,26,21,0.65)",
						}}
					>
						{fallback?.body ??
							"Twoja opinia trafiła do właściciela lokalu. Dziękujemy!"}
					</div>
				</div>
			)}

		</div>
	);
};
