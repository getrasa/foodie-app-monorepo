import { createFileRoute } from "@tanstack/react-router";
import { QrCodePage } from "#/pages/console/qr-code/qr-code.page";

export const Route = createFileRoute("/console/qr-code")({
	component: () => <QrCodePage />,
});
