import { createFileRoute } from "@tanstack/react-router";
import { LabIndexPage } from "#/pages/logo-lab/lab-index.page";

export const Route = createFileRoute("/logo-lab/")({
	component: LabIndexPage,
});
