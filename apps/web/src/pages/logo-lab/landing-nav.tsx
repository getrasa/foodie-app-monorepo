import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface LandingNavProps {
	logo: ReactNode;
	tone?: "light" | "dark";
}

export const LandingNav = ({ logo, tone = "light" }: LandingNavProps) => {
	const navigate = useNavigate();
	const isDark = tone === "dark";

	const linkColor = isDark ? "rgba(251,247,239,0.62)" : "var(--fb-ink-soft)";
	const ghostText = isDark ? "var(--fb-cream)" : "var(--fb-ink)";
	const primaryBg = isDark ? "var(--fb-cream)" : "var(--fb-ink)";
	const primaryText = isDark ? "var(--fb-ink)" : "var(--fb-cream)";

	return (
		<nav
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "22px 32px",
				maxWidth: 1240,
				margin: "0 auto",
			}}
		>
			{logo}
			<div
				className="fb-nav-links"
				style={{
					display: "flex",
					gap: 28,
					fontSize: 14,
					color: linkColor,
				}}
			>
				<a href="#how" style={{ color: "inherit", textDecoration: "none" }}>
					Jak to działa
				</a>
				<a href="#why" style={{ color: "inherit", textDecoration: "none" }}>
					Dlaczego my
				</a>
				<a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>
					Cennik
				</a>
				<a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>
					FAQ
				</a>
			</div>
			<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
				<button
					type="button"
					onClick={() => void navigate({ to: "/login" })}
					style={{
						padding: "9px 16px",
						borderRadius: 10,
						fontSize: 13.5,
						color: ghostText,
						background: "transparent",
						border: "none",
						cursor: "pointer",
					}}
				>
					Zaloguj się
				</button>
				<button
					type="button"
					className="fb-nav-signup"
					onClick={() => void navigate({ to: "/signup" })}
					style={{
						padding: "10px 18px",
						borderRadius: 10,
						background: primaryBg,
						color: primaryText,
						fontSize: 13.5,
						fontWeight: 500,
						cursor: "pointer",
						border: "none",
						whiteSpace: "nowrap",
					}}
				>
					Wypróbuj za darmo →
				</button>
			</div>
		</nav>
	);
};
