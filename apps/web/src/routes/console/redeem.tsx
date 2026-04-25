import { createFileRoute } from "@tanstack/react-router";
import { RedeemPage } from "#/pages/console/redeem/redeem.page";

export const Route = createFileRoute("/console/redeem")({
	component: () => <RedeemPage />,
});
