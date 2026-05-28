import type { CSSProperties, ReactNode } from "react";

/* ─────────────────────────────────────────────
   8 wordmarks. Every wordmark ends with "?".
   Wordmark colour is inherited from the wrapper
   (so the page can recolour it). The daisy's
   centre uses --lab-bg so it always matches the
   surrounding background.
   ───────────────────────────────────────────── */

const baseWordmark: CSSProperties = {
	fontFamily: "var(--fb-serif)",
	fontStyle: "italic",
	fontSize: 24,
	letterSpacing: "-0.015em",
	lineHeight: 1,
	color: "inherit",
};

const lockup = (gap: number): CSSProperties => ({
	display: "inline-flex",
	alignItems: "center",
	gap,
});

const STAR_5 =
	"M13 3 L15.6 9.9 L23 10.3 L17.1 14.7 L19.1 21.7 L13 17.5 L6.9 21.7 L8.9 14.7 L3 10.3 L10.4 9.9 Z";

/* ─────────────────────────────────────────────
   01 — Hand-drawn outline star
   ───────────────────────────────────────────── */
const Mark01 = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
		<title>hand-drawn star</title>
		<path
			d="M12.1 2.4 L14.4 9.1 L21.8 9.5 L15.9 14.3 L18 21.6 L11.9 17.2 L5.7 21.5 L7.6 14.2 L1.9 9.2 L9.4 8.9 Z"
			fill="none"
			stroke="var(--fb-primary)"
			strokeWidth="1.8"
			strokeLinejoin="round"
			strokeLinecap="round"
		/>
	</svg>
);
const Logo01 = () => (
	<span style={lockup(9)}>
		<Mark01 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   02 — Three graduated stars
   ───────────────────────────────────────────── */
const Mark02 = () => (
	<svg width="44" height="20" viewBox="0 0 44 20" aria-hidden="true">
		<title>three stars</title>
		<path
			d="M7 4 L8.2 7.4 L11.8 7.6 L9 9.6 L9.9 13.2 L7 11.3 L4.1 13.2 L5 9.6 L2.2 7.6 L5.8 7.4 Z"
			fill="var(--fb-primary)"
		/>
		<path
			d="M22 2 L23.7 6.6 L28.6 6.8 L24.7 9.7 L26 14.4 L22 11.6 L18 14.4 L19.3 9.7 L15.4 6.8 L20.3 6.6 Z"
			fill="var(--fb-primary)"
		/>
		<path
			d="M37 4 L38.2 7.4 L41.8 7.6 L39 9.6 L39.9 13.2 L37 11.3 L34.1 13.2 L35 9.6 L32.2 7.6 L35.8 7.4 Z"
			fill="var(--fb-primary)"
		/>
	</svg>
);
const Logo02 = () => (
	<span style={lockup(9)}>
		<Mark02 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   03 — Sun-star with rays
   ───────────────────────────────────────────── */
const Mark03 = () => (
	<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
		<title>sun star</title>
		<g stroke="var(--fb-primary)" strokeWidth="1.4" strokeLinecap="round">
			<line x1="15" y1="1.5" x2="15" y2="4" />
			<line x1="15" y1="26" x2="15" y2="28.5" />
			<line x1="1.5" y1="15" x2="4" y2="15" />
			<line x1="26" y1="15" x2="28.5" y2="15" />
			<line x1="5.5" y1="5.5" x2="7.5" y2="7.5" />
			<line x1="22.5" y1="22.5" x2="24.5" y2="24.5" />
			<line x1="5.5" y1="24.5" x2="7.5" y2="22.5" />
			<line x1="22.5" y1="7.5" x2="24.5" y2="5.5" />
		</g>
		<path
			d="M15 8 L16.6 12.3 L21.2 12.5 L17.6 15.4 L18.8 19.9 L15 17.3 L11.2 19.9 L12.4 15.4 L8.8 12.5 L13.4 12.3 Z"
			fill="var(--fb-primary)"
		/>
	</svg>
);
const Logo03 = () => (
	<span style={lockup(9)}>
		<Mark03 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   04 — Solid star
   ───────────────────────────────────────────── */
const Mark04 = () => (
	<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
		<title>solid star</title>
		<path d={STAR_5} fill="var(--fb-primary)" />
	</svg>
);
const Logo04 = () => (
	<span style={lockup(9)}>
		<Mark04 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   05 — Sparkle bouquet
   ───────────────────────────────────────────── */
const Mark05 = () => (
	<svg width="32" height="26" viewBox="0 0 32 26" aria-hidden="true">
		<title>sparkle bouquet</title>
		<path
			d="M11 3 L12.7 10.8 L20.5 12.5 L12.7 14.2 L11 22 L9.3 14.2 L1.5 12.5 L9.3 10.8 Z"
			fill="var(--fb-primary)"
		/>
		<path
			d="M24 5 L24.7 8 L27.5 8.6 L24.7 9.2 L24 12.2 L23.3 9.2 L20.5 8.6 L23.3 8 Z"
			fill="var(--fb-primary)"
		/>
		<path
			d="M26 17 L26.4 18.8 L28 19.2 L26.4 19.5 L26 21.4 L25.6 19.5 L24 19.2 L25.6 18.8 Z"
			fill="var(--fb-primary)"
		/>
	</svg>
);
const Logo05 = () => (
	<span style={lockup(9)}>
		<Mark05 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   06 — Compass star
   ───────────────────────────────────────────── */
const Mark06 = () => (
	<svg width="22" height="28" viewBox="0 0 22 28" aria-hidden="true">
		<title>compass star</title>
		<path
			d="M11 1 L12.4 12.6 L21 14 L12.4 15.4 L11 27 L9.6 15.4 L1 14 L9.6 12.6 Z"
			fill="var(--fb-primary)"
		/>
	</svg>
);
const Logo06 = () => (
	<span style={lockup(9)}>
		<Mark06 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   07 — Daisy (eight petals around adaptive centre)
   The centre uses --lab-bg so it always matches
   whatever surrounds it. Fallback: cream.
   ───────────────────────────────────────────── */
const Mark07 = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
		<title>daisy star</title>
		<g transform="translate(14 14)">
			{[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
				<ellipse
					key={angle}
					cx="0"
					cy="-8"
					rx="2.6"
					ry="5"
					fill="var(--fb-primary)"
					transform={`rotate(${angle})`}
				/>
			))}
			<circle cx="0" cy="0" r="3.2" fill="var(--lab-bg, var(--fb-cream))" />
		</g>
	</svg>
);
const Logo07 = () => (
	<span style={lockup(9)}>
		<Mark07 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   08 — Brush-painted star
   ───────────────────────────────────────────── */
const Mark08 = () => (
	<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
		<title>brush star</title>
		<path
			d="M13 3.5 L15.5 9.8 L22.6 10.2 L17 14.6 L18.9 21.4 L13 17.4 L7.1 21.4 L9 14.6 L3.4 10.2 L10.5 9.8 Z"
			fill="var(--fb-primary)"
			stroke="var(--fb-primary)"
			strokeWidth="2.6"
			strokeLinejoin="round"
			strokeLinecap="round"
		/>
	</svg>
);
const Logo08 = () => (
	<span style={lockup(9)}>
		<Mark08 />
		<span style={baseWordmark}>Jak Było?</span>
	</span>
);

/* ─────────────────────────────────────────────
   Registry
   ───────────────────────────────────────────── */
export interface LogoVariant {
	slug: string;
	number: string;
	title: string;
	tagline: string;
	logo: ReactNode;
}

export const VARIANTS: LogoVariant[] = [
	{
		slug: "01",
		number: "01",
		title: "Hand-drawn star",
		tagline: "An outline star drawn with the slight imperfection of a quick sketch.",
		logo: <Logo01 />,
	},
	{
		slug: "02",
		number: "02",
		title: "Three stars",
		tagline: "A rating compressed into the mark itself. The middle star sits slightly higher.",
		logo: <Logo02 />,
	},
	{
		slug: "03",
		number: "03",
		title: "Sun star",
		tagline: "A star with eight short rays around it. Warm rather than awarded.",
		logo: <Logo03 />,
	},
	{
		slug: "04",
		number: "04",
		title: "Solid star",
		tagline: "The canonical five-point star, fully filled. The icon at rest, no texture.",
		logo: <Logo04 />,
	},
	{
		slug: "05",
		number: "05",
		title: "Sparkle bouquet",
		tagline: "One four-point sparkle with two smaller companions. Decorative, scattered.",
		logo: <Logo05 />,
	},
	{
		slug: "06",
		number: "06",
		title: "Compass star",
		tagline: "A tall, narrow four-point star. Directional rather than decorative.",
		logo: <Logo06 />,
	},
	{
		slug: "07",
		number: "07",
		title: "Daisy",
		tagline: "Eight rounded petals around an adaptive centre. Star reimagined as a flower.",
		logo: <Logo07 />,
	},
	{
		slug: "08",
		number: "08",
		title: "Brushed",
		tagline: "Filled and thick-stroked together. The painted version of the same star.",
		logo: <Logo08 />,
	},
];
