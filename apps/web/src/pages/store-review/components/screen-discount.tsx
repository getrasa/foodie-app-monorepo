import { useEffect, useState } from "react";
import { PrimaryButton } from "./primary-button";

interface ScreenDiscountProps {
	onNext: () => void;
}

export const ScreenDiscount = ({ onNext }: ScreenDiscountProps) => {
	const [revealed, setRevealed] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setRevealed(true), 350);
		return () => clearTimeout(t);
	}, []);

	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			{/* Top confirmation */}
			<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
				<div
					style={{
						width: 20,
						height: 20,
						borderRadius: "50%",
						background: "var(--fb-olive)",
						color: "#fff",
						display: "grid",
						placeItems: "center",
					}}
				>
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
						<path
							d="M2 5.2L4 7.2L8 2.8"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 11,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						color: "rgba(31,26,21,0.6)",
					}}
				>
					Feedback received · Grazie
				</div>
			</div>

			<div style={{ marginTop: 22 }}>
				<div
					style={{
						fontFamily: "var(--fb-serif)",
						fontSize: 38,
						lineHeight: 1.02,
						letterSpacing: "-0.02em",
						fontStyle: "italic",
						color: "var(--fb-ink)",
					}}
				>
					Here's your
					<br />
					little something.
				</div>
			</div>

			{/* Coupon ticket */}
			<div
				style={{
					marginTop: 24,
					position: "relative",
					opacity: revealed ? 1 : 0,
					transform: revealed
						? "translateY(0) scale(1)"
						: "translateY(12px) scale(0.96)",
					transition:
						"opacity 0.4s, transform 0.5s cubic-bezier(0.2,0.8,0.3,1.2)",
				}}
			>
				{/* Ticket notches */}
				<div
					style={{
						position: "absolute",
						left: -10,
						top: "58%",
						width: 20,
						height: 20,
						borderRadius: "50%",
						background: "var(--fb-cream)",
					}}
				/>
				<div
					style={{
						position: "absolute",
						right: -10,
						top: "58%",
						width: 20,
						height: 20,
						borderRadius: "50%",
						background: "var(--fb-cream)",
					}}
				/>

				<div
					style={{
						background: "var(--fb-ink)",
						color: "var(--fb-cream)",
						borderRadius: 20,
						padding: "22px 22px 0",
						overflow: "hidden",
						boxShadow: "0 20px 40px -12px rgba(31,26,21,0.3)",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
						}}
					>
						<div>
							<div
								style={{
									fontFamily: "var(--fb-mono)",
									fontSize: 10,
									letterSpacing: "0.08em",
									textTransform: "uppercase",
									opacity: 0.55,
								}}
							>
								Your restaurant
							</div>
							<div
								style={{
									fontFamily: "var(--fb-serif)",
									fontSize: 44,
									lineHeight: 1,
									marginTop: 4,
									fontStyle: "italic",
									letterSpacing: "-0.02em",
								}}
							>
								15% off
							</div>
							<div
								style={{
									fontFamily: "var(--fb-sans)",
									fontSize: 13,
									opacity: 0.7,
									marginTop: 2,
								}}
							>
								next visit · dine-in
							</div>
						</div>
						{/* Sparkle */}
						<svg width="18" height="18" viewBox="0 0 14 14" fill="none">
							<path
								d="M7 0.5L8.2 5.3L13 6.5L8.2 7.7L7 12.5L5.8 7.7L1 6.5L5.8 5.3L7 0.5Z"
								fill="var(--fb-primary)"
							/>
						</svg>
					</div>

					{/* Dashed divider */}
					<div
						style={{
							marginTop: 20,
							borderTop: "1px dashed rgba(251,247,239,0.25)",
							padding: "18px 0 22px",
						}}
					>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 10,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								opacity: 0.5,
							}}
						>
							Code
						</div>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 28,
								letterSpacing: "0.12em",
								marginTop: 4,
							}}
						>
							BITE-4KX9
						</div>
						<div
							style={{
								fontFamily: "var(--fb-sans)",
								fontSize: 12,
								opacity: 0.55,
								marginTop: 6,
							}}
						>
							Show this screen to your server.
							<br />
							Valid for 30 days.
						</div>
					</div>
				</div>
			</div>

			<div style={{ flex: 1 }} />

			<PrimaryButton onClick={onNext}>Done</PrimaryButton>

			<div
				style={{
					marginTop: 10,
					fontFamily: "var(--fb-sans)",
					fontSize: 12,
					color: "rgba(31,26,21,0.45)",
					textAlign: "center",
				}}
			>
				Screenshot saved? You can also close this tab.
			</div>
		</div>
	);
};
