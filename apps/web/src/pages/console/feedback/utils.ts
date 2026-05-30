import type {
	FeedbackListVoucher,
	VoucherStatus,
} from "#/lib/api/owner-feedback-api";

export interface VoucherPill {
	color: string;
	label: string;
}

export const voucherStatusPill = (
	voucher: FeedbackListVoucher | null,
): VoucherPill => {
	if (!voucher) {
		return { color: "rgba(12,10,7,0.35)", label: "Bez kodu" };
	}
	return voucherStatusLabel(voucher.status);
};

export const voucherStatusLabel = (status: VoucherStatus): VoucherPill => {
	switch (status) {
		case "active":
			return { color: "var(--fb-primary)", label: "Kod aktywny" };
		case "redeemed":
			return { color: "var(--fb-olive)", label: "Zrealizowany" };
		case "expired":
			return { color: "rgba(12,10,7,0.35)", label: "Wygasł" };
		case "voided":
			return { color: "#A63D2A", label: "Unieważniony" };
	}
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Polish relative-time formatter. Past dates only — owner console reads
// feedback that already happened.
export const formatRelativeTime = (iso: string): string => {
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return "—";
	const delta = Date.now() - then;
	if (delta < MINUTE) return "przed chwilą";
	if (delta < HOUR) {
		const mins = Math.floor(delta / MINUTE);
		return `${mins} min temu`;
	}
	if (delta < DAY) {
		const hrs = Math.floor(delta / HOUR);
		return `${hrs} godz. temu`;
	}
	if (delta < 2 * DAY) return "Wczoraj";
	if (delta < 7 * DAY) {
		const days = Math.floor(delta / DAY);
		return `${days} dni temu`;
	}
	return new Date(iso).toLocaleDateString("pl-PL", {
		day: "numeric",
		month: "short",
	});
};

export const formatExpiry = (iso: string | null): string | null => {
	if (!iso) return null;
	return new Date(iso).toLocaleDateString("pl-PL", {
		day: "numeric",
		month: "long",
	});
};
