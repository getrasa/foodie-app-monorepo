import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/console/")({
	component: () => <Navigate to="/console/feedback" />,
});
