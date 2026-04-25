import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { StaticStar } from "#/pages/console/shared/static-star";

const CheckIcon = () => (
	<svg width="14" height="14" viewBox="0 0 14 14">
		<path d="M3 7.5l2.5 2.5L11 4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const StarSvg = ({ size = 11, filled = true }: { size?: number; filled?: boolean }) => (
	<svg width={size} height={size} viewBox="0 0 44 44">
		<path d="M22 3.5L27.4 15.6L40.5 17.1L30.8 26.2L33.4 39.2L22 32.6L10.6 39.2L13.2 26.2L3.5 17.1L16.6 15.6L22 3.5Z" fill={filled ? "var(--fb-primary)" : "rgba(31,26,21,0.18)"} />
	</svg>
);

export const LandingPage = () => {
	const navigate = useNavigate();
	const [openFaq, setOpenFaq] = useState(0);

	return (
		<div style={{ background: "var(--fb-cream)", color: "var(--fb-ink)", fontFamily: "var(--fb-sans)", lineHeight: 1.5 }}>
			{/* ─── NAV ─── */}
			<nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 32px", maxWidth: 1240, margin: "0 auto" }}>
				<div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 15 }}>
					<div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 16 }}>F</div>
					<span>FeedbackBite</span>
				</div>
				<div style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--fb-ink-soft)" }}>
					<a href="#how" style={{ color: "inherit", textDecoration: "none" }}>How it works</a>
					<a href="#why" style={{ color: "inherit", textDecoration: "none" }}>Why us</a>
					<a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>Pricing</a>
					<a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
				</div>
				<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
					<button type="button" onClick={() => void navigate({ to: "/login" })} style={{ padding: "9px 16px", borderRadius: 10, fontSize: 13.5, color: "var(--fb-ink)", background: "transparent", border: "none", cursor: "pointer" }}>Sign in</button>
					<button type="button" onClick={() => void navigate({ to: "/signup" })} style={{ padding: "10px 18px", borderRadius: 10, background: "var(--fb-ink)", color: "var(--fb-cream)", fontSize: 13.5, fontWeight: 500, cursor: "pointer", border: "none", whiteSpace: "nowrap" }}>Start free →</button>
				</div>
			</nav>

			{/* ─── HERO ─── */}
			<header style={{ position: "relative", padding: "32px 0 80px", overflow: "hidden", maxWidth: 1240, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
				<div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center" }}>
					<div>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>For neighborhood restaurants</div>
						<h1 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(52px, 6vw, 80px)", lineHeight: 1.02, letterSpacing: "-0.025em", margin: "18px 0 0", fontWeight: 400 }}>
							Honest feedback.<br />Sweet little <em style={{ color: "var(--fb-primary)", fontFamily: "var(--fb-serif)", fontStyle: "italic" }}>discounts.</em>
						</h1>
						<p style={{ marginTop: 36, fontSize: 18, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 520 }}>
							FeedbackBite turns the moment after a meal into a private conversation between you and your guests — rewarded with a discount that brings them back. No app, no sign-up, 30 seconds.
						</p>
						<div style={{ marginTop: 36, display: "flex", gap: 12, alignItems: "center" }}>
							<button type="button" onClick={() => void navigate({ to: "/signup" })} style={{ padding: "14px 24px", borderRadius: 12, background: "var(--fb-ink)", color: "var(--fb-cream)", fontSize: 15, fontWeight: 500, cursor: "pointer", border: "none", whiteSpace: "nowrap" }}>Start free →</button>
							<a href="#how" style={{ padding: "14px 24px", borderRadius: 12, fontSize: 15, color: "var(--fb-ink)", textDecoration: "none" }}>See how it works</a>
						</div>
						<div style={{ marginTop: 22, display: "flex", gap: 22, fontSize: 13, color: "var(--fb-ink-mute)" }}>
							{["No credit card", "Setup in 8 minutes", "Cancel anytime"].map((t) => (
								<span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
									<span style={{ color: "var(--fb-olive)" }}><CheckIcon /></span>
									{t}
								</span>
							))}
						</div>
					</div>

					{/* Hero visual */}
					<div style={{ position: "relative", height: 540, display: "flex", alignItems: "center", justifyContent: "center" }}>
						<div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at 60% 40%, rgba(200,106,62,0.16), transparent 65%)", zIndex: 0 }} />

						{/* Floating review note */}
						<div style={{ position: "absolute", left: -10, top: 80, zIndex: 4, width: 200, padding: "14px 16px", background: "var(--fb-cream)", borderRadius: 14, border: "0.5px solid var(--fb-line)", boxShadow: "0 16px 30px -10px rgba(31,26,21,0.18)", transform: "rotate(-4deg)", fontSize: 12.5, lineHeight: 1.45, color: "var(--fb-ink-soft)" }}>
							<div style={{ display: "flex", gap: 1, marginBottom: 6 }}>
								{[1, 2, 3, 4, 5].map((i) => <StarSvg key={i} size={10} />)}
							</div>
							"The tagliatelle al ragù was unreal. Marco was wonderful with our kid."
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9.5, letterSpacing: "0.08em", color: "var(--fb-ink-mute)", marginTop: 6, textTransform: "uppercase" }}>— TABLE 7 · 12 MIN AGO</div>
						</div>

						{/* Phone */}
						<div style={{ position: "relative", zIndex: 2, width: 280, height: 540, borderRadius: 36, background: "var(--fb-cream)", boxShadow: "0 0 0 8px var(--fb-ink), 0 30px 60px -15px rgba(31,26,21,0.35), 0 10px 20px -5px rgba(31,26,21,0.2)", overflow: "hidden", padding: "28px 22px", display: "flex", flexDirection: "column" }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--fb-mono)", fontSize: 9.5, color: "var(--fb-ink-mute)", letterSpacing: "0.08em", padding: "0 4px" }}>
								<span>9:41</span>
								<span>● ▮▮</span>
							</div>
							<div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, marginTop: 24 }}>L</div>
							<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1.02, marginTop: 18 }}>How was<br />the meal?</div>
							<div style={{ display: "flex", gap: 4, marginTop: 22 }}>
								{[1, 2, 3, 4, 5].map((i) => <StarSvg key={i} size={32} />)}
							</div>
							<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 20, color: "var(--fb-primary)", marginTop: 14 }}>Delizioso</div>
						</div>

						{/* Tilted coupon */}
						<div style={{ position: "absolute", right: -60, bottom: 60, zIndex: 3, width: 300, padding: "18px 18px 16px", background: "var(--fb-ink)", color: "var(--fb-cream)", borderRadius: 16, boxShadow: "0 24px 50px -12px rgba(31,26,21,0.4)", transform: "rotate(4deg)" }}>
							<div style={{ position: "absolute", left: -9, top: "60%", width: 18, height: 18, borderRadius: "50%", background: "var(--fb-cream)" }} />
							<div style={{ position: "absolute", right: -9, top: "60%", width: 18, height: 18, borderRadius: "50%", background: "var(--fb-cream)" }} />
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>Trattoria da Lucia</div>
							<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 38, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>15% off your next visit</div>
							<div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>dine-in · show code to server</div>
							<div style={{ margin: "14px 0 10px", borderTop: "1px dashed rgba(251,247,239,0.25)" }} />
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>Code</div>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 16, letterSpacing: "0.12em" }}>LUCIA-4KX9</div>
						</div>
					</div>
				</div>
			</header>

			{/* ─── LOGOS ─── */}
			<div style={{ padding: "32px 0 60px", textAlign: "center", maxWidth: 1240, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
				<div style={{ color: "var(--fb-ink-mute)", fontSize: 13, marginBottom: 22 }}>Beloved by independent restaurants from Brooklyn to Bologna</div>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 56, flexWrap: "wrap", opacity: 0.7 }}>
					{["Trattoria da Lucia", "Hoja Verde Taquería", "The Salt House", "Maru Ramen", "Petite Marie", "Solea & Co."].map((name) => (
						<div key={name} style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", color: "var(--fb-ink)", display: "flex", alignItems: "center", gap: 8 }}>
							{name}
						</div>
					))}
				</div>
			</div>

			<hr style={{ border: "none", borderTop: "0.5px solid var(--fb-line)", maxWidth: 1240, margin: "0 auto" }} />

			{/* ─── HOW IT WORKS ─── */}
			<section id="how" style={{ padding: "96px 0", background: "var(--fb-paper)" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>How it works</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400 }}>From scan to "see you next week," in under a minute.</h2>
						<p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>Print one QR code, place it where guests linger. The rest is automatic — and it lands in your inbox before they've left the table.</p>
					</div>

					<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
						{[
							{ num: "01 · Place", h: "Print the QR, place the QR.", p: "Table tents, receipts, the bottom of the bill — anywhere a guest is settling up. We generate print-ready PDFs in your branding.", art: "qr" },
							{ num: "02 · Listen", h: "Guests rate, in their own words.", p: "No accounts, no apps. Stars, optional comment, optional tags. Even three-star feedback comes in honestly — because it's private to you.", art: "stars" },
							{ num: "03 · Reward", h: "A discount, only from you.", p: "A unique code lands on their phone the moment they submit. They redeem it on their next visit — and they almost always come back.", art: "coupon" },
						].map((step) => (
							<article key={step.num} style={{ background: "var(--fb-cream)", border: "0.5px solid var(--fb-line)", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
								<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, color: "var(--fb-primary)", letterSpacing: "0.06em" }}>{step.num}</div>
								<h3 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 28, letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>{step.h}</h3>
								<p style={{ fontSize: 14.5, color: "var(--fb-ink-soft)", lineHeight: 1.55, margin: 0 }}>{step.p}</p>
								<div style={{ height: 180, borderRadius: 12, background: "var(--fb-paper)", border: "0.5px solid var(--fb-line)", display: "grid", placeItems: "center", overflow: "hidden" }}>
									{step.art === "qr" && <div style={{ background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 4px 12px rgba(31,26,21,0.08)" }}><QrIllustration /></div>}
									{step.art === "stars" && <div style={{ display: "flex", gap: 6 }}>{[1, 2, 3, 4, 5].map((i) => <StarSvg key={i} size={32} filled={i < 5} />)}</div>}
									{step.art === "coupon" && (
										<div style={{ background: "var(--fb-ink)", color: "var(--fb-cream)", borderRadius: 12, padding: "14px 16px", position: "relative", width: "75%", boxShadow: "0 8px 18px -6px rgba(31,26,21,0.25)" }}>
											<div style={{ position: "absolute", left: -7, top: "55%", width: 14, height: 14, borderRadius: "50%", background: "var(--fb-paper)" }} />
											<div style={{ position: "absolute", right: -7, top: "55%", width: 14, height: 14, borderRadius: "50%", background: "var(--fb-paper)" }} />
											<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, opacity: 0.5, letterSpacing: "0.08em" }}>TRATTORIA DA LUCIA</div>
											<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>15% off</div>
											<div style={{ fontFamily: "var(--fb-mono)", fontSize: 12, letterSpacing: "0.1em", marginTop: 10, paddingTop: 8, borderTop: "1px dashed rgba(251,247,239,0.25)" }}>LUCIA-4KX9</div>
										</div>
									)}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* ─── WHY FEEDBACKBITE ─── */}
			<section id="why" style={{ padding: "96px 0" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Why FeedbackBite</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400 }}>Yelp is for strangers. This is for your regulars.</h2>
						<p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>Most feedback tools were built for chains. We built FeedbackBite for the kind of place where the owner still walks the dining room.</p>
					</div>

					<div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center" }}>
						<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
							{[
								{ h: "Private by default.", p: "Feedback comes to you, not to the internet. Honest critique without the public-shame loop — and your one-star nights stop being your worst nights." },
								{ h: "The reward brings them back.", p: <>A small discount on their next visit — yours to set, yours to redeem. We've seen <strong>17% redemption rates</strong> in the wild. That's repeat business, not loyalty theater.</> },
								{ h: "Google reviews, no arm-twisting.", p: <>Happy guests get gently invited to leave a public Google review — <strong>after</strong> they've already received their discount. Fully optional, fully Google-policy compliant.</> },
								{ h: "Cashier-friendly redemption.", p: "Type the code, see the rating, mark redeemed. No POS integration to fight, no plugin to install. It works alongside whatever you already use." },
							].map((item, idx) => (
								<div key={idx} style={{ padding: "24px 0", borderTop: "0.5px solid var(--fb-line)", display: "grid", gridTemplateColumns: "32px 1fr", gap: 18, alignItems: "start", ...(idx === 3 ? { borderBottom: "0.5px solid var(--fb-line)" } : {}) }}>
									<div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", marginTop: 2 }}>
										<StaticStar size={12} />
									</div>
									<div>
										<h3 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.15, margin: 0 }}>{item.h}</h3>
										<p style={{ marginTop: 6, fontSize: 14.5, color: "var(--fb-ink-soft)", lineHeight: 1.55 }}>{item.p}</p>
									</div>
								</div>
							))}
						</div>

						{/* Dashboard mock */}
						<div style={{ background: "#fff", borderRadius: 18, border: "0.5px solid var(--fb-line)", boxShadow: "0 30px 60px -20px rgba(31,26,21,0.2)", overflow: "hidden", transform: "rotate(-1deg)" }}>
							<div style={{ height: 36, background: "var(--fb-paper)", display: "flex", alignItems: "center", gap: 6, padding: "0 14px", borderBottom: "0.5px solid var(--fb-line)" }}>
								<div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
								<div style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
								<div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
								<div style={{ marginLeft: 14, fontFamily: "var(--fb-mono)", fontSize: 10.5, color: "var(--fb-ink-mute)" }}>app.feedbackbite.co/lucia</div>
							</div>
							<div style={{ display: "flex", minHeight: 360 }}>
								<div style={{ width: 130, padding: "14px 10px", background: "var(--fb-paper)", display: "flex", flexDirection: "column", gap: 4, borderRight: "0.5px solid var(--fb-line)" }}>
									{["Feedback", "Analytics", "Discount", "QR code", "Redeem"].map((label, idx) => (
										<div key={label} style={{ padding: "7px 10px", borderRadius: 6, fontSize: 11.5, color: idx === 0 ? "var(--fb-ink)" : "var(--fb-ink-soft)", fontWeight: idx === 0 ? 500 : 400, background: idx === 0 ? "#fff" : "transparent", display: "flex", alignItems: "center", gap: 7 }}>
											<span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.5 }} />
											{label}
										</div>
									))}
								</div>
								<div style={{ flex: 1, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
									<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em" }}>This week</div>
									<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
										{[{ l: "Avg rating", v: "4.6" }, { l: "New", v: "38" }, { l: "Redeemed", v: "17%" }].map((s) => (
											<div key={s.l} style={{ padding: "10px 12px", background: "var(--fb-paper)", borderRadius: 8 }}>
												<div style={{ fontFamily: "var(--fb-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>{s.l}</div>
												<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1, marginTop: 4 }}>{s.v}</div>
											</div>
										))}
									</div>
									{[
										{ stars: 5, text: '"The tagliatelle al ragù was unreal. Marco was wonderful with our kid…"' },
										{ stars: 4, text: '"Lovely atmosphere, wine list was a surprise. Pasta arrived a touch cold…"' },
									].map((row, idx) => (
										<div key={idx} style={{ padding: "10px 12px", border: "0.5px solid var(--fb-line)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 6 }}>
											<div style={{ display: "flex", gap: 1 }}>{[1, 2, 3, 4, 5].map((i) => <StarSvg key={i} filled={i <= row.stars} />)}</div>
											<div style={{ fontSize: 11.5, color: "var(--fb-ink-soft)", lineHeight: 1.4 }}>{row.text}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─── STATS ─── */}
			<section style={{ padding: 0 }}>
				<div style={{ background: "var(--fb-ink)", color: "var(--fb-cream)", borderRadius: 24, margin: "0 auto", padding: "80px 64px", maxWidth: 1240 }}>
					<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,247,239,0.55)" }}>The math behind the meal</div>
					<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400, color: "var(--fb-cream)" }}>The numbers from our beta restaurants.</h2>
					<p style={{ marginTop: 16, maxWidth: 580, color: "rgba(251,247,239,0.65)" }}>After 90 days across 47 independent restaurants in the US and Europe.</p>

					<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 48 }}>
						{[
							{ v: "4.7×", l: "More feedback received vs. paper comment cards or \"tell us how we did\" emails." },
							{ v: "17%", l: "Discount redemption rate — i.e. repeat visits directly attributable to FeedbackBite." },
							{ v: "+0.4", l: "Average lift in Google star rating after 60 days, with no fake reviews and no nudging." },
							{ v: "$23", l: "Average revenue per scan, after discount. (Average ticket $86, average discount 15%.)" },
						].map((stat) => (
							<div key={stat.v} style={{ borderTop: "0.5px solid rgba(251,247,239,0.15)", paddingTop: 18 }}>
								<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(48px, 5vw, 68px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--fb-primary)" }}>{stat.v}</div>
								<div style={{ marginTop: 12, fontSize: 13.5, color: "rgba(251,247,239,0.65)", lineHeight: 1.45 }}>{stat.l}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── QUOTE ─── */}
			<section style={{ padding: "120px 0" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "center" }}>
						<div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 18, background: "radial-gradient(ellipse at 35% 30%, rgba(200,106,62,0.22), transparent 60%), linear-gradient(160deg, var(--fb-paper) 0%, var(--fb-paper-2) 100%)", border: "0.5px solid var(--fb-line)", display: "grid", placeItems: "center" }}>
							<div style={{ width: "64%", height: "70%", borderRadius: 14, background: "linear-gradient(160deg, rgba(31,26,21,0.07) 0%, rgba(31,26,21,0.18) 100%)", display: "grid", placeItems: "center", fontFamily: "var(--fb-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>Owner photo</div>
						</div>
						<div>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Owner story</div>
							<blockquote style={{ margin: 0, marginTop: 18, fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.18, letterSpacing: "-0.015em", color: "var(--fb-ink)" }}>
								"We tried four 'review tools' before this. They were all built for chains and they all wanted us to game the system. FeedbackBite is the first one that just feels like a conversation with my guests — and our regulars actually use the codes."
							</blockquote>
							<div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--fb-ink-soft)" }}>
								<span style={{ display: "block", height: 1, width: 40, background: "var(--fb-ink)", opacity: 0.4 }} />
								<div>
									<div style={{ color: "var(--fb-ink)", fontWeight: 500 }}>Lucia Romano</div>
									<div>Owner · Trattoria da Lucia · Brooklyn</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─── PRICING ─── */}
			<section id="pricing" style={{ padding: "96px 0", background: "var(--fb-paper)" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Pricing</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400 }}>Simple, like a good ragù.</h2>
						<p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>One restaurant, one price. No per-feedback fees, no per-redemption fees, no setup fees. Try it free for 30 days.</p>
					</div>

					<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
						<PriceCard tier="Trattoria" sub="Up to 200 feedbacks/mo" price="$29" features={["Unlimited QR codes & locations", "Discount engine + cashier mode", "Google review nudge", "Email support"]} onCta={() => void navigate({ to: "/signup" })} />
						<PriceCard tier="Osteria" sub="Unlimited feedback, multi-location" price="$59" features={["Everything in Trattoria", "Up to 5 locations under one account", "Custom branding on diner flow", "Weekly digest + low-rating alerts", "Priority support"]} featured onCta={() => void navigate({ to: "/signup" })} />
						<PriceCard tier="Famiglia" sub="For groups & small chains" price="Let's talk" features={["6+ locations", "Manager-level dashboards & roles", "CSV/API export", "Dedicated onboarding"]} ghost onCta={() => void navigate({ to: "/signup" })} />
					</div>
				</div>
			</section>

			{/* ─── FAQ ─── */}
			<section id="faq" style={{ padding: "96px 0" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60 }}>
						<div>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>FAQ</div>
							<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400 }}>Questions, asked at the table.</h2>
							<p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)" }}>Still curious? Email <span style={{ color: "var(--fb-primary)" }}>hello@feedbackbite.co</span> — we read every note.</p>
						</div>

						<div style={{ display: "flex", flexDirection: "column" }}>
							{FAQ_ITEMS.map((faq, idx) => (
								<FaqItem key={idx} q={faq.q} a={faq.a} open={openFaq === idx} onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} isLast={idx === FAQ_ITEMS.length - 1} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ─── FINAL CTA ─── */}
			<section style={{ textAlign: "center", padding: "140px 0 100px", background: "radial-gradient(ellipse at 50% 100%, rgba(200,106,62,0.15), transparent 70%), var(--fb-cream)" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(56px, 8vw, 110px)", lineHeight: 0.95, letterSpacing: "-0.025em", margin: "0 auto", maxWidth: 880, fontWeight: 400 }}>
						The best feedback<br />is the kind that <em style={{ color: "var(--fb-primary)", fontFamily: "var(--fb-serif)", fontStyle: "italic" }}>comes back.</em>
					</h2>
					<p style={{ margin: "24px auto 0", fontSize: 18, color: "var(--fb-ink-soft)", maxWidth: 480, lineHeight: 1.5 }}>Set up FeedbackBite in eight minutes. Free for 30 days, no card required.</p>
					<button type="button" onClick={() => void navigate({ to: "/signup" })} style={{ marginTop: 40, padding: "14px 24px", borderRadius: 12, background: "var(--fb-ink)", color: "var(--fb-cream)", fontSize: 15, fontWeight: 500, cursor: "pointer", border: "none" }}>Start free →</button>
					<div style={{ marginTop: 22, fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>No credit card · No app · 8-minute setup</div>
				</div>
			</section>

			{/* ─── FOOTER ─── */}
			<footer style={{ padding: "48px 0 40px", borderTop: "0.5px solid var(--fb-line)", color: "var(--fb-ink-soft)", fontSize: 13 }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
						<div>
							<div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 16, marginBottom: 12, color: "var(--fb-ink)" }}>
								<div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 16 }}>F</div>
								FeedbackBite
							</div>
							<div style={{ fontSize: 13, color: "var(--fb-ink-soft)", maxWidth: 280, lineHeight: 1.55 }}>Honest feedback and sweet little discounts, for the kind of place where the owner still walks the dining room.</div>
						</div>
						{[
							{ h: "Product", links: ["How it works", "Pricing", "Restaurant gallery", "Changelog"] },
							{ h: "Company", links: ["About", "Blog", "Contact", "Press"] },
							{ h: "Legal", links: ["Privacy", "Terms", "Google policy compliance"] },
						].map((col) => (
							<div key={col.h}>
								<div style={{ fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fb-ink-mute)", marginBottom: 14 }}>{col.h}</div>
								{col.links.map((link) => (
									<a key={link} href="#" style={{ display: "block", padding: "4px 0", color: "inherit", textDecoration: "none" }}>{link}</a>
								))}
							</div>
						))}
					</div>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "0.5px solid var(--fb-line)" }}>
						<div>© 2026 FeedbackBite, Inc.</div>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>v 0.7 · Beta</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

/* ─── Sub-components ─── */

const QrIllustration = () => (
	<svg width="80" height="80" viewBox="0 0 21 21" shapeRendering="crispEdges">
		<rect width="21" height="21" fill="#fff" />
		<rect x="0" y="0" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="6" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="6" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="2" y="2" width="3" height="3" fill="var(--fb-ink)" />
		<rect x="14" y="0" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="6" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="20" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="16" y="2" width="3" height="3" fill="var(--fb-ink)" />
		<rect x="0" y="14" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="20" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="14" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="6" y="14" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="2" y="16" width="3" height="3" fill="var(--fb-ink)" />
		<rect x="9" y="2" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="3" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="8" y="5" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="11" width="1" height="1" fill="var(--fb-ink)" />
	</svg>
);

const PriceCard = ({ tier, sub, price, features, featured, ghost, onCta }: {
	tier: string; sub: string; price: string; features: string[];
	featured?: boolean; ghost?: boolean; onCta: () => void;
}) => (
	<article style={{
		padding: "32px 28px", background: featured ? "var(--fb-ink)" : "var(--fb-cream)",
		borderRadius: 18, border: featured ? "none" : "0.5px solid var(--fb-line)",
		color: featured ? "var(--fb-cream)" : "var(--fb-ink)",
		display: "flex", flexDirection: "column", gap: 18,
		boxShadow: featured ? "0 24px 50px -16px rgba(31,26,21,0.3)" : "none",
	}}>
		<div>
			{featured && <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 6, background: "var(--fb-primary)", color: "var(--fb-cream)", fontFamily: "var(--fb-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Most chosen</div>}
			<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1, marginTop: featured ? 12 : 0 }}>{tier}</div>
			<div style={{ marginTop: 6, fontSize: 13, color: featured ? "rgba(251,247,239,0.65)" : "var(--fb-ink-soft)" }}>{sub}</div>
		</div>
		<div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
			<span style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: price.length > 4 ? 36 : 56, lineHeight: 1, letterSpacing: "-0.02em" }}>{price}</span>
			{price.startsWith("$") && <span style={{ fontSize: 13, color: featured ? "rgba(251,247,239,0.65)" : "var(--fb-ink-soft)" }}>/ month</span>}
		</div>
		<div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
			{features.map((feat) => (
				<div key={feat} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: featured ? "rgba(251,247,239,0.65)" : "var(--fb-ink-soft)", lineHeight: 1.5 }}>
					<span style={{ flexShrink: 0, marginTop: 4, color: featured ? "var(--fb-primary)" : "var(--fb-olive)" }}><CheckIcon /></span>
					{feat}
				</div>
			))}
		</div>
		<button type="button" onClick={onCta} style={{
			width: "100%", padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
			background: ghost ? "transparent" : featured ? "var(--fb-cream)" : "var(--fb-ink)",
			color: ghost ? "var(--fb-ink)" : featured ? "var(--fb-ink)" : "var(--fb-cream)",
			border: ghost ? "1px solid rgba(31,26,21,0.2)" : "none",
		}}>
			{ghost ? "Talk to us →" : "Start free →"}
		</button>
	</article>
);

