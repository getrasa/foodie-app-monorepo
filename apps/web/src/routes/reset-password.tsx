import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordPage } from "#/pages/reset-password/reset-password.page";

type ResetPasswordSearch = {
	token?: string;
};

export const Route = createFileRoute("/reset-password")({
	validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => ({
		token: typeof search.token === "string" ? search.token : undefined,
	}),
	component: () => {
		const { token } = Route.useSearch();

		if (!token) {
			return (
				<div className="p-8 text-center">
					<p>Invalid or missing reset token.</p>
					<a href="/forgot-password" className="text-orange-500 underline">
						Request a new reset link
					</a>
				</div>
			);
		}

		return <ResetPasswordPage token={token} />;
	},
});
