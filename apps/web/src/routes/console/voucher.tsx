import { createFileRoute } from "@tanstack/react-router";
import { VoucherPage } from "#/pages/console/voucher/voucher.page";

export const Route = createFileRoute("/console/voucher")({
	component: () => <VoucherPage />,
});
