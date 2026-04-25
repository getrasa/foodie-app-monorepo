import { Alert } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

export const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPw, setShowPw] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const { error: signInError } = await authClient.signIn.email({
			email,
			password,
		});

		setLoading(false);

		if (signInError) {
			setError(signInError.message ?? "Invalid email or password");
			return;
		}

		void navigate({ to: "/console/feedback" });
	};

	return (
		<div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1.05fr", background: "var(--fb-cream)", fontFamily: "var(--fb-sans)", color: "var(--fb-ink)" }}>
			{/* ─── LEFT: Form ─── */}
			<div style={{ display: "flex", flexDirection: "column", padding: "32px 48px", minHeight: "100vh" }}>
				{/* Top row */}
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<a href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 15, color: "inherit", textDecoration: "none" }}>
						<div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--fb-ink)", color: "var(--fb-cream)", display: "grid", placeItems: "center", fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 16, letterSpacing: "-0.02em" }}>F</div>
						<span>FeedbackBite</span>
					</a>
					<div style={{ fontSize: 13.5, color: "var(--fb-ink-soft)" }}>
						New here?
						<a href="/signup" style={{ color: "var(--fb-ink)", fontWeight: 500, marginLeft: 6, textDecoration: "none", whiteSpace: "nowrap" }}>Start free →</a>
					</div>
				</div>

				{/* Form */}
				<div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 0" }}>
					<form onSubmit={(e) => void handleSubmit(e)} style={{ width: "100%", maxWidth: 380 }}>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Welcome back</div>
						<h1 style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 52, lineHeight: 1.02, letterSpacing: "-0.025em", margin: "12px 0 10px", fontWeight: 400 }}>Buongiorno.</h1>
						<p style={{ fontSize: 15, color: "var(--fb-ink-soft)", marginBottom: 32, lineHeight: 1.55 }}>Sign in to your restaurant. Your guests left notes while you were away.</p>

						{error && (
							<Alert color="red" variant="light" mb="md" style={{ marginBottom: 16 }}>
								{error}
							</Alert>
						)}

						{/* SSO */}
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							<button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "12px 16px", borderRadius: 12, background: "#fff", border: "0.5px solid var(--fb-line)", fontFamily: "var(--fb-sans)", fontSize: 14, fontWeight: 500, color: "var(--fb-ink)", cursor: "pointer" }}>
								<svg width="16" height="16" viewBox="0 0 24 24">
									<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
									<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
									<path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
									<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
								</svg>
								Continue with Google
							</button>
							<button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "12px 16px", borderRadius: 12, background: "#fff", border: "0.5px solid var(--fb-line)", fontFamily: "var(--fb-sans)", fontSize: 14, fontWeight: 500, color: "var(--fb-ink)", cursor: "pointer" }}>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--fb-ink)">
									<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
								</svg>
								Continue with Apple
							</button>
						</div>

						{/* Divider */}
						<div style={{ display: "flex", alignItems: "center", gap: 14, margin: "22px 0", fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>
							<span style={{ flex: 1, height: 0.5, background: "var(--fb-line)" }} />
							or with email
							<span style={{ flex: 1, height: 0.5, background: "var(--fb-line)" }} />
						</div>

						{/* Email field */}
						<div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
							<label htmlFor="login-email" style={{ fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fb-ink-mute)" }}>Email</label>
							<div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", borderRadius: 12, background: "#fff", border: "1px solid var(--fb-line)" }}>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--fb-ink-mute)", flexShrink: 0 }}>
									<path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
								</svg>
								<input
									id="login-email"
									type="email"
									placeholder="lucia@trattoria.co"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									style={{ flex: 1, padding: "13px 0", border: "none", background: "transparent", outline: "none", fontFamily: "var(--fb-sans)", fontSize: 15, color: "var(--fb-ink)", minWidth: 0 }}
								/>
							</div>
						</div>

						{/* Password field */}
						<div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
							<label htmlFor="login-password" style={{ fontFamily: "var(--fb-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fb-ink-mute)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<span>Password</span>
								<a href="/forgot-password" style={{ fontFamily: "var(--fb-sans)", textTransform: "none", letterSpacing: 0, fontSize: 12, color: "var(--fb-primary)", textDecoration: "none" }}>Forgot?</a>
							</label>
							<div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", borderRadius: 12, background: "#fff", border: "1px solid var(--fb-line)" }}>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--fb-ink-mute)", flexShrink: 0 }}>
									<rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
									<path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" />
								</svg>
								<input
									id="login-password"
									type={showPw ? "text" : "password"}
									placeholder="••••••••"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									style={{ flex: 1, padding: "13px 0", border: "none", background: "transparent", outline: "none", fontFamily: "var(--fb-sans)", fontSize: 15, color: "var(--fb-ink)", minWidth: 0 }}
								/>
								<button type="button" onClick={() => setShowPw(!showPw)} aria-label="Show password" style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: "var(--fb-ink-mute)", display: "flex", borderRadius: 6 }}>
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
										<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
										<circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
									</svg>
								</button>
							</div>
						</div>

						{/* Remember me */}
						<div style={{ display: "flex", alignItems: "center", margin: "4px 0 22px" }}>
							<label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", fontSize: 13.5, color: "var(--fb-ink-soft)", userSelect: "none", whiteSpace: "nowrap" }}>
								<input type="checkbox" defaultChecked style={{ display: "none" }} />
								<span style={{ width: 17, height: 17, borderRadius: 5, border: "1px solid rgba(31,26,21,0.25)", background: "var(--fb-ink)", display: "grid", placeItems: "center" }}>
									<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5.2L4 7.2L8 2.8" stroke="var(--fb-cream)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
								</span>
								Keep me signed in
							</label>
						</div>

						{/* Submit */}
						<button type="submit" disabled={loading} style={{ width: "100%", padding: "14px 20px", borderRadius: 12, background: "var(--fb-ink)", color: "var(--fb-cream)", border: "none", fontFamily: "var(--fb-sans)", fontSize: 15, fontWeight: 500, cursor: loading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.6 : 1 }}>
							{loading ? "Signing in…" : "Sign in"}
							{!loading && (
								<svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
							)}
						</button>

						{/* Magic link */}
						<div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 12, background: "var(--fb-paper)", border: "0.5px solid var(--fb-line)", display: "flex", alignItems: "center", gap: 12 }}>
							<div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--fb-cream)", display: "grid", placeItems: "center", color: "var(--fb-primary)", flexShrink: 0 }}>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
									<path d="M7 1.5l1.4 4.1L12.5 7l-4.1 1.4L7 12.5l-1.4-4.1L1.5 7l4.1-1.4L7 1.5z" fill="currentColor" />
								</svg>
							</div>
							<div style={{ flex: 1, fontSize: 12.5, color: "var(--fb-ink-soft)", lineHeight: 1.45 }}>
								<strong style={{ color: "var(--fb-ink)", fontWeight: 500 }}>Prefer a magic link?</strong><br />
								<a href="/forgot-password" style={{ color: "var(--fb-primary)", fontWeight: 500, textDecoration: "none" }}>Email me a one-time sign-in link →</a>
							</div>
						</div>
					</form>
				</div>

				{/* Footer */}
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--fb-ink-mute)", paddingTop: 32 }}>
					<div>© 2026 FeedbackBite, Inc.</div>
					<div style={{ display: "flex", gap: 18 }}>
						<a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
						<a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
						<a href="#" style={{ color: "inherit", textDecoration: "none" }}>Help</a>
					</div>
				</div>
			</div>

			{/* ─── RIGHT: Hospitality panel ─── */}
			<div style={{ position: "relative", overflow: "hidden", background: "var(--fb-paper)", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
				{/* Hero image */}
				<div style={{ position: "relative", flex: 1, minHeight: 0, borderRadius: 18, overflow: "hidden", background: "linear-gradient(180deg, rgba(31,26,21,0) 55%, rgba(31,26,21,0.55) 100%), url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80') center/cover", boxShadow: "0 30px 60px -30px rgba(31,26,21,0.35)" }}>
					{/* Floating coupon */}
					<div style={{ position: "absolute", left: 24, top: 24, width: 200, padding: "14px 16px", background: "var(--fb-ink)", color: "var(--fb-cream)", borderRadius: 14, transform: "rotate(-3deg)", boxShadow: "0 20px 40px -12px rgba(31,26,21,0.5)", zIndex: 2 }}>
						<div style={{ position: "absolute", left: -7, top: "58%", width: 14, height: 14, borderRadius: "50%", background: "var(--fb-paper)" }} />
						<div style={{ position: "absolute", right: -7, top: "58%", width: 14, height: 14, borderRadius: "50%", background: "var(--fb-paper)" }} />
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>Trattoria da Lucia</div>
						<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>15% off</div>
						<div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 2 }}>next visit · dine-in</div>
						<div style={{ margin: "10px 0 6px", borderTop: "1px dashed rgba(251,247,239,0.25)" }} />
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>Code</div>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 12, letterSpacing: "0.12em" }}>LUCIA-4KX9</div>
					</div>

					{/* Image meta overlay */}
					<div style={{ position: "absolute", left: 24, bottom: 22, right: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, color: "var(--fb-cream)" }}>
						<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 20, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>Trattoria da Lucia</div>
						<div style={{ fontFamily: "var(--fb-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
							<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8C26A", display: "inline-block", marginRight: 8 }} />
							248 ratings this week
						</div>
					</div>
				</div>

				{/* Quote */}
				<div style={{ padding: "4px 12px 8px" }}>
					<div style={{ fontFamily: "var(--fb-serif)", fontStyle: "italic", fontSize: 24, lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--fb-ink)", maxWidth: 560 }}>
						<span style={{ color: "var(--fb-primary)", marginRight: 4, fontSize: "1.1em" }}>"</span>
						Yelp is for strangers. FeedbackBite is for the regulars I haven't met yet.
					</div>
					<div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, fontSize: 12.5, color: "var(--fb-ink-soft)", fontFamily: "var(--fb-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
						<span style={{ width: 28, height: 1, background: "rgba(31,26,21,0.3)" }} />
						<div><strong style={{ color: "var(--fb-ink)", fontWeight: 500 }}>Lucia Romano</strong> · Owner, Trattoria da Lucia</div>
					</div>
				</div>
			</div>
		</div>
	);
};
