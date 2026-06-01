import { Alert, Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { jsPDF } from "jspdf";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useCallback, useMemo, useRef } from "react";

import { PUBLIC_BASE_URL } from "#/lib/api-client";
import { useMyBusiness } from "#/lib/api/use-my-business";
import { venueApi } from "#/lib/api/venue-api";

const downloadBlob = (blob: Blob, filename: string) => {
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
};

const buildPdf = (
	pngDataUrl: string,
	venueName: string,
	scanUrl: string,
): Blob => {
	const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
	const pageWidth = pdf.internal.pageSize.getWidth();

	pdf.setFont("helvetica", "italic");
	pdf.setFontSize(28);
	pdf.text("Jak smakowało?", pageWidth / 2, 35, { align: "center" });

	pdf.setFont("helvetica", "normal");
	pdf.setFontSize(13);
	pdf.text(venueName, pageWidth / 2, 48, { align: "center" });

	const qrSizeMm = 110;
	const qrX = (pageWidth - qrSizeMm) / 2;
	pdf.addImage(pngDataUrl, "PNG", qrX, 60, qrSizeMm, qrSizeMm);

	pdf.setFontSize(11);
	pdf.text(
		"Zeskanuj, zostaw kilka słów. Odbierz rabat na następną wizytę.",
		pageWidth / 2,
		185,
		{ align: "center" },
	);

	pdf.setFontSize(9);
	pdf.setTextColor(120, 120, 120);
	pdf.text(scanUrl, pageWidth / 2, 200, { align: "center" });

	return pdf.output("blob");
};

