interface BrandMarkProps {
	height?: number;
}

// The PNG ships with ~26px of cream padding on each side at its native 203px
// height. Negative horizontal margins crop that whitespace so the mark sits
// flush with surrounding content. The ratio scales with `height`.
const CREAM_PADDING_RATIO = 26 / 203;

export const BrandMark = ({ height = 32 }: BrandMarkProps) => {
	const crop = -(CREAM_PADDING_RATIO * height);
	return (
		<img
			src="/jak_bylo_logo.png"
			alt="Jak Było"
			style={{
				display: "block",
				height,
				width: "auto",
				marginLeft: crop,
				marginRight: crop,
			}}
		/>
	);
};
