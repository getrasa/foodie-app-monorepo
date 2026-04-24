import { Container, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth-client";

const Home = () => {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isPending && !session) {
			void navigate({ to: "/login" });
		}
	}, [isPending, session, navigate]);

	if (isPending) {
		return null;
	}

	if (!session) {
		return null;
	}

	return (
		<Container size="sm" py="xl" px="md">
			<Title order={2}>Welcome to FeedbackBite</Title>
			<Text c="dimmed" mt="sm">
				Hello, {session.user.name}. Your dashboard will be here.
			</Text>
		</Container>
	);
};

export const Route = createFileRoute("/")({ component: Home });
