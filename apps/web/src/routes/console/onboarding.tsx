import { createFileRoute } from "@tanstack/react-router";
import { OnboardingPage } from "#/pages/console/onboarding/onboarding.page";

export const Route = createFileRoute("/console/onboarding")({
	component: () => <OnboardingPage />,
});
