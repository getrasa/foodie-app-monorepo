import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { StaticStar } from "#/pages/console/shared/static-star";
import "./landing.css";

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
					<div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 16 }}>J</div>
					<span>Jak Było</span>
				</div>
				<div className="fb-nav-links" style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--fb-ink-soft)" }}>
					<a href="#how" style={{ color: "inherit", textDecoration: "none" }}>Jak to działa</a>
					<a href="#why" style={{ color: "inherit", textDecoration: "none" }}>Dlaczego my</a>
					<a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>Cennik</a>
					<a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
				</div>
				<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
					<button type="button" onClick={() => void navigate({ to: "/login" })} style={{ padding: "9px 16px", borderRadius: 10, fontSize: 13.5, color: "var(--fb-ink)", background: "transparent", border: "none", cursor: "pointer" }}>Zaloguj się</button>
					<button type="button" className="fb-nav-signup" onClick={() => void navigate({ to: "/signup" })} style={{ padding: "10px 18px", borderRadius: 10, background: "var(--fb-ink)", color: "var(--fb-cream)", fontSize: 13.5, fontWeight: 500, cursor: "pointer", border: "none", whiteSpace: "nowrap" }}>Wypróbuj za darmo →</button>
				</div>
			</nav>

			{/* ─── HERO ─── */}
			<header className="fb-wrap" style={{ position: "relative", padding: "32px 0 80px", overflow: "hidden", maxWidth: 1240, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
				<div className="fb-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center" }}>
					<div>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Opinie Google na autopilocie</div>
						<h1 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 4.4vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: "18px 0 0", fontWeight: 400 }}>
							Zamień miłe wieczory w <em style={{ color: "var(--fb-primary)", fontFamily: "var(--fb-serif)", fontStyle: "italic" }}>gwiazdki</em> na Google Maps.
						</h1>
						<p style={{ marginTop: 36, fontSize: 18, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 520 }}>
							Jak Było zamienia najlepsze wieczory w recenzje na Google, a te gorsze — w szczerą uwagę prosto do kuchni. Każdy gość wychodzi z rabatem, który przyprowadza go z powrotem.
						</p>
						<div style={{ marginTop: 36, display: "flex", gap: 12, alignItems: "center" }}>
							<button type="button" onClick={() => void navigate({ to: "/signup" })} style={{ padding: "14px 24px", borderRadius: 12, background: "var(--fb-ink)", color: "var(--fb-cream)", fontSize: 15, fontWeight: 500, cursor: "pointer", border: "none", whiteSpace: "nowrap" }}>Wypróbuj za darmo →</button>
							<a href="#how" style={{ padding: "14px 24px", borderRadius: 12, fontSize: 15, color: "var(--fb-ink)", textDecoration: "none" }}>Zobacz, jak to działa</a>
						</div>
						<div className="fb-hero-meta" style={{ marginTop: 22, display: "flex", gap: 22, fontSize: 13, color: "var(--fb-ink-mute)" }}>
							{["średnio +0,4 gwiazdki na Google", "zgodne z polityką Google", "30 dni za darmo"].map((t) => (
								<span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
									<span style={{ color: "var(--fb-olive)" }}><CheckIcon /></span>
									{t}
								</span>
							))}
						</div>
					</div>

					{/* Hero visual */}
					<div className="fb-hero-visual" style={{ position: "relative", height: 540, display: "flex", alignItems: "center", justifyContent: "center" }}>
						<div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at 60% 40%, rgba(200,106,62,0.16), transparent 65%)", zIndex: 0 }} />

						{/* Google rating lift card */}
						<div className="fb-hero-note" style={{ position: "absolute", left: -10, top: 80, zIndex: 4, width: 220, padding: "14px 16px", background: "var(--fb-cream)", borderRadius: 14, border: "0.5px solid var(--fb-line)", boxShadow: "0 16px 30px -10px rgba(31,26,21,0.18)", transform: "rotate(-4deg)" }}>
							<div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>
								<svg width="14" height="14" viewBox="0 0 24 24">
									<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
									<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
									<path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
									<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
								</svg>
								<span>Ocena Google</span>
								<span style={{ marginLeft: "auto", color: "#2F8F4E", fontWeight: 600, fontFamily: "var(--fb-mono)", fontSize: 10.5 }}>▲ +0,4</span>
							</div>
							<div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
								<span style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--fb-ink)" }}>4,7</span>
								<span style={{ display: "inline-flex", gap: 1 }}>
									{[1, 2, 3, 4, 5].map((i) => <svg key={i} width="13" height="13" viewBox="0 0 44 44"><path d="M22 3.5L27.4 15.6L40.5 17.1L30.8 26.2L33.4 39.2L22 32.6L10.6 39.2L13.2 26.2L3.5 17.1L16.6 15.6L22 3.5Z" fill="#F59E0B" /></svg>)}
								</span>
							</div>
							<svg style={{ display: "block", margin: "6px 0 4px" }} width="100%" height="36" viewBox="0 0 160 36" preserveAspectRatio="none">
								<path d="M2 28 L20 26 L38 24 L56 22 L74 18 L92 14 L110 11 L128 8 L146 6 L158 5 L158 36 L2 36 Z" fill="rgba(200,106,62,0.12)" />
								<path d="M2 28 L20 26 L38 24 L56 22 L74 18 L92 14 L110 11 L128 8 L146 6 L158 5" stroke="var(--fb-primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9.5, letterSpacing: "0.08em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>OSTATNIE 60 DNI · 198 NOWYCH OPINII</div>
						</div>

						{/* Phone */}
						<div style={{ position: "relative", zIndex: 2, width: 280, height: 540, borderRadius: 36, background: "var(--fb-cream)", boxShadow: "0 0 0 8px var(--fb-ink), 0 30px 60px -15px rgba(31,26,21,0.35), 0 10px 20px -5px rgba(31,26,21,0.2)", overflow: "hidden", padding: "28px 22px", display: "flex", flexDirection: "column" }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--fb-mono)", fontSize: 9.5, color: "var(--fb-ink-mute)", letterSpacing: "0.08em", padding: "0 4px" }}>
								<span>9:41</span>
								<span>● ▮▮</span>
							</div>
							<div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, marginTop: 24 }}>B</div>
							<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1.02, marginTop: 18 }}>Jak<br />wrażenia?</div>
							<div style={{ display: "flex", gap: 4, marginTop: 22 }}>
								{[1, 2, 3, 4, 5].map((i) => <StarSvg key={i} size={32} />)}
							</div>
							<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 20, color: "var(--fb-primary)", marginTop: 14 }}>Palce lizać</div>
						</div>

						{/* Tilted coupon */}
						<div className="fb-hero-coupon" style={{ position: "absolute", right: -20, bottom: 60, zIndex: 3, width: 240, padding: "18px 18px 16px", background: "var(--fb-ink)", color: "var(--fb-cream)", borderRadius: 16, boxShadow: "0 24px 50px -12px rgba(31,26,21,0.4)", transform: "rotate(4deg)" }}>
							<div style={{ position: "absolute", left: -9, top: "60%", width: 18, height: 18, borderRadius: "50%", background: "var(--fb-cream)" }} />
							<div style={{ position: "absolute", right: -9, top: "60%", width: 18, height: 18, borderRadius: "50%", background: "var(--fb-cream)" }} />
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>Bistro Pod Lipą</div>
							<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 38, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>15% rabatu</div>
							<div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>na następną wizytę · na miejscu</div>
							<div style={{ margin: "14px 0 10px", borderTop: "1px dashed rgba(251,247,239,0.25)" }} />
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>Kod</div>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 16, letterSpacing: "0.12em" }}>LIPA-4KX9</div>
						</div>
					</div>
				</div>
			</header>

			{/* ─── LOGOS ─── */}
			<div style={{ padding: "32px 0 60px", textAlign: "center", maxWidth: 1240, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
				<div style={{ color: "var(--fb-ink-mute)", fontSize: 13, marginBottom: 22 }}>Korzystają z nas niezależne lokale od Gdańska po Kraków</div>
				<div className="fb-logos-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 56, flexWrap: "wrap", opacity: 0.7 }}>
					{["Bistro Pod Lipą", "Pierogarnia U Heleny", "Mleczarnia Świdnicka", "Tawerna Mewa", "Kuchnia Stryja", "Ramen Żuraw"].map((name) => (
						<div key={name} style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", color: "var(--fb-ink)", display: "flex", alignItems: "center", gap: 8 }}>
							{name}
						</div>
					))}
				</div>
			</div>

			<hr style={{ border: "none", borderTop: "0.5px solid var(--fb-line)", maxWidth: 1240, margin: "0 auto" }} />

			{/* ─── HOW IT WORKS ─── */}
			<section id="how" className="fb-section" style={{ padding: "96px 0", background: "var(--fb-paper)" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Jak to działa</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08, margin: "12px 0 0", fontWeight: 400 }}>Zadowoleni → na Google Maps.<br />Reszta → do Ciebie.</h2>
						<p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>Ustaw jeden kod QR na stoliku a resztę robi sam system. Zachwyceni goście trafiają na Google Maps, ci mniej zachwyceni — prosto do Twojej skrzynki.</p>
					</div>

					<div className="fb-how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
						{[
							{ num: "01 · Połóż", h: "Wydrukuj QR i połóż na stole.", p: "Stojaczki, paragony, spód rachunku — wszędzie tam, gdzie gość płaci. Generujemy gotowe do druku PDF-y w Twoich barwach.", art: "qr" },
							{ num: "02 · Recenzja", h: "Goście mówią swoimi słowami.", p: "Bez konta, bez aplikacji. Gwiazdki, krótki komentarz, tagi — wszystko opcjonalne. Nawet trzy gwiazdki przychodzą z ręką na sercu, bo trafiają tylko do Ciebie.", art: "stars" },
							{ num: "03 · Nagroda", h: "Rabacik prosto od Ciebie.", p: "W chwili wysłania opinii na telefonie ląduje unikalny kod. Wykorzystają go przy następnej wizycie — a wracają niemal zawsze.", art: "coupon" },
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
											<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, opacity: 0.5, letterSpacing: "0.08em" }}>BISTRO POD LIPĄ</div>
											<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>15% rabatu</div>
											<div style={{ fontFamily: "var(--fb-mono)", fontSize: 12, letterSpacing: "0.1em", marginTop: 10, paddingTop: 8, borderTop: "1px dashed rgba(251,247,239,0.25)" }}>LIPA-4KX9</div>
										</div>
									)}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* ─── FUNNEL ─── */}
			<section className="fb-section" style={{ padding: "96px 0", background: "var(--fb-paper)" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Lejek opinii</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08, margin: "12px 0 0", fontWeight: 400 }}>Jedno skanowanie a 2 możliwe ścieżki.</h2>
						<p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>Każdy gość przechodzi przez ten sam 30-sekundowy formularz. Ocena decyduje, co stanie się dalej — i na tym polega cały trick.</p>
					</div>

					<div className="fb-funnel-diagram" style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1fr) 100px minmax(320px, 1.2fr)", gap: 24, alignItems: "center", marginTop: 56 }}>
						{/* Source */}
						<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, background: "var(--fb-cream)", border: "0.5px solid var(--fb-line)", borderRadius: 18, padding: 24 }}>
							<div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "var(--fb-paper)", borderRadius: 999, fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fb-ink)" }}>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="4" width="2" height="2" fill="currentColor" /><rect x="8" y="4" width="2" height="2" fill="currentColor" /><rect x="4" y="8" width="2" height="2" fill="currentColor" /><rect x="8" y="8" width="2" height="2" fill="currentColor" /></svg>
								Skan QR
							</div>
							<div style={{ width: 60, color: "var(--fb-ink-mute)" }}>
								<svg width="100%" height="24" viewBox="0 0 60 24" preserveAspectRatio="none"><path d="M2 12 H56 M50 6 L56 12 L50 18" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
							</div>
							<div style={{ width: "100%", padding: 18, borderRadius: 14, background: "var(--fb-ink)", color: "var(--fb-cream)" }}>
								<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.1 }}>Jak wrażenia?</div>
								<div style={{ display: "flex", gap: 5, marginTop: 12 }}>
									{[1, 2, 3, 4, 5].map((i) => <StarSvg key={i} size={20} />)}
								</div>
							</div>
						</div>

						{/* Split arrows */}
						<div className="fb-fnl-split" style={{ position: "relative", height: 240 }}>
							<svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none">
								<path d="M0 100 C 50 100, 50 30, 100 30" stroke="var(--fb-olive)" strokeWidth="2" fill="none" />
								<path d="M0 100 C 50 100, 50 170, 100 170" stroke="#8E3B3B" strokeWidth="2" fill="none" strokeDasharray="4 4" />
							</svg>
						</div>

						{/* Outcomes */}
						<div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
							{/* 5-star → Google */}
							<div>
								<div style={{ alignSelf: "flex-start", display: "inline-block", fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fb-ink-mute)", padding: "4px 10px", borderRadius: 999, background: "var(--fb-cream)", border: "0.5px solid var(--fb-line)" }}>5 gwiazdek</div>
								<div style={{ background: "var(--fb-cream)", border: "0.5px solid var(--fb-line)", borderRadius: 14, padding: "16px 18px", marginTop: 8, borderLeft: "3px solid var(--fb-olive)" }}>
									<div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>
										<svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
										Podziel się na Google?
									</div>
									<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 19, lineHeight: 1.2, letterSpacing: "-0.005em", color: "var(--fb-ink)", marginTop: 8 }}>„Przepyszne — wpadamy w przyszłym tygodniu!”</div>
									<div style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 500, color: "var(--fb-olive)" }}>Otwórz Google Maps →</div>
								</div>
								<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fb-ink-soft)", paddingLeft: 4, marginTop: 6 }}>→ Publiczna opinia w Google Maps</div>
							</div>

							{/* 1-4 star → Private */}
							<div>
								<div style={{ alignSelf: "flex-start", display: "inline-block", fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fb-ink-mute)", padding: "4px 10px", borderRadius: 999, background: "var(--fb-cream)", border: "0.5px solid var(--fb-line)" }}>1–4 gwiazdki</div>
								<div style={{ background: "var(--fb-cream)", border: "0.5px solid var(--fb-line)", borderRadius: 14, padding: "16px 18px", marginTop: 8, borderLeft: "3px solid #8E3B3B" }}>
									<div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 2.5V12a2 2 0 01-1-2V4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
										Tylko dla kuchni
									</div>
									<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 19, lineHeight: 1.2, letterSpacing: "-0.005em", color: "var(--fb-ink)", marginTop: 8 }}>„Pierogi przyszły dziś trochę chłodne.”</div>
									<div style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "var(--fb-ink-mute)" }}>Trafia do Twojej skrzynki</div>
								</div>
								<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fb-ink-soft)", paddingLeft: 4, marginTop: 6 }}>→ Prywatna uwaga dla Ciebie</div>
							</div>
						</div>
					</div>

					{/* Shared outcome */}
					<div style={{ marginTop: 40, padding: "18px 22px", border: "1px dashed rgba(31,26,21,0.2)", borderRadius: 14, background: "var(--fb-cream)", display: "flex", alignItems: "center", gap: 14, color: "var(--fb-ink-soft)", fontSize: 14.5, lineHeight: 1.45 }}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
						<div><strong style={{ color: "var(--fb-ink)", fontWeight: 500 }}>Obie strony</strong> dostają jednorazowy kod rabatowy na następną wizytę. Nawet ci niezadowoleni — bo właśnie tak zły wieczór zamienia się w powrót.</div>
					</div>
				</div>
			</section>

			{/* ─── WHY JAK BYŁO ─── */}
			<section id="why" className="fb-section" style={{ padding: "96px 0" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Dlaczego Jak Było</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08, margin: "12px 0 0", fontWeight: 400 }}>Twoja ocena na Google rośnie sama.</h2>
						<p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>Większość „narzędzi do opinii” zbudowano dla sieciówek, które i tak kombinują z systemem. My zbudowaliśmy Jak Było dla lokali, gdzie szef sali wciąż sam wita gości — i gdzie każda gwiazdka na Google ma znaczenie.</p>
					</div>

					<div className="fb-why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center" }}>
						<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
							{[
								{ h: "Pięć gwiazdek leci na Google Maps.", p: <>Goście, którzy stuknęli pięć gwiazdek, jednym kliknięciem trafiają na Twoją wizytówkę — <strong>po</strong> otrzymaniu rabatu, w pełni dobrowolnie, zgodnie z polityką Google. Właściciele zyskują średnio <strong>+0,4 gwiazdki w 60 dni</strong>.</> },
								{ h: "Jedynki i czwórki zostają u Ciebie.", p: "Gość z reklamacją nigdy nie zobaczy podpowiedzi do Google. Jego uwaga trafia do Twojej skrzynki — szczera, konkretna, z dala od publicznej reputacji." },
								{ h: "Rabat za każde skanowanie.", p: <>Czy gość zostawi jedną gwiazdkę, czy pięć — wychodzi z kodem na następną wizytę. <strong>17% wykorzystania</strong> w realnych lokalach — to są realne powroty, nie loyalty marketing dla zasady.</> },
								{ h: "Bez integracji z kasą, bez aplikacji.", p: "Wpisz kod, sprawdź ocenę, oznacz „wykorzystany”. Tryb kasjera działa na iPadzie przy wejściu — obok tego, czego już używasz." },
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
								<div style={{ marginLeft: 14, fontFamily: "var(--fb-mono)", fontSize: 10.5, color: "var(--fb-ink-mute)" }}>app.jakbylo.pl/podlipa</div>
							</div>
							<div style={{ display: "flex", minHeight: 360 }}>
								<div style={{ width: 130, padding: "14px 10px", background: "var(--fb-paper)", display: "flex", flexDirection: "column", gap: 4, borderRight: "0.5px solid var(--fb-line)" }}>
									{["Opinie", "Statystyki", "Rabaty", "Kod QR", "Rozliczenia"].map((label, idx) => (
										<div key={label} style={{ padding: "7px 10px", borderRadius: 6, fontSize: 11.5, color: idx === 0 ? "var(--fb-ink)" : "var(--fb-ink-soft)", fontWeight: idx === 0 ? 500 : 400, background: idx === 0 ? "#fff" : "transparent", display: "flex", alignItems: "center", gap: 7 }}>
											<span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.5 }} />
											{label}
										</div>
									))}
								</div>
								<div style={{ flex: 1, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
									<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em" }}>Ten tydzień</div>
									<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
										{[{ l: "Średnia", v: "4,6" }, { l: "Nowe", v: "38" }, { l: "Wykorzystane", v: "17%" }].map((s) => (
											<div key={s.l} style={{ padding: "10px 12px", background: "var(--fb-paper)", borderRadius: 8 }}>
												<div style={{ fontFamily: "var(--fb-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>{s.l}</div>
												<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1, marginTop: 4 }}>{s.v}</div>
											</div>
										))}
									</div>
									{[
										{ stars: 5, text: '„Pierogi ruskie jak u babci, a żurek pierwsza klasa. Pan Tomek cudowny dla naszego małego…”' },
										{ stars: 4, text: '„Klimat super, karta win zaskoczyła na plus. Schabowy przyszedł lekko letni…”' },
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
				<div className="fb-math" style={{ background: "var(--fb-ink)", color: "var(--fb-cream)", borderRadius: 24, margin: "0 auto", padding: "80px 64px", maxWidth: 1240 }}>
					<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,247,239,0.55)" }}>Matematyka po obiedzie</div>
					<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400, color: "var(--fb-cream)" }}>Liczby od naszych beta-lokali.</h2>
					<p style={{ marginTop: 16, maxWidth: 580, color: "rgba(251,247,239,0.65)" }}>Po 90 dniach, w 47 niezależnych restauracjach w Polsce i Europie.</p>

					<div className="fb-math-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 48 }}>
						{[
							{ v: "+0,4★", l: "Średni wzrost oceny w Google Maps po 60 dniach. Bez fałszywek, bez naciągania niezadowolonych." },
							{ v: "4,7×", l: "Więcej opinii Google miesięcznie niż przy mailach „zostaw opinię” czy ulotkach na stoliku." },
							{ v: "17%", l: "Wykorzystanych rabatów — czyli powrotów, które bezpośrednio możesz przypisać Jak Było." },
							{ v: "92 zł", l: "Średni przychód na jedno skanowanie, po rabacie. (Średni rachunek 340 zł, średni rabat 15%.)" },
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
			<section className="fb-section" style={{ padding: "120px 0" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div className="fb-quote-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "center" }}>
						<div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 18, background: "radial-gradient(ellipse at 35% 30%, rgba(200,106,62,0.22), transparent 60%), linear-gradient(160deg, var(--fb-paper) 0%, var(--fb-paper-2) 100%)", border: "0.5px solid var(--fb-line)", display: "grid", placeItems: "center" }}>
							<div style={{ width: "64%", height: "70%", borderRadius: 14, background: "linear-gradient(160deg, rgba(31,26,21,0.07) 0%, rgba(31,26,21,0.18) 100%)", display: "grid", placeItems: "center", fontFamily: "var(--fb-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>Zdjęcie właściciela</div>
						</div>
						<div>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Historia właściciela</div>
							<blockquote style={{ margin: 0, marginTop: 18, fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.18, letterSpacing: "-0.015em", color: "var(--fb-ink)" }}>
								„Sprawdziliśmy wcześniej cztery „narzędzia do opinii”. Każde zrobione pod sieciówki, każde chciało nas wpychać w kombinowanie. Jak Było to pierwsze, które po prostu działa jak rozmowa z gościem przy stoliku — a nasi stali bywalcy naprawdę wykorzystują kody."
							</blockquote>
							<div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--fb-ink-soft)" }}>
								<span style={{ display: "block", height: 1, width: 40, background: "var(--fb-ink)", opacity: 0.4 }} />
								<div>
									<div style={{ color: "var(--fb-ink)", fontWeight: 500 }}>Magdalena Kowalczyk</div>
									<div>Właścicielka · Bistro Pod Lipą · Wrocław</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─── PRICING ─── */}
			<section id="pricing" className="fb-section" style={{ padding: "96px 0", background: "var(--fb-paper)" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div style={{ maxWidth: 720, marginBottom: 48 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Cennik</div>
						<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400 }}>Prosty jak dobry rosół.</h2>
						<p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)", maxWidth: 580 }}>Jeden lokal, jedna cena. Bez prowizji od opinii, bez opłat za wykorzystany rabat, bez kosztów wdrożenia. Pierwsze 30 dni gratis.</p>
					</div>

					<div className="fb-price-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
						<PriceCard tier="Bistro" sub="Do 200 opinii / mies." price="119 zł" features={["Bez limitu kodów QR i lokalizacji", "Rabaty + tryb kasjera", "Podpowiedź opinii Google", "Wsparcie e-mail"]} onCta={() => void navigate({ to: "/signup" })} />
						<PriceCard tier="Karczma" sub="Bez limitu opinii, wiele lokali" price="239 zł" features={["Wszystko z planu Bistro", "Do 5 lokali w jednym koncie", "Twoje logo i kolory na ekranach gościa", "Cotygodniowy raport + alerty o słabych ocenach", "Wsparcie priorytetowe"]} featured onCta={() => void navigate({ to: "/signup" })} />
						<PriceCard tier="Sieć" sub="Dla grup i małych sieci" price="Pogadajmy" features={["6+ lokali", "Dashboardy managerskie i role użytkowników", "Eksport CSV / API", "Dedykowane wdrożenie"]} ghost onCta={() => void navigate({ to: "/signup" })} />
					</div>
				</div>
			</section>

			{/* ─── FAQ ─── */}
			<section id="faq" className="fb-section" style={{ padding: "96px 0" }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div className="fb-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60 }}>
						<div>
							<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>FAQ</div>
							<h2 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.02, margin: "12px 0 0", fontWeight: 400 }}>Pytania, które padają przy stole</h2>
							<p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: "var(--fb-ink-soft)" }}>Coś jeszcze? Napisz na <span style={{ color: "var(--fb-primary)" }}>hej@jakbylo.pl</span> — czytamy każdą wiadomość.</p>
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
						Najlepsza recenzja<br />to ta, która <em style={{ color: "var(--fb-primary)", fontFamily: "var(--fb-serif)", fontStyle: "italic" }}>wraca.</em>
					</h2>
					<p style={{ margin: "24px auto 0", fontSize: 18, color: "var(--fb-ink-soft)", maxWidth: 480, lineHeight: 1.5 }}>Konfiguracja w osiem minut. 30 dni za darmo, bez karty.</p>
					<button type="button" onClick={() => void navigate({ to: "/signup" })} style={{ marginTop: 40, padding: "14px 24px", borderRadius: 12, background: "var(--fb-ink)", color: "var(--fb-cream)", fontSize: 15, fontWeight: 500, cursor: "pointer", border: "none" }}>Wypróbuj za darmo →</button>
					<div style={{ marginTop: 22, fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>Bez karty · Bez aplikacji · 8 minut wdrożenia</div>
				</div>
			</section>

			{/* ─── FOOTER ─── */}
			<footer style={{ padding: "48px 0 40px", borderTop: "0.5px solid var(--fb-line)", color: "var(--fb-ink-soft)", fontSize: 13 }}>
				<div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
					<div className="fb-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
						<div>
							<div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 16, marginBottom: 12, color: "var(--fb-ink)" }}>
								<div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 16 }}>J</div>
								Jak Było
							</div>
							<div style={{ fontSize: 13, color: "var(--fb-ink-soft)", maxWidth: 280, lineHeight: 1.55 }}>Szczere opinie i słodkie rabaciki — dla lokali, w których właściciel wciąż sam wita gości przy drzwiach.</div>
						</div>
						{[
							{ h: "Produkt", links: ["Jak to działa", "Cennik", "Galeria lokali", "Aktualizacje"] },
							{ h: "Firma", links: ["O nas", "Blog", "Kontakt", "Dla mediów"] },
							{ h: "Prawne", links: ["Prywatność", "Regulamin", "Zgodność z polityką Google"] },
						].map((col) => (
							<div key={col.h}>
								<div style={{ fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fb-ink-mute)", marginBottom: 14 }}>{col.h}</div>
								{col.links.map((link) => (
									<a key={link} href="#" style={{ display: "block", padding: "4px 0", color: "inherit", textDecoration: "none" }}>{link}</a>
								))}
							</div>
						))}
					</div>
					<div className="fb-footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "0.5px solid var(--fb-line)" }}>
						<div>© 2026 Jak Było Sp. z o.o. · Zrobione z sercem we Wrocławiu i Krakowie.</div>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--fb-ink-mute)", textTransform: "uppercase" }}>wer. 0.7 · Beta</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

