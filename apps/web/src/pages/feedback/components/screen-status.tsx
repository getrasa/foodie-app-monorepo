interface ScreenStatusProps {
	heading: string;
	body: string;
}

export const ScreenStatus = ({ heading, body }: ScreenStatusProps) => {
	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
				textAlign: "center",
				alignItems: "center",
			}}
		>
			<div style={{ flex: 1 }} />
			<div
				style={{
					fontFamily: "var(--fb-serif)",
					fontSize: 32,
					lineHeight: 1.08,
					letterSpacing: "-0.02em",
					fontStyle: "italic",
					color: "var(--fb-ink)",
				}}
			>
				{heading}
			</div>
			<div
				style={{
					marginTop: 12,
					fontFamily: "var(--fb-sans)",
					fontSize: 14.5,
					lineHeight: 1.5,
					color: "rgba(12,10,7,0.62)",
					maxWidth: 320,
				}}
			>
				{body}
			</div>
			<div style={{ flex: 1 }} />
		</div>
	);
};
