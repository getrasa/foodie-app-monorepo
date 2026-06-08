import type { CSSProperties } from "react";

export const brandInputStyle = (invalid: boolean): CSSProperties => ({
	width: "100%",
	padding: "10px 14px",
	borderRadius: 10,
	background: "#fff",
	border: invalid
		? "1px solid var(--fb-primary)"
		: "1px solid rgba(31,26,21,0.12)",
	fontFamily: "var(--fb-sans)",
	fontSize: 14,
	color: "var(--fb-ink)",
	outline: "none",
});

export const brandPrimaryButtonStyle = (disabled: boolean): CSSProperties => ({
	padding: "10px 20px",
	borderRadius: 10,
	background: "var(--fb-ink)",
	color: "var(--fb-cream)",
	border: "none",
	cursor: disabled ? "not-allowed" : "pointer",
	opacity: disabled ? 0.5 : 1,
	fontSize: 13,
	fontFamily: "var(--fb-sans)",
	fontWeight: 500,
});

export const brandSecondaryButtonStyle = (disabled: boolean): CSSProperties => ({
	padding: "10px 20px",
	borderRadius: 10,
	background: "transparent",
	color: "var(--fb-ink)",
	border: "0.5px solid rgba(31,26,21,0.2)",
	cursor: disabled ? "not-allowed" : "pointer",
	opacity: disabled ? 0.5 : 1,
	fontSize: 13,
	fontFamily: "var(--fb-sans)",
});
