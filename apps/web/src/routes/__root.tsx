import "@mantine/core/styles.css";
import appCss from "../styles.css?url";

import {
	type MantineColorsTuple,
	MantineProvider,
	createTheme,
} from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import { useState } from "react";
import { createQueryClient } from "#/lib/query-client";

const burgundy: MantineColorsTuple = [
	"#fbf3f4",
	"#f3dadc",
	"#e5b1b4",
	"#d4858a",
	"#c25f65",
	"#a83840",
	"#751a1f",
	"#5a1318",
	"#440e12",
	"#30090c",
];

const olive: MantineColorsTuple = [
	"#f8f9f5",
	"#ebeee2",
	"#d4d9c2",
	"#b6bf9a",
	"#9aa67b",
	"#889668",
	"#7e8b5c",
	"#5e6b40",
	"#485333",
	"#353d25",
];

const theme = createTheme({
	primaryColor: "burgundy",
	autoContrast: true,
	colors: {
		burgundy,
		olive,
	},
	fontFamily: "'Instrument Sans', system-ui, sans-serif",
	fontFamilyMonospace: "'JetBrains Mono', monospace",
	headings: {
		fontFamily: "'Instrument Serif', Georgia, serif",
	},
});

const SITE_URL = "https://jakbylo.pl";
const SITE_NAME = "Jak Było";
const SITE_TITLE = "Jak Było — Szczera opinia. Słodki rabacik.";
const SITE_DESCRIPTION =
	"Jak Było zamienia zadowolonych gości w opinie na Google Maps, a krytykę kieruje prosto do Ciebie. Jeden kod QR na stoliku, rabat dla każdego gościa.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: SITE_TITLE,
			},
			{
				name: "description",
				content: SITE_DESCRIPTION,
			},
			{
				name: "theme-color",
				content: "#FCEFDF",
			},
			// Open Graph (Facebook, LinkedIn, Messenger, …)
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "pl_PL" },
			{ property: "og:title", content: SITE_TITLE },
			{ property: "og:description", content: SITE_DESCRIPTION },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: "Jak Było — opinie Google na autopilocie dla restauracji",
			},
			// Twitter / X
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE_TITLE },
			{ name: "twitter:description", content: SITE_DESCRIPTION },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			// Favicons & app icons
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "icon", href: "/favicon.ico", sizes: "32x32" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => createQueryClient());
	return (
		<html lang="pl">
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					<MantineProvider theme={theme} forceColorScheme="light">
						{children}
						<Scripts />
					</MantineProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
