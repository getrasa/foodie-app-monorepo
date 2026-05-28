import { Logo05 } from "#/pages/logo-lab/variants";

// Renders Logo 5 at the lab's "0.9" preview size (0.9 × 0.9 = 0.81 of the natural mark).
export const BrandMark = () => (
	<span
		style={{
			display: "inline-block",
			transform: "scale(0.81)",
			transformOrigin: "left center",
		}}
	>
		<Logo05 />
	</span>
);
