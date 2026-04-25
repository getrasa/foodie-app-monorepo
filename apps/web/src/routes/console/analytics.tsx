import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "#/pages/console/analytics/analytics.page";

export const Route = createFileRoute("/console/analytics")({
	component: () => <AnalyticsPage />,
});
