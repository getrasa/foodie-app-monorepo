import { Button, Group } from "@mantine/core";
import { Download } from "lucide-react";
import { useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrDownloadOptionsProps {
	url: string;
	canvasContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const QrDownloadOptions = ({
	url,
	canvasContainerRef,
}: QrDownloadOptionsProps) => {
	const handleDownloadPng = useCallback(() => {
		const canvas = canvasContainerRef.current?.querySelector("canvas");
		if (!canvas) return;

		const link = document.createElement("a");
		link.download = "feedbackbite-qr-code.png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	}, [canvasContainerRef]);

	const handleDownloadSvg = useCallback(() => {
		const svg = document.getElementById("qr-page-svg");
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
		<>
			{/* Hidden SVG for download */}
			<div style={{ display: "none" }}>
				<QRCodeSVG id="qr-page-svg" value={url} size={1024} level="H" />
			</div>

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
		</>
	);
};
