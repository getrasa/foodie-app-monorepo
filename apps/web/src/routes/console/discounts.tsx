import { createFileRoute } from "@tanstack/react-router";
import { DiscountsPage } from "#/pages/console/discounts/discounts.page";

export const Route = createFileRoute("/console/discounts")({
	component: () => <DiscountsPage />,
});