/* ─── Sub-components ─── */

const QrIllustration = () => (
	<svg width="80" height="80" viewBox="0 0 33 33" shapeRendering="crispEdges">
		<rect width="33" height="33" fill="#fff" />
		{/* Top-left finder */}
		<rect x="0" y="0" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="6" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="6" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="2" y="2" width="3" height="3" fill="var(--fb-ink)" />
		{/* Top-right finder */}
		<rect x="26" y="0" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="26" y="6" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="26" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="32" y="0" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="28" y="2" width="3" height="3" fill="var(--fb-ink)" />
		{/* Bottom-left finder */}
		<rect x="0" y="26" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="32" width="7" height="1" fill="var(--fb-ink)" />
		<rect x="0" y="26" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="6" y="26" width="1" height="7" fill="var(--fb-ink)" />
		<rect x="2" y="28" width="3" height="3" fill="var(--fb-ink)" />
		{/* Alignment pattern */}
		<rect x="24" y="24" width="5" height="1" fill="var(--fb-ink)" />
		<rect x="24" y="28" width="5" height="1" fill="var(--fb-ink)" />
		<rect x="24" y="24" width="1" height="5" fill="var(--fb-ink)" />
		<rect x="28" y="24" width="1" height="5" fill="var(--fb-ink)" />
		<rect x="26" y="26" width="1" height="1" fill="var(--fb-ink)" />
		{/* Timing patterns */}
		<rect x="8" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="18" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="20" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="22" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="24" y="6" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="12" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="16" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="6" y="24" width="1" height="1" fill="var(--fb-ink)" />
		{/* Data modules */}
		<rect x="8" y="2" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="1" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="3" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="0" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="15" y="2" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="17" y="4" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="19" y="1" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="21" y="3" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="23" y="5" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="4" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="5" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="13" y="1" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="3" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="20" y="5" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="24" y="2" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="8" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="11" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="13" y="12" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="15" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="17" y="11" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="19" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="21" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="23" y="12" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="18" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="20" y="12" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="22" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="24" y="11" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="8" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="13" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="15" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="16" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="15" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="13" y="13" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="15" y="16" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="17" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="19" y="13" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="21" y="15" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="13" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="18" y="15" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="20" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="22" y="16" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="8" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="19" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="21" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="19" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="13" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="15" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="17" y="21" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="19" y="19" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="21" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="23" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="18" y="19" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="20" y="21" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="22" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="24" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="8" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="23" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="24" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="23" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="13" y="24" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="15" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="17" y="23" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="19" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="21" y="24" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="1" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="3" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="5" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="2" y="11" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="4" y="12" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="1" y="13" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="3" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="5" y="15" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="2" y="16" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="4" y="17" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="1" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="3" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="5" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="4" y="24" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="27" y="8" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="29" y="9" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="31" y="10" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="28" y="11" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="30" y="12" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="27" y="13" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="29" y="15" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="31" y="14" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="28" y="16" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="30" y="18" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="32" y="17" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="27" y="19" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="29" y="20" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="31" y="21" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="30" y="22" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="32" y="23" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="8" y="27" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="28" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="27" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="29" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="9" y="30" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="11" y="28" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="13" y="31" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="15" y="27" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="17" y="29" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="19" y="30" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="21" y="28" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="16" y="30" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="18" y="31" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="20" y="27" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="22" y="29" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="10" y="31" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="14" y="32" width="1" height="1" fill="var(--fb-ink)" />
		<rect x="12" y="30" width="1" height="1" fill="var(--fb-ink)" />
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
			{featured && <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 6, background: "var(--fb-primary)", color: "var(--fb-cream)", fontFamily: "var(--fb-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Najczęściej wybierany</div>}
			<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1, marginTop: featured ? 12 : 0 }}>{tier}</div>
			<div style={{ marginTop: 6, fontSize: 13, color: featured ? "rgba(251,247,239,0.65)" : "var(--fb-ink-soft)" }}>{sub}</div>
		</div>
		<div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
			<span style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: /\d/.test(price) ? 56 : 36, lineHeight: 1, letterSpacing: "-0.02em" }}>{price}</span>
			{/\d/.test(price) && <span style={{ fontSize: 13, color: featured ? "rgba(251,247,239,0.65)" : "var(--fb-ink-soft)" }}>/ mies.</span>}
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
			{ghost ? "Porozmawiajmy →" : "Wypróbuj za darmo →"}
		</button>
	</article>
);