const FAQ_ITEMS = [
	{ q: "Does this comply with Google's review policies?", a: "Yes. The discount is awarded for on-platform feedback, before any mention of Google. The Google review prompt comes after, on a separate screen, clearly optional, with no review content prefilled." },
	{ q: "Do I need to integrate with my POS?", a: "No. Discounts are redeemed manually by your staff in a simple cashier-mode tab — type the code, mark redeemed. Most restaurants run it on the host stand iPad." },
	{ q: "How do you prevent abuse?", a: "Device fingerprinting, an owner-configurable daily cap (3/day default), and one-time-use discount codes. We don't ask diners for accounts — we just quietly stop the same device from claiming a stack of codes." },
	{ q: "Can I customize the look of the diner flow?", a: "On the Osteria plan, yes — your logo, accent color, and welcome copy. Trattoria customers get a tasteful default we've designed to look at home in any neighborhood restaurant." },
	{ q: "What happens if a guest leaves a one-star review?", a: "It still comes to your inbox. They still get the discount (the deal is \"leave feedback,\" not \"leave good feedback\"). And they don't get nudged toward Google — only happy guests do." },
	{ q: "Is there a free trial?", a: "30 days, no credit card required. Most owners know within a week of placing the QR codes whether it's working — we want you to have a real, busy weekend on us before you decide." },
];

const FaqItem = ({ q, a, open, onClick, isLast }: { q: string; a: string; open: boolean; onClick: () => void; isLast: boolean }) => (
	<div style={{ borderTop: "0.5px solid var(--fb-line)", padding: "22px 0", cursor: "pointer", ...(isLast ? { borderBottom: "0.5px solid var(--fb-line)" } : {}) }} onClick={onClick}>
		<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: 17, color: "var(--fb-ink)", gap: 18 }}>
			<span>{q}</span>
			<svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>
				<path d="M11 4v14M4 11h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
			</svg>
		</div>
		<div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease, margin-top 0.3s ease", color: "var(--fb-ink-soft)", fontSize: 14.5, lineHeight: 1.6, maxWidth: "90%", marginTop: open ? 12 : 0 }}>
			{a}
		</div>
	</div>
);
