import { Stack, Text, Title } from "@mantine/core";
import { useRef } from "react";
import { QrPreview } from "./components/qr-preview";
import { QrDownloadOptions } from "./components/qr-download-options";

export const QrCodePage = () => {
	const canvasRef = useRef<HTMLDivElement>(null);

	// TODO: Get actual restaurant ID from API/context
	const restaurantId = "demo-restaurant-id";
	const reviewUrl = `${window.location.origin}/store/${restaurantId}/review`;

	return (
		<Stack gap="lg" align="center">
			<Title order={3}>QR Code</Title>
			<Text c="dimmed" ta="center">
				Place this on tables, receipts, walls, or business cards
			</Text>

			<div ref={canvasRef}>
				<QrPreview url={reviewUrl} />
			</div>

			<QrDownloadOptions url={reviewUrl} canvasContainerRef={canvasRef} />
		</Stack>
	);
};
