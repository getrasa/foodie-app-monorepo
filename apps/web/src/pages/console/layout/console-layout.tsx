import { AppShell, Burger, Center, Group, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth-client";
import { ConsoleNavbar } from "./components/console-navbar";

export const ConsoleLayout = () => {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

	useEffect(() => {
		if (!isPending && !session) {
			void navigate({ to: "/login" });
		}
	}, [isPending, session, navigate]);

	if (isPending) {
		return (
			<Center h="100vh" bg="var(--fb-cream)">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<AppShell
			header={{ height: 50 }}
			navbar={{
				width: 220,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened },
			}}
			padding={0}
			styles={{
				header: {
					background: "var(--fb-paper)",
					borderBottom: "0.5px solid rgba(31,26,21,0.08)",
				},
				navbar: {
					background: "var(--fb-paper)",
					borderRight: "0.5px solid rgba(31,26,21,0.08)",
				},
				main: {
					background: "#fff",
				},
			}}
		>
			<AppShell.Header hiddenFrom="sm">
				<Group h="100%" px="md" justify="space-between">
					<Burger
						opened={mobileOpened}
						onClick={toggleMobile}
						size="sm"
						color="var(--fb-ink)"
					/>
					<Text
						ff="var(--fb-serif)"
						fz={18}
						fw={400}
						fs="italic"
						c="var(--fb-ink)"
					>
						FeedbackBite
					</Text>
					<div style={{ width: 28 }} />
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p={0}>
				<ConsoleNavbar
					session={session}
					onMobileClose={toggleMobile}
				/>
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
};
