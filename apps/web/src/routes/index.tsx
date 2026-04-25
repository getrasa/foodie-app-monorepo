import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth-client";
import { LandingPage } from "#/pages/landing/landing.page";

const Home = () => {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isPending && session) {
			void navigate({ to: "/console/feedback" });
		}
	}, [isPending, session, navigate]);

	if (isPending) return null;
	if (session) return null;

	return <LandingPage />;
};

export const Route = createFileRoute("/")({ component: Home });
