interface FormLabelProps {
	label: string;
	hint?: string;
	children: React.ReactNode;
}

export const FormLabel = ({ label, hint, children }: FormLabelProps) => (
	<div>
		<div
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 10.5,
				letterSpacing: "0.06em",
				textTransform: "uppercase",
				color: "rgba(12,10,7,0.55)",
				marginBottom: 8,
			}}
		>
			{label}
			{hint && (
				<span
					style={{
						textTransform: "none",
						letterSpacing: 0,
						marginLeft: 8,
						opacity: 0.7,
					}}
				>
					· {hint}
				</span>
			)}
		</div>
		{children}
	</div>
);