const FAQ_ITEMS = [
	{ q: "Czy to jest zgodne z polityką opinii Google?", a: "Tak. Rabat dajemy za opinię w naszym formularzu — jeszcze zanim w ogóle pada słowo „Google”. Podpowiedź do Google pojawia się dopiero potem, na osobnym ekranie, w pełni dobrowolnie, bez gotowych treści do skopiowania. Sprawdziliśmy to z restauratorami i z oficjalnymi wytycznymi Google." },
	{ q: "Czy muszę integrować to z kasą?", a: "Nie. Rabaty obsługuje obsługa ręcznie w prostym widoku kasjera — wpisujesz kod, klikasz „wykorzystany” i tyle. Większość lokali odpala to na iPadzie przy wejściu. Integracje z kasami fiskalnymi i POS są na naszej roadmapie dla planu Sieć." },
	{ q: "Jak zapobiegacie nadużyciom?", a: "Odcisk urządzenia, dzienny limit (domyślnie 3 opinie / dobę, do ustawienia przez Ciebie) i jednorazowe kody rabatowe. Nie zmuszamy gości do zakładania konta — po prostu po cichu blokujemy próby zebrania stosu kodów z jednego telefonu." },
	{ q: "Czy mogę dostosować wygląd ekranu dla gościa?", a: "W planie Karczma — tak: Twoje logo, kolor akcentu i własne powitanie. Klienci planu Bistro dostają nasz neutralny, zaprojektowany szablon, który dobrze wygląda w każdym lokalu — od pierogarni po fine dining." },
	{ q: "Co jeśli gość wystawi jedną gwiazdkę?", a: "I tak trafia do Twojej skrzynki. I tak dostaje rabat (umowa brzmi „zostaw opinię”, a nie „zostaw dobrą opinię”). I nie, nie wysyłamy go na Google — to robią tylko zadowoleni goście. A Ty masz szansę naprawić sprawę po cichu." },
	{ q: "Czy jest okres próbny?", a: "30 dni, bez karty. Większość właścicieli wie już po tygodniu od położenia kodów na stolikach, czy to działa — chcemy, żebyś miał na nas pełny, zatłoczony weekend, zanim zdecydujesz." },
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