export const QrCodePage = () => {
	const businessQuery = useMyBusiness();
	const venue = businessQuery.data?.venues?.[0];

	const qrCodesQuery = useQuery({
		queryKey: ["qr-codes", venue?.id ?? null],
		queryFn: () => venueApi.listQrCodes(venue!.id),
		enabled: !!venue?.id,
	});

	const qrCode = qrCodesQuery.data?.find((q) => q.active) ?? qrCodesQuery.data?.[0];
	const scanUrl = useMemo(
		() => (qrCode ? `${PUBLIC_BASE_URL}/q/${qrCode.id}` : ""),
		[qrCode],
	);

	// Hidden full-res canvas for high-quality PNG/PDF export.
	const exportRef = useRef<HTMLDivElement>(null);

	const handleDownloadPng = useCallback(() => {
		const canvas = exportRef.current?.querySelector("canvas");
		if (!canvas) return;
		canvas.toBlob((blob) => {
			if (blob) downloadBlob(blob, "feedbackbite-qr.png");
		}, "image/png");
	}, []);

	const handleDownloadSvg = useCallback(() => {
		const svg = document.getElementById("qr-export-svg");
		if (!svg) return;
		const svgString = new XMLSerializer().serializeToString(svg);
		downloadBlob(new Blob([svgString], { type: "image/svg+xml" }), "feedbackbite-qr.svg");
	}, []);

	const handleDownloadPdf = useCallback(() => {
		const canvas = exportRef.current?.querySelector("canvas");
		if (!canvas || !venue) return;
		const dataUrl = canvas.toDataURL("image/png");
		const blob = buildPdf(dataUrl, venue.name, scanUrl);
		downloadBlob(blob, "feedbackbite-qr.pdf");
	}, [scanUrl, venue]);

	if (businessQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (!venue) {
		return (
			<div style={{ padding: "28px 32px" }}>
				<Alert color="yellow" variant="light">
					Najpierw przejdź przez konfigurację swojej restauracji.
				</Alert>
			</div>
		);
	}

	if (qrCodesQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (!qrCode) {
		return (
			<div style={{ padding: "28px 32px" }}>
				<Alert color="yellow" variant="light">
					Brak aktywnego kodu QR — skontaktuj się z pomocą.
				</Alert>
			</div>
		);
	}

	const downloadOptions = [
		{
			label: "Plakat A4 (PDF)",
			sub: "Gotowy do druku",
			format: "PDF",
			onClick: handleDownloadPdf,
		},
		{
			label: "PNG (wysoka rozdzielczość)",
			sub: "1024×1024 px",
			format: "PNG",
			onClick: handleDownloadPng,
		},
		{
			label: "Surowy kod QR (SVG)",
			sub: "Do własnych projektów",
			format: "SVG",
			onClick: handleDownloadSvg,
		},
	];

	return (
		<div
			style={{
				padding: "28px 32px",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				fontFamily: "var(--fb-sans)",
				overflowY: "auto",
			}}
		>
			<div
				style={{
					fontFamily: "var(--fb-serif)",
					fontSize: 28,
					fontStyle: "italic",
					letterSpacing: "-0.01em",
					color: "var(--fb-ink)",
				}}
			>
				Kod QR
			</div>
			<div
				style={{
					fontSize: 13,
					color: "rgba(31,26,21,0.55)",
					marginTop: 4,
				}}
			>
				Wydrukuj i umieść na stolikach, paragonach albo przy wejściu.
			</div>

			{/* Hidden full-res exports */}
			<div style={{ position: "absolute", left: -9999, top: -9999 }} ref={exportRef}>
				<QRCodeCanvas value={scanUrl} size={1024} level="H" />
			</div>
			<div style={{ display: "none" }}>
				<QRCodeSVG id="qr-export-svg" value={scanUrl} size={1024} level="H" />
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "360px 1fr",
					gap: 28,
					marginTop: 24,
				}}
			>
				{/* Preview card */}
				<div>
					<div
						style={{
							background: "var(--fb-cream)",
							border: "0.5px solid rgba(31,26,21,0.1)",
							borderRadius: 16,
							padding: 22,
							textAlign: "center",
							boxShadow: "0 1px 2px rgba(31,26,21,0.03)",
						}}
					>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 10,
								letterSpacing: "0.08em",
								color: "rgba(31,26,21,0.5)",
								textTransform: "uppercase",
							}}
						>
							{venue.name}
						</div>
						<div
							style={{
								fontFamily: "var(--fb-serif)",
								fontSize: 26,
								fontStyle: "italic",
								letterSpacing: "-0.01em",
								marginTop: 4,
								color: "var(--fb-ink)",
							}}
						>
							Jak smakowało?
						</div>
						<div
							style={{
								marginTop: 18,
								background: "#fff",
								padding: 16,
								borderRadius: 14,
								display: "inline-block",
								border: "0.5px solid rgba(31,26,21,0.08)",
							}}
						>
							<QRCodeSVG
								value={scanUrl}
								size={189}
								level="H"
								fgColor="var(--fb-ink)"
								bgColor="transparent"
							/>
						</div>
						<div
							style={{
								fontSize: 12.5,
								color: "rgba(31,26,21,0.6)",
								marginTop: 14,
								lineHeight: 1.5,
							}}
						>
							Zeskanuj, zostaw kilka słów.
							<br />
							Odbierz rabat na następną wizytę.
						</div>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 9,
								letterSpacing: "0.1em",
								color: "rgba(31,26,21,0.35)",
								marginTop: 16,
							}}
						>
							FEEDBACKBITE.PL
						</div>
					</div>
					<div
						style={{
							marginTop: 12,
							textAlign: "center",
							fontFamily: "var(--fb-mono)",
							fontSize: 11,
							color: "rgba(31,26,21,0.5)",
						}}
					>
						{scanUrl}
					</div>
				</div>

				{/* Download options */}
				<div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "rgba(31,26,21,0.55)",
							marginBottom: 10,
						}}
					>
						Pobierz
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 8,
						}}
					>
						{downloadOptions.map((o) => (
							<button
								key={o.label}
								type="button"
								onClick={o.onClick}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									padding: "14px 16px",
									background: "#fff",
									border: "0.5px solid rgba(31,26,21,0.1)",
									borderRadius: 12,
									cursor: "pointer",
									textAlign: "left",
									fontFamily: "var(--fb-sans)",
								}}
							>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: 8,
										background: "var(--fb-paper)",
										display: "grid",
										placeItems: "center",
										flexShrink: 0,
									}}
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 14 14"
										fill="none"
									>
										<path
											d="M7 1v8M3 6l4 4 4-4M1.5 12h11"
											stroke="var(--fb-ink)"
											strokeWidth="1.4"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div style={{ flex: 1 }}>
									<div
										style={{
											fontSize: 13.5,
											fontWeight: 500,
											color: "var(--fb-ink)",
										}}
									>
										{o.label}
									</div>
									<div
										style={{
											fontSize: 11.5,
											color: "rgba(31,26,21,0.55)",
											marginTop: 2,
										}}
									>
										{o.sub}
									</div>
								</div>
								<div
									style={{
										fontFamily: "var(--fb-mono)",
										fontSize: 10,
										color: "rgba(31,26,21,0.5)",
									}}
								>
									{o.format}
								</div>
							</button>
						))}
					</div>

					<div
						style={{
							marginTop: 18,
							padding: "14px 16px",
							borderRadius: 12,
							background: "var(--fb-paper)",
							border: "0.5px solid rgba(31,26,21,0.08)",
							display: "flex",
							alignItems: "flex-start",
							gap: 10,
						}}
					>
						<div style={{ fontSize: 14, flexShrink: 0 }}>💡</div>
						<div>
							<div
								style={{
									fontSize: 12.5,
									color: "var(--fb-ink)",
									fontWeight: 500,
								}}
							>
								Jeden kod dla całej restauracji.
							</div>
							<div
								style={{
									fontSize: 12,
									color: "rgba(31,26,21,0.6)",
									marginTop: 2,
									lineHeight: 1.4,
								}}
							>
								Goście skanują ten sam kod przy każdym stoliku — kod
								prowadzi do strony, na której zostawiają opinię.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
