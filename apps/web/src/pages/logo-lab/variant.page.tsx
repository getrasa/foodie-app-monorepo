import { Link } from "@tanstack/react-router";
import { type CSSProperties, useState } from "react";
import { LandingNav } from "./landing-nav";
import { VARIANTS } from "./variants";

interface VariantPageProps {
	slug: string;
}

const SIZES = [0.9, 1.0, 1.1] as const;
// Pulls the whole scale down 10% — label "1.0" renders at the old "0.9".
const SIZE_MULTIPLIER = 0.9;

interface BgChoice {
	id: "cream" | "paper" | "ink";
	bg: string;
	tone: "light" | "dark";
}

const BACKGROUNDS: BgChoice[] = [
	{ id: "cream", bg: "#FBF4EB", tone: "light" },
	{ id: "paper", bg: "#F5E3CB", tone: "light" },
	{ id: "ink", bg: "#221812", tone: "dark" },
];

export const VariantPage = ({ slug }: VariantPageProps) => {
	const variant = VARIANTS.find((v) => v.slug === slug);
	const [size, setSize] = useState<number>(1.0);
	const [bgId, setBgId] = useState<BgChoice["id"]>("cream");

	if (!variant) {
		return (
			<div
				style={{
					minHeight: "100vh",
					display: "grid",
					placeItems: "center",
					background: "var(--fb-cream)",
					fontFamily: "var(--fb-sans)",
					color: "var(--fb-ink-soft)",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontStyle: "italic",
							fontSize: 48,
							color: "var(--fb-ink)",
						}}
					>
						Nie ma takiego wariantu.
					</div>
					<Link
						to="/logo-lab"
						style={{
							display: "inline-block",
							marginTop: 24,
							color: "var(--fb-primary)",
							fontFamily: "var(--fb-mono)",
							fontSize: 12,
							letterSpacing: "0.16em",
							textTransform: "uppercase",
						}}
					>
						← wróć do laboratorium
					</Link>
				</div>
			</div>
		);
	}

	const currentBg = BACKGROUNDS.find((b) => b.id === bgId) ?? BACKGROUNDS[0];
	const isDark = currentBg.tone === "dark";
	const fg = isDark ? "var(--fb-cream)" : "var(--fb-ink)";
	const fgSoft = isDark ? "rgba(251,247,239,0.62)" : "var(--fb-ink-soft)";
	const fgMute = isDark ? "rgba(251,247,239,0.45)" : "var(--fb-ink-mute)";
	const lineColor = isDark ? "rgba(251,247,239,0.12)" : "rgba(12,10,7,0.1)";
	const borderQuiet = isDark
		? "rgba(251,247,239,0.18)"
		: "rgba(12,10,7,0.14)";

	const currentIndex = VARIANTS.findIndex((v) => v.slug === slug);
	const prev = VARIANTS[(currentIndex - 1 + VARIANTS.length) % VARIANTS.length];
	const next = VARIANTS[(currentIndex + 1) % VARIANTS.length];

	// CSS custom property used by Mark07's daisy centre to match the surroundings.
	const surfaceVars = {
		color: fg,
		"--lab-bg": currentBg.bg,
	} as CSSProperties;

	const scaledLogo = (
		<div
			style={{
				...surfaceVars,
				display: "inline-block",
				transform: `scale(${size * SIZE_MULTIPLIER})`,
				transformOrigin: "left center",
				transition: "transform 200ms ease",
			}}
		>
			{variant.logo}
		</div>
	);

	return (
		<div
			style={{
				minHeight: "100vh",
				background: currentBg.bg,
				color: fg,
				fontFamily: "var(--fb-sans)",
				lineHeight: 1.5,
				position: "relative",
				transition: "background 200ms ease, color 200ms ease",
			}}
		>
			{/* Top return bar */}
			<div
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "16px 32px 0",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Link
					to="/logo-lab"
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.16em",
						textTransform: "uppercase",
						color: fgMute,
						textDecoration: "none",
					}}
				>
					← logo-lab
				</Link>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.16em",
						textTransform: "uppercase",
						color: fgMute,
					}}
				>
					Wariant {variant.number} / {VARIANTS.length.toString().padStart(2, "0")}
				</div>
			</div>

			{/* Controls: background + size */}
			<div
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "12px 32px 0",
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					gap: 24,
					flexWrap: "wrap",
				}}
			>
				{/* Background swatches */}
				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					<span
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: fgMute,
							marginRight: 4,
						}}
					>
						Tło
					</span>
					{BACKGROUNDS.map((b) => {
						const active = b.id === bgId;
						return (
							<button
								key={b.id}
								type="button"
								onClick={() => setBgId(b.id)}
								aria-label={b.id}
								title={b.id}
								style={{
									width: 24,
									height: 24,
									borderRadius: 999,
									background: b.bg,
									border: `1.5px solid ${active ? fg : borderQuiet}`,
									cursor: "pointer",
									padding: 0,
									transform: active ? "scale(1.12)" : "scale(1)",
									transition:
										"transform 150ms ease, border-color 150ms ease",
								}}
							/>
						);
					})}
				</div>

				{/* Divider */}
				<span
					style={{
						width: 1,
						height: 16,
						background: lineColor,
					}}
				/>

				{/* Size pills */}
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<span
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: fgMute,
							marginRight: 4,
						}}
					>
						Rozmiar
					</span>
					{SIZES.map((s) => {
						const active = Math.abs(size - s) < 0.001;
						return (
							<button
								key={s}
								type="button"
								onClick={() => setSize(s)}
								style={{
									padding: "5px 11px",
									borderRadius: 999,
									fontSize: 11.5,
									fontFamily: "var(--fb-mono)",
									cursor: "pointer",
									border: `1px solid ${active ? fg : borderQuiet}`,
									background: active ? fg : "transparent",
									color: active ? currentBg.bg : fgSoft,
									letterSpacing: "0.04em",
									transition: "all 150ms ease",
									minWidth: 50,
								}}
							>
								{s.toFixed(1)}×
							</button>
						);
					})}
				</div>
			</div>

			{/* The actual nav with this variant's logo, scaled */}
			<LandingNav logo={scaledLogo} tone={currentBg.tone} />

			{/* Body */}
			<main
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "120px 32px 80px",
				}}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "minmax(0, 0.85fr) minmax(280px, 0.45fr)",
						gap: 80,
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
								color: fgMute,
							}}
						>
							Wariant #{variant.number}
						</div>
						<h1
							style={{
								fontFamily: "var(--fb-serif)",
								fontStyle: "italic",
								fontSize: "clamp(56px, 8vw, 112px)",
								lineHeight: 0.96,
								letterSpacing: "-0.035em",
								margin: "16px 0 0",
								fontWeight: 400,
								color: fg,
							}}
						>
							{variant.title}.
						</h1>
						<p
							style={{
								marginTop: 28,
								fontSize: 19,
								lineHeight: 1.5,
								maxWidth: 560,
								color: fgSoft,
								fontFamily: "var(--fb-serif)",
								fontStyle: "italic",
							}}
						>
							{variant.tagline}
						</p>
					</div>
					<div
						style={{
							borderTop: `0.5px solid ${lineColor}`,
							paddingTop: 18,
							display: "flex",
							flexDirection: "column",
							gap: 14,
						}}
					>
						<DetailRow
							label="Tło"
							value={currentBg.bg.toUpperCase()}
							fgMute={fgMute}
							fg={fg}
						/>
						<DetailRow
							label="Tonacja"
							value={currentBg.tone === "dark" ? "ciemna" : "jasna"}
							fgMute={fgMute}
							fg={fg}
						/>
						<DetailRow
							label="Skala"
							value={`${size.toFixed(1)}×`}
							fgMute={fgMute}
							fg={fg}
						/>
					</div>
				</div>

				{/* Scrutiny strip — three static scales, same surfaceVars */}
				<div
					style={{
						...surfaceVars,
						marginTop: 120,
						borderTop: `0.5px solid ${lineColor}`,
						borderBottom: `0.5px solid ${lineColor}`,
						padding: "44px 0",
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: 32,
						alignItems: "center",
					}}
				>
					<ScrutinyCell label="x1.0" fgMute={fgMute}>
						<div>{variant.logo}</div>
					</ScrutinyCell>
					<ScrutinyCell label="x0.55" fgMute={fgMute}>
						<div style={{ transform: "scale(0.55)", transformOrigin: "center" }}>
							{variant.logo}
						</div>
					</ScrutinyCell>
					<ScrutinyCell label="x1.8" fgMute={fgMute}>
						<div style={{ transform: "scale(1.8)", transformOrigin: "center" }}>
							{variant.logo}
						</div>
					</ScrutinyCell>
				</div>
			</main>

			{/* Bottom prev/next strip */}
			<footer
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "0 32px 64px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
				}}
			>
				<Link
					to="/logo-lab/$variant"
					params={{ variant: prev.slug }}
					style={{
						textDecoration: "none",
						color: fg,
						display: "flex",
						flexDirection: "column",
						gap: 6,
					}}
				>
					<span
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: fgMute,
						}}
					>
						← Poprzedni · {prev.number}
					</span>
					<span
						style={{
							fontFamily: "var(--fb-serif)",
							fontStyle: "italic",
							fontSize: 22,
							letterSpacing: "-0.01em",
						}}
					>
						{prev.title}
					</span>
				</Link>
				<Link
					to="/logo-lab/$variant"
					params={{ variant: next.slug }}
					style={{
						textDecoration: "none",
						color: fg,
						display: "flex",
						flexDirection: "column",
						gap: 6,
						alignItems: "flex-end",
						textAlign: "right",
					}}
				>
					<span
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: fgMute,
						}}
					>
						Następny · {next.number} →
					</span>
					<span
						style={{
							fontFamily: "var(--fb-serif)",
							fontStyle: "italic",
							fontSize: 22,
							letterSpacing: "-0.01em",
						}}
					>
						{next.title}
					</span>
				</Link>
			</footer>
		</div>
	);
};

const DetailRow = ({
	label,
	value,
	fgMute,
	fg,
}: { label: string; value: string; fgMute: string; fg: string }) => (
	<div
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "baseline",
			gap: 16,
		}}
	>
		<span
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 10.5,
				letterSpacing: "0.18em",
				textTransform: "uppercase",
				color: fgMute,
			}}
		>
			{label}
		</span>
		<span
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 12,
				color: fg,
				letterSpacing: "0.04em",
			}}
		>
			{value}
		</span>
	</div>
);

const ScrutinyCell = ({
	label,
	fgMute,
	children,
}: { label: string; fgMute: string; children: React.ReactNode }) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: 24,
			minHeight: 140,
		}}
	>
		<div
			style={{
				flex: 1,
				display: "grid",
				placeItems: "center",
				minHeight: 100,
				width: "100%",
			}}
		>
			{children}
		</div>
		<span
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 10,
				letterSpacing: "0.22em",
				textTransform: "uppercase",
				color: fgMute,
			}}
		>
			{label}
		</span>
	</div>
);
