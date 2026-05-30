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

const terracotta: MantineColorsTuple = [
	"#fefaf7",
	"#fcede4",
	"#f7d2bd",
	"#f1b592",
	"#ec9b6b",
	"#e98850",
	"#e67b3c",
	"#ba6431",
	"#955027",
	"#723d1e",
];

const olive: MantineColorsTuple = [
	"#f8f9f6",
	"#e7e9e1",
	"#c6c9b6",
	"#a0a786",
	"#7f875b",
	"#67713d",
	"#566127",
	"#464f20",
	"#383f19",
	"#2b3013",
];

const theme = createTheme({
	primaryColor: "terracotta",
	colors: {
		terracotta,
		olive,
	},
	fontFamily: "'Instrument Sans', system-ui, sans-serif",
	fontFamilyMonospace: "'JetBrains Mono', monospace",
	headings: {
		fontFamily: "'Instrument Serif', Georgia, serif",
	},
});

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
				title: "Jak Było — Szczera opinia. Słodki rabacik.",
			},
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
