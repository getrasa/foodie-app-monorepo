import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "#/pages/console/dashboard/dashboard.page";

export const Route = createFileRoute("/console/dashboard")({
	component: () => <DashboardPage />,
});
