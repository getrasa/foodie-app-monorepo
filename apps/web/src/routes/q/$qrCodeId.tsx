import { createFileRoute } from "@tanstack/react-router";
import { FeedbackPage } from "#/pages/feedback/feedback.page";

const RouteComponent = () => {
	const { qrCodeId } = Route.useParams();
	return <FeedbackPage qrCodeId={qrCodeId} />;
};

export const Route = createFileRoute("/q/$qrCodeId")({
	component: RouteComponent,
});
