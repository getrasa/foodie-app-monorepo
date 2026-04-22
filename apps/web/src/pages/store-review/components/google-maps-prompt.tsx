import { Button, Stack, Text, Title } from "@mantine/core";
import { Star } from "lucide-react";

interface GoogleMapsPromptProps {
	googleMapsUrl: string;
	onSkip: () => void;
}

export const GoogleMapsPrompt = ({
	googleMapsUrl,
	onSkip,
}: GoogleMapsPromptProps) => {
	return (
		<Stack gap="lg" align="center" ta="center">
			<Star size={48} fill="var(--mantine-color-yellow-5)" stroke="none" />

			<div>
				<Title order={2}>We're glad you loved it!</Title>
				<Text c="dimmed" mt="xs">
					Would you mind sharing your experience on Google Maps too? It really
					helps us out.
				</Text>
			</div>

			<Button
				component="a"
				href={googleMapsUrl}
				target="_blank"
				rel="noopener noreferrer"
				fullWidth
				size="md"
			>
				Leave a Google Maps Review
			</Button>

			<Button variant="subtle" fullWidth onClick={onSkip}>
				Skip, show my discount
			</Button>
		</Stack>
	);
};
