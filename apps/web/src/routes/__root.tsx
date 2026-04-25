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
	"#fef5f0",
	"#fce8db",
	"#f6cdaf",
	"#f0af80",
	"#e99255",
	"#db7a3e",
	"#C86A3E",
	"#a55530",
	"#834425",
	"#63331c",
];

const olive: MantineColorsTuple = [
	"#f4f6ef",
	"#e6ebd9",
	"#ccd6b3",
	"#b0c08c",
	"#95aa68",
	"#7E8B5C",
	"#6e7b4e",
	"#5b6740",
	"#485333",
	"#364027",
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
				title: "FeedbackBite",
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
		<html lang="en">
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
