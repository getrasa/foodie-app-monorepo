import { Button, Paper, Stack, Text, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { Check, Copy } from "lucide-react";

interface DiscountResultProps {
	discountCode: string;
	isFiveStar: boolean;
}

export const DiscountResult = ({
	discountCode,
	isFiveStar,
}: DiscountResultProps) => {
	const clipboard = useClipboard({ timeout: 2000 });

	return (
		<Stack gap="lg" align="center" ta="center">
			<div>
				<Title order={2}>
					{isFiveStar
						? "Thanks for spreading the love!"
						: "Thank you for your feedback!"}
				</Title>
				<Text c="dimmed" mt="xs">
					{isFiveStar
						? "Your support means the world to us."
						: "We appreciate you taking the time to share your thoughts."}
				</Text>
			</div>

			<Text size="sm" fw={500}>
				Here's your discount:
			</Text>

			<Paper withBorder p="lg" w="100%">
				<Stack gap="sm" align="center">
					<Text
						size="xl"
						fw={700}
						ff="monospace"
						style={{ letterSpacing: "0.1em" }}
					>
						{discountCode}
					</Text>
					<Button
						variant="light"
						size="sm"
						leftSection={
							clipboard.copied ? <Check size={16} /> : <Copy size={16} />
						}
						onClick={() => clipboard.copy(discountCode)}
					>
						{clipboard.copied ? "Copied!" : "Copy code"}
					</Button>
				</Stack>
			</Paper>

			<Text size="xs" c="dimmed">
				Show this code to your server to redeem your discount.
			</Text>
		</Stack>
	);
};
