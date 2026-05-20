import { QRCodeSVG } from "qrcode.react";
import { useCallback } from "react";

export const QrCodePage = () => {
	// TODO: Get actual restaurant ID from API/context
	const restaurantId = "demo-restaurant-id";
	const reviewUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/store/${restaurantId}/review`;

	const handleDownloadSvg = useCallback(() => {
		const svg = document.getElementById("qr-download-svg");
		if (!svg) return;
		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svg);
		const blob = new Blob([svgString], { type: "image/svg+xml" });
		const link = document.createElement("a");
		link.download = "jakbylo-qr-code.svg";
		link.href = URL.createObjectURL(blob);
		link.click();
		URL.revokeObjectURL(link.href);
	}, []);

	const downloadOptions = [
		{ label: "Tabliczka na stolik", sub: "4×6 cala, PDF gotowy do druku" },
		{ label: "Naklejka na paragon", sub: "2×2 cala, 8 sztuk na arkuszu" },
		{ label: "Naklejka na okno", sub: "5×5 cala, pojedynczy PDF" },
		{ label: "Surowy kod QR (SVG)", sub: "Do własnych projektów", onClick: handleDownloadSvg },
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

			{/* Hidden SVG for download */}
			<div style={{ display: "none" }}>
				<QRCodeSVG id="qr-download-svg" value={reviewUrl} size={1024} level="H" />
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
							}}
						>
							TWOJA RESTAURACJA
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
								value={reviewUrl}
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
							JAKBYLO.PL
						</div>
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
									PDF
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
								Numery stolików zbieramy automatycznie — goście
								wpisują je na stronie opinii.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
