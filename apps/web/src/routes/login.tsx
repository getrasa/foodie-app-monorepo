import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth-client";
import { LoginPage } from "#/pages/login/login.page";

const Login = () => {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isPending && session) {
			void navigate({ to: "/console/feedback" });
		}
	}, [isPending, session, navigate]);

	return <LoginPage />;
};

export const Route = createFileRoute("/login")({ component: Login });
