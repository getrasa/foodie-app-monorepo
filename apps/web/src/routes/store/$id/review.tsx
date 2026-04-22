import { createFileRoute } from "@tanstack/react-router";
import { StoreReviewPage } from "#/pages/store-review/store-review.page";

const RouteComponent = () => {
	const { id } = Route.useParams();
	return <StoreReviewPage storeId={id} />;
};

export const Route = createFileRoute("/store/$id/review")({
	component: RouteComponent,
});
