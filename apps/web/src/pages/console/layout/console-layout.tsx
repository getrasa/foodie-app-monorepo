import { AppShell, Center, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth-client";
import { ConsoleHeader } from "./components/console-header";
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
			<Center h="100vh">
				<Loader color="orange" />
			</Center>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 250,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<ConsoleHeader
					mobileOpened={mobileOpened}
					onMobileToggle={toggleMobile}
				/>
			</AppShell.Header>

			<AppShell.Navbar p="xs">
				<ConsoleNavbar />
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
};
