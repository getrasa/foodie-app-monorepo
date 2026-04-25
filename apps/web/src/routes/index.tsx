import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth-client";

const Home = () => {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isPending) {
			if (session) {
				void navigate({ to: "/console/dashboard" });
			} else {
				void navigate({ to: "/login" });
			}
		}
	}, [isPending, session, navigate]);

	return null;
};

export const Route = createFileRoute("/")({ component: Home });
