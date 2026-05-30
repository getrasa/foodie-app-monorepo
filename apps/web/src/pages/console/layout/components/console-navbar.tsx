import { Box, Menu, Text, UnstyledButton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	BarChart3,
	Gift,
	LogOut,
	MessageSquare,
	QrCode,
	Settings,
	Ticket,
} from "lucide-react";
import { authClient } from "#/lib/auth-client";
import { ownerFeedbackApi } from "#/lib/api/owner-feedback-api";
import { useMyBusiness } from "#/lib/api/use-my-business";

interface NavItem {
	id: string;
	label: string;
	icon: typeof MessageSquare;
	to: string;
	badge?: number;
}

const formatBadge = (count: number): string => (count > 99 ? "99+" : String(count));

interface ConsoleNavbarProps {
	session: { user: { name?: string | null } };
	onMobileClose: () => void;
}

export const ConsoleNavbar = ({
	session,
	onMobileClose,
}: ConsoleNavbarProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const businessQuery = useMyBusiness();
	const venueId = businessQuery.data?.venues?.[0]?.id;
	const unreadQuery = useQuery({
		queryKey: ["feedback-unread-count", venueId],
		queryFn: () =>
			ownerFeedbackApi.list(venueId!, {
				read: "unread",
				archived: "no",
				spam: "no",
				limit: 100,
			}),
		enabled: !!venueId,
		refetchInterval: 60_000,
		staleTime: 30_000,
	});

	const unreadCount = unreadQuery.data?.length ?? 0;
	const navItems: NavItem[] = [
		{
			id: "feedback",
			label: "Opinie",
			icon: MessageSquare,
			to: "/console/feedback",
			badge: unreadCount > 0 ? unreadCount : undefined,
		},
		{
			id: "analytics",
			label: "Analityka",
			icon: BarChart3,
			to: "/console/analytics",
		},
		{ id: "voucher", label: "Rabaty", icon: Gift, to: "/console/voucher" },
		{ id: "qr", label: "Kod QR", icon: QrCode, to: "/console/qr-code" },
		{
			id: "redeem",
			label: "Zrealizuj kod",
			icon: Ticket,
			to: "/console/redeem",
		},
		{
			id: "settings",
			label: "Ustawienia",
			icon: Settings,
			to: "/console/settings",
		},
	];

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
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 10,
					padding: "0 8px 16px",
				}}
			>
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
						{session.user.name ?? "Moja restauracja"}
					</Text>
					<Text fz={10.5} c="rgba(12,10,7,0.5)" mt={2}>
						Jak Było · Beta
					</Text>
				</div>
			</div>

			{/* Nav items */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					marginTop: 4,
				}}
			>
				{navItems.map((item) => {
					const active = location.pathname.startsWith(item.to);
					const Icon = item.icon;
					return (
						<UnstyledButton
							key={item.id}
							className="fb-nav-item"
							data-active={active}
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
								color: active ? "var(--fb-ink)" : "rgba(12,10,7,0.7)",
								fontWeight: active ? 500 : 400,
								boxShadow: active
									? "0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(12,10,7,0.04)"
									: "none",
							}}
						>
							<span style={{ opacity: active ? 1 : 0.65, display: "flex" }}>
								<Icon size={16} />
							</span>
							<span style={{ flex: 1 }}>{item.label}</span>
							{item.badge !== undefined && (
								<span
									style={{
										background: "var(--fb-primary)",
										color: "var(--fb-ink)",
										fontSize: 10,
										fontWeight: 500,
										padding: "1px 6px",
										borderRadius: 6,
										fontFamily: "var(--fb-mono)",
									}}
								>
									{formatBadge(item.badge)}
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
					border: "0.5px solid rgba(12,10,7,0.07)",
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
							color: "rgba(12,10,7,0.6)",
							fontFamily: "var(--fb-mono)",
							letterSpacing: "0.04em",
						}}
					>
						ZBIERAMY OPINIE
					</div>
				</div>
				<div
					style={{
						marginTop: 6,
						fontSize: 11.5,
						color: "rgba(12,10,7,0.55)",
						lineHeight: 1.45,
					}}
				>
					Limit: 3 / gość / dzień
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
								background: "rgba(12,10,7,0.08)",
								display: "grid",
								placeItems: "center",
								fontSize: 10,
								fontWeight: 500,
								color: "var(--fb-ink)",
							}}
						>
							{userInitial}
						</div>
						<Text fz={12} c="rgba(12,10,7,0.55)">
							{session.user.name ?? "Konto"}
						</Text>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						leftSection={<LogOut size={14} />}
						onClick={() => void handleSignOut()}
					>
						Wyloguj
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};
