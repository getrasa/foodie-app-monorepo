import { createFileRoute } from "@tanstack/react-router";
import { VariantPage } from "#/pages/logo-lab/variant.page";

const Variant = () => {
	const { variant } = Route.useParams();
	return <VariantPage slug={variant} />;
};

export const Route = createFileRoute("/logo-lab/$variant")({
	component: Variant,
});
