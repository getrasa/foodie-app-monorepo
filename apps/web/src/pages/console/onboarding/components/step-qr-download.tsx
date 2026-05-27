import { Button, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useCallback, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { PUBLIC_BASE_URL } from "#/lib/api-client";

interface StepQrDownloadProps {
	qrCodeId: string | undefined;
	completing?: boolean;
	error?: string | null;
	onFinish: () => Promise<void> | void;
}

export const StepQrDownload = ({
	qrCodeId,
	completing,
	error,
	onFinish,
}: StepQrDownloadProps) => {
	const navigate = useNavigate();
	const canvasRef = useRef<HTMLDivElement>(null);

	const scanUrl = qrCodeId ? `${PUBLIC_BASE_URL}/q/${qrCodeId}` : "";

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

	const handleFinish = useCallback(async () => {
		await onFinish();
		void navigate({ to: "/console/dashboard" });
	}, [onFinish, navigate]);

	if (!qrCodeId) {
		return (
			<Stack align="center" py="xl">
				<Loader color="var(--fb-primary)" />
				<Text c="dimmed">Generujemy Twój kod QR…</Text>
			</Stack>
		);
	}

	return (
		<Stack gap="lg" align="center">
			<Title order={3} ta="center">
				Twój kod QR jest gotowy!
			</Title>
			<Text c="dimmed" ta="center">
				Wydrukuj i umieść na stolikach, paragonach albo przy ladzie
			</Text>

			<Paper p="xl" radius="md" withBorder>
				<div ref={canvasRef}>
					<QRCodeCanvas value={scanUrl} size={256} level="H" />
				</div>
			</Paper>

			{/* Hidden SVG for SVG download */}
			<div style={{ display: "none" }}>
				<QRCodeSVG id="qr-svg" value={scanUrl} size={1024} level="H" />
			</div>

			<Text size="sm" c="dimmed" ta="center" ff="monospace">
				{scanUrl}
			</Text>

			<Group>
				<Button
					leftSection={<Download size={16} />}
					variant="default"
					onClick={handleDownloadPng}
				>
					Pobierz PNG
				</Button>
				<Button
					leftSection={<Download size={16} />}
					variant="default"
					onClick={handleDownloadSvg}
				>
					Pobierz SVG
				</Button>
			</Group>

			{error && (
				<Text c="red" size="sm">
					{error}
				</Text>
			)}

			<Button
				fullWidth
				size="md"
				mt="md"
				loading={completing}
				onClick={() => void handleFinish()}
			>
				Przejdź do panelu
			</Button>
		</Stack>
	);
};
