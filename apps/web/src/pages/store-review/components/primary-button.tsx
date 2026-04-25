interface PrimaryButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	variant?: "primary" | "ghost";
}

export const PrimaryButton = ({
	children,
	onClick,
	disabled = false,
	variant = "primary",
}: PrimaryButtonProps) => {
	const bg = variant === "primary" ? "var(--fb-ink)" : "transparent";
	const color = variant === "primary" ? "var(--fb-cream)" : "var(--fb-ink)";
	const border =
		variant === "ghost" ? "1px solid rgba(31,26,21,0.15)" : "none";

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			style={{
				width: "100%",
				height: 54,
				borderRadius: 16,
				background: bg,
				color,
				border,
				fontFamily: "var(--fb-sans)",
				fontSize: 16,
				fontWeight: 500,
				letterSpacing: "-0.01em",
				cursor: disabled ? "default" : "pointer",
				opacity: disabled ? 0.35 : 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: 8,
				transition: "opacity 0.15s",
			}}
		>
			{children}
		</button>
	);
};
