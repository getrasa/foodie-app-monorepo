import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout } from "#/pages/console/layout/console-layout";

export const Route = createFileRoute("/console")({
	component: ConsoleLayout,
});
