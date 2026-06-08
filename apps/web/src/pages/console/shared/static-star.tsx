interface StaticStarProps {
	size?: number;
	filled?: boolean;
}

export const StaticStar = ({ size = 14, filled = true }: StaticStarProps) => {
	return (
		<svg width={size} height={size} viewBox="0 0 44 44" fill="none">
			<path
				d="M22 3.5L27.4 15.6L40.5 17.1L30.8 26.2L33.4 39.2L22 32.6L10.6 39.2L13.2 26.2L3.5 17.1L16.6 15.6L22 3.5Z"
				fill={filled ? "var(--fb-primary)" : "transparent"}
				stroke={filled ? "var(--fb-primary)" : "rgba(31,26,21,0.25)"}
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
