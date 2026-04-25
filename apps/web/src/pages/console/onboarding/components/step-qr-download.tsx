import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useCallback, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

interface StepQrDownloadProps {
	restaurantId: string;
}

export const StepQrDownload = ({ restaurantId }: StepQrDownloadProps) => {
	const navigate = useNavigate();
	const canvasRef = useRef<HTMLDivElement>(null);

	const reviewUrl = `${window.location.origin}/store/${restaurantId}/review`;

	const handleDownloadPng = useCallback(() => {
		const canvas = canvasRef.current?.querySelector("canvas");
		if (!canvas) return;

		const link = document.createElement("a");
		link.download = "feedbackbite-qr-code.png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	}, []);

	const handleDownloadSvg = useCallback(() => {
		const svg = document.getElementById("qr-svg");
		if (!svg) return;

		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svg);
		const blob = new Blob([svgString], { type: "image/svg+xml" });
		const link = document.createElement("a");
		link.download = "feedbackbite-qr-code.svg";
		link.href = URL.createObjectURL(blob);
		link.click();
		URL.revokeObjectURL(link.href);
	}, []);

	return (
		<Stack gap="lg" align="center">
			<Title order={3} ta="center">
				Your QR code is ready!
			</Title>
			<Text c="dimmed" ta="center">
				Print this and place it on your tables, receipts, or counter
			</Text>

			<Paper p="xl" radius="md" withBorder>
				<div ref={canvasRef}>
					<QRCodeCanvas value={reviewUrl} size={256} level="H" />
				</div>
			</Paper>

			{/* Hidden SVG for SVG download */}
			<div style={{ display: "none" }}>
				<QRCodeSVG id="qr-svg" value={reviewUrl} size={1024} level="H" />
			</div>

			<Text size="sm" c="dimmed" ta="center" ff="monospace">
				{reviewUrl}
			</Text>

			<Group>
				<Button
					leftSection={<Download size={16} />}
					variant="default"
					onClick={handleDownloadPng}
				>
					Download PNG
				</Button>
				<Button
					leftSection={<Download size={16} />}
					variant="default"
					onClick={handleDownloadSvg}
				>
					Download SVG
				</Button>
			</Group>

			<Button
				fullWidth
				size="md"
				mt="md"
				onClick={() => void navigate({ to: "/console/dashboard" })}
			>
				Go to Dashboard
			</Button>
		</Stack>
	);
};
