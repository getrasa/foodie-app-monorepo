import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { VARIANTS } from "./variants";

const TOP_BG = "#F5F0E5"; // matches variant page default bg (cream)
const CAPTION_BG = "#EAE2D0";

export const LabIndexPage = () => {
	return (
		<div
			style={{
				minHeight: "100vh",
				background: "var(--fb-cream)",
				color: "var(--fb-ink)",
				fontFamily: "var(--fb-sans)",
				lineHeight: 1.5,
			}}
		>
			{/* Header strip */}
			<header
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "32px 32px 0",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
				}}
			>
				<Link
					to="/"
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.18em",
						textTransform: "uppercase",
						color: "var(--fb-ink-mute)",
						textDecoration: "none",
					}}
				>
					← strona główna
				</Link>
				<span
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.18em",
						textTransform: "uppercase",
						color: "var(--fb-ink-mute)",
					}}
				>
					Logo Lab · {VARIANTS.length.toString().padStart(2, "0")} kierunków
				</span>
			</header>

			{/* Title block */}
			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "72px 32px 56px",
					display: "grid",
					gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
					gap: 60,
					alignItems: "end",
				}}
			>
				<div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 11,
							letterSpacing: "0.18em",
							textTransform: "uppercase",
							color: "var(--fb-primary)",
						}}
					>
						Logo Lab · osiem kierunków
					</div>
					<h1
						style={{
							fontFamily: "var(--fb-serif)",
							fontStyle: "italic",
							fontSize: "clamp(56px, 7vw, 104px)",
							lineHeight: 0.96,
							letterSpacing: "-0.035em",
							margin: "18px 0 0",
							fontWeight: 400,
						}}
					>
						Osiem sposobów,<br />
						żeby zapytać
						<br />
						<em
							style={{
								color: "var(--fb-primary)",
								fontFamily: "var(--fb-serif)",
								fontStyle: "italic",
							}}
						>
							Jak Było?
						</em>
					</h1>
				</div>
				<div style={{ paddingBottom: 12 }}>
					<p
						style={{
							fontSize: 18,
							color: "var(--fb-ink-soft)",
							lineHeight: 1.55,
							maxWidth: 460,
							fontFamily: "var(--fb-serif)",
							fontStyle: "italic",
						}}
					>
						Każdy kafelek to ten sam nagłówek strony, postawiony na innym tle, z innym logo. Klikalne — wejdź i zobacz każdy w pełnej szerokości.
					</p>
				</div>
			</section>

			<hr style={{ border: "none", borderTop: "0.5px solid var(--fb-line)", maxWidth: 1240, margin: "0 auto" }} />

			{/* Grid */}
			<section style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 32px 120px" }}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
						gap: 28,
					}}
				>
					{VARIANTS.map((v) => {
						const surfaceVars = {
							color: "var(--fb-ink)",
							"--lab-bg": TOP_BG,
						} as CSSProperties;
						return (
							<Link
								key={v.slug}
								to="/logo-lab/$variant"
								params={{ variant: v.slug }}
								style={{
									textDecoration: "none",
									color: "inherit",
									display: "block",
									border: "0.5px solid var(--fb-line)",
									borderRadius: 14,
									overflow: "hidden",
									background: CAPTION_BG,
									transition: "transform 200ms ease, box-shadow 200ms ease",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateY(-3px)";
									e.currentTarget.style.boxShadow =
										"0 24px 50px -22px rgba(12,10,7,0.22)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateY(0)";
									e.currentTarget.style.boxShadow = "none";
								}}
							>
								{/* The mini-nav preview */}
								<div
									style={{
										...surfaceVars,
										background: TOP_BG,
										padding: "16px 18px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										gap: 10,
										borderBottom: "0.5px solid rgba(12,10,7,0.06)",
										minHeight: 84,
									}}
								>
									<div
										style={{
											transform: "scale(0.78)",
											transformOrigin: "left center",
										}}
									>
										{v.logo}
									</div>
									<div
										style={{
											display: "flex",
											gap: 8,
											fontSize: 9,
											fontFamily: "var(--fb-mono)",
											color: "var(--fb-ink-mute)",
											letterSpacing: "0.14em",
											textTransform: "uppercase",
										}}
									>
										<span>jak</span>
										<span>·</span>
										<span>dla</span>
										<span>·</span>
										<span>faq</span>
									</div>
								</div>

								{/* Caption */}
								<div style={{ padding: "20px 22px 22px", background: CAPTION_BG }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "baseline",
											marginBottom: 8,
										}}
									>
										<span
											style={{
												fontFamily: "var(--fb-mono)",
												fontSize: 10.5,
												letterSpacing: "0.18em",
												textTransform: "uppercase",
												color: "var(--fb-primary)",
											}}
										>
											Wariant {v.number}
										</span>
									</div>
									<div
										style={{
											fontFamily: "var(--fb-serif)",
											fontStyle: "italic",
											fontSize: 24,
											letterSpacing: "-0.015em",
											lineHeight: 1.1,
										}}
									>
										{v.title}.
									</div>
									<p
										style={{
											marginTop: 8,
											fontSize: 13.5,
											lineHeight: 1.5,
											color: "var(--fb-ink-soft)",
										}}
									>
										{v.tagline}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</section>

			{/* Footer */}
			<footer
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "24px 32px 48px",
					borderTop: "0.5px solid var(--fb-line)",
					display: "flex",
					justifyContent: "space-between",
					fontFamily: "var(--fb-mono)",
					fontSize: 11,
					letterSpacing: "0.14em",
					textTransform: "uppercase",
					color: "var(--fb-ink-mute)",
				}}
			>
				<span>Jak Było · logo lab · 2026</span>
				<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
					⤴ strona główna
				</Link>
			</footer>
		</div>
	);
};
