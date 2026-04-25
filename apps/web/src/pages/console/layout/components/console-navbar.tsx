import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	BarChart3,
	LayoutDashboard,
	MessageSquare,
	QrCode,
	Settings,
	Ticket,
} from "lucide-react";

const navItems = [
	{ label: "Dashboard", icon: LayoutDashboard, to: "/console/dashboard" },
	{ label: "Feedback", icon: MessageSquare, to: "/console/feedback" },
	{ label: "Analytics", icon: BarChart3, to: "/console/analytics" },
	{ label: "Discounts", icon: Ticket, to: "/console/discounts" },
	{ label: "QR Code", icon: QrCode, to: "/console/qr-code" },
	{ label: "Settings", icon: Settings, to: "/console/settings" },
] as const;

export const ConsoleNavbar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<>
			{navItems.map((item) => (
				<NavLink
					key={item.to}
					label={item.label}
					leftSection={<item.icon size={20} />}
					active={location.pathname.startsWith(item.to)}
					onClick={() => void navigate({ to: item.to })}
				/>
			))}
		</>
	);
};
