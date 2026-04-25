import { createFileRoute } from "@tanstack/react-router";
import { FeedbackPage } from "#/pages/console/feedback/feedback.page";

export const Route = createFileRoute("/console/feedback")({
	component: () => <FeedbackPage />,
});
