import { AppShell, Burger, Center, Group, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BrandLogo } from "#/components/brand-logo";
import { useMyBusiness } from "#/lib/api/use-my-business";
import { authClient } from "#/lib/auth-client";
import { ConsoleNavbar } from "./components/console-navbar";

const ONBOARDING_PATH = "/console/onboarding";

export const ConsoleLayout = () => {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();
	const location = useLocation();
	const businessQuery = useMyBusiness();
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

	useEffect(() => {
		if (!isPending && !session) {
			void navigate({ to: "/login" });
		}
	}, [isPending, session, navigate]);

	const onOnboarding = location.pathname.startsWith(ONBOARDING_PATH);
	const businessSettled =
		!!session && !businessQuery.isPending && !businessQuery.isError;
	const venue = businessQuery.data?.venues?.[0];
	const needsOnboarding =
		businessSettled &&
		(!venue || !businessQuery.data?.onboardingCompletedAt);

	useEffect(() => {
		if (needsOnboarding && !onOnboarding) {
			void navigate({ to: ONBOARDING_PATH });
		}
	}, [needsOnboarding, onOnboarding, navigate]);

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

	// While we don't yet know whether the user finished onboarding, hold the
	// layout so we don't briefly render a console page that would immediately
	// redirect to /console/onboarding.
	if (!onOnboarding && businessQuery.isPending) {
		return (
			<Center h="100vh" bg="var(--fb-cream)">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (needsOnboarding && !onOnboarding) {
		return null;
	}

	return (
		<AppShell
			header={{ height: { base: 50, sm: 0 } }}
			navbar={{
				width: 220,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened },
			}}
			padding={0}
			styles={{
				header: {
					background: "var(--fb-paper)",
					borderBottom: "0.5px solid rgba(12,10,7,0.08)",
				},
				navbar: {
					background: "var(--fb-paper)",
					borderRight: "0.5px solid rgba(12,10,7,0.08)",
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
					<BrandLogo size={26} wordmarkSize={18} />
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
