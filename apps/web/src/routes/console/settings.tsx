import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "#/pages/console/settings/settings.page";

export const Route = createFileRoute("/console/settings")({
	component: () => <SettingsPage />,
});
