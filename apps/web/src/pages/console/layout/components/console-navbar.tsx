import { Box, Menu, Text, UnstyledButton } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	BarChart3,
	Gift,
	LogOut,
	MessageSquare,
	QrCode,
	Ticket,
} from "lucide-react";
import { authClient } from "#/lib/auth-client";

const navItems: {
	id: string;
	label: string;
	icon: typeof MessageSquare;
	to: string;
	badge?: number;
}[] = [
	{ id: "feedback", label: "Feedback", icon: MessageSquare, to: "/console/feedback", badge: 12 },
	{ id: "analytics", label: "Analytics", icon: BarChart3, to: "/console/analytics" },
	{ id: "discount", label: "Discount offer", icon: Gift, to: "/console/discounts" },
	{ id: "qr", label: "QR code", icon: QrCode, to: "/console/qr-code" },
	{ id: "redeem", label: "Redeem code", icon: Ticket, to: "/console/redeem" },
];

interface ConsoleNavbarProps {
	session: { user: { name?: string | null } };
	onMobileClose: () => void;
}

export const ConsoleNavbar = ({ session, onMobileClose }: ConsoleNavbarProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await authClient.signOut();
		void navigate({ to: "/login" });
	};

	const userInitial = session.user.name?.charAt(0).toUpperCase() ?? "F";

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				padding: "20px 12px",
				fontFamily: "var(--fb-sans)",
			}}
		>
			{/* Brand */}
			<div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 16px" }}>
				<div
					style={{
						width: 28,
						height: 28,
						borderRadius: 8,
						background: "var(--fb-ink)",
						color: "var(--fb-cream)",
						display: "grid",
						placeItems: "center",
						fontFamily: "var(--fb-serif)",
						fontStyle: "italic",
						fontSize: 16,
						flexShrink: 0,
					}}
				>
					{userInitial}
				</div>
				<div style={{ minWidth: 0 }}>
					<Text fz={13} fw={500} c="var(--fb-ink)" lineClamp={1} lh={1.1}>
						{session.user.name ?? "My Restaurant"}
					</Text>
					<Text fz={10.5} c="rgba(31,26,21,0.5)" mt={2}>
						FeedbackBite · Beta
					</Text>
				</div>
			</div>

			{/* Nav items */}
			<div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
				{navItems.map((item) => {
					const active = location.pathname.startsWith(item.to);
					const Icon = item.icon;
					return (
						<UnstyledButton
							key={item.id}
							onClick={() => {
								void navigate({ to: item.to });
								onMobileClose();
							}}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								padding: "8px 10px",
								background: active ? "var(--fb-cream)" : "transparent",
								borderRadius: 8,
								fontFamily: "var(--fb-sans)",
								fontSize: 13,
								color: active ? "var(--fb-ink)" : "rgba(31,26,21,0.7)",
								fontWeight: active ? 500 : 400,
								boxShadow: active
									? "0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(31,26,21,0.04)"
									: "none",
							}}
						>
							<span style={{ opacity: active ? 1 : 0.65, display: "flex" }}>
								<Icon size={16} />
							</span>
							<span style={{ flex: 1 }}>{item.label}</span>
							{item.badge && (
								<span
									style={{
										background: "var(--fb-primary)",
										color: "#fff",
										fontSize: 10,
										fontWeight: 500,
										padding: "1px 6px",
										borderRadius: 6,
										fontFamily: "var(--fb-mono)",
									}}
								>
									{item.badge}
								</span>
							)}
						</UnstyledButton>
					);
				})}
			</div>

			<Box style={{ flex: 1 }} />

			{/* Status card */}
			<div
				style={{
					background: "var(--fb-cream)",
					borderRadius: 10,
					padding: 12,
					border: "0.5px solid rgba(31,26,21,0.07)",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div
						style={{
							width: 6,
							height: 6,
							borderRadius: "50%",
							background: "var(--fb-olive)",
						}}
					/>
					<div
						style={{
							fontSize: 11,
							color: "rgba(31,26,21,0.6)",
							fontFamily: "var(--fb-mono)",
							letterSpacing: "0.04em",
						}}
					>
						ACCEPTING FEEDBACK
					</div>
				</div>
				<div
					style={{
						marginTop: 6,
						fontSize: 11.5,
						color: "rgba(31,26,21,0.55)",
						lineHeight: 1.45,
					}}
				>
					Cap: 3/diner/day
				</div>
			</div>

			{/* User menu */}
			<Menu shadow="md" width={180} position="top-start">
				<Menu.Target>
					<UnstyledButton
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
							padding: "10px 8px 0",
							marginTop: 10,
						}}
					>
						<div
							style={{
								width: 22,
								height: 22,
								borderRadius: "50%",
								background: "rgba(31,26,21,0.08)",
								display: "grid",
								placeItems: "center",
								fontSize: 10,
								fontWeight: 500,
								color: "var(--fb-ink)",
							}}
						>
							{userInitial}
						</div>
						<Text fz={12} c="rgba(31,26,21,0.55)">
							{session.user.name ?? "Account"}
						</Text>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						leftSection={<LogOut size={14} />}
						onClick={() => void handleSignOut()}
					>
						Sign out
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};
