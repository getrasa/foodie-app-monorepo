import { Paper, Text } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";

interface QrPreviewProps {
	url: string;
}

export const QrPreview = ({ url }: QrPreviewProps) => {
	return (
		<Paper p="xl" radius="md" withBorder style={{ display: "inline-block" }}>
			<QRCodeCanvas value={url} size={280} level="H" />
			<Text size="xs" c="dimmed" ta="center" mt="sm" ff="monospace">
				{url}
			</Text>
		</Paper>
	);
};
