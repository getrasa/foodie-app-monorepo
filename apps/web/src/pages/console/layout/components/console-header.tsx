import { Avatar, Burger, Group, Menu, Text, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { authClient } from "#/lib/auth-client";

interface ConsoleHeaderProps {
	mobileOpened: boolean;
	onMobileToggle: () => void;
}

export const ConsoleHeader = ({
	mobileOpened,
	onMobileToggle,
}: ConsoleHeaderProps) => {
	const { data: session } = authClient.useSession();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await authClient.signOut();
		void navigate({ to: "/login" });
	};

	const userInitial =
		session?.user.name?.charAt(0).toUpperCase() ?? "U";

	return (
		<Group h="100%" px="md" justify="space-between">
			<Group>
				<Burger
					opened={mobileOpened}
					onClick={onMobileToggle}
					hiddenFrom="sm"
					size="sm"
				/>
				<Title order={4} c="orange">
					FeedbackBite
				</Title>
			</Group>

			<Menu shadow="md" width={200}>
				<Menu.Target>
					<Group gap="sm" style={{ cursor: "pointer" }}>
						<Avatar color="orange" radius="xl" size="sm">
							{userInitial}
						</Avatar>
						<Text size="sm" visibleFrom="sm">
							{session?.user.name}
						</Text>
					</Group>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item
						leftSection={<LogOut size={16} />}
						onClick={() => void handleSignOut()}
					>
						Sign out
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};
