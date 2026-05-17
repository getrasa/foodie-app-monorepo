import { useEffect, useState } from "react";
import { PrimaryButton } from "./primary-button";

interface ScreenDiscountProps {
	email: string;
	onNext: () => void;
}

export const ScreenDiscount = ({ email, onNext }: ScreenDiscountProps) => {
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
					Opinia przyjęta · Dziękujemy
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
					Twój kod
					<br />
					rabatowy.
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
								Restauracja u Heleny
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
								15% rabatu
							</div>
							<div
								style={{
									fontFamily: "var(--fb-sans)",
									fontSize: 13,
									opacity: 0.7,
									marginTop: 2,
								}}
							>
								następna wizyta · na miejscu
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
							Kod
						</div>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 28,
								letterSpacing: "0.12em",
								marginTop: 4,
							}}
						>
							HELENA-4KX9
						</div>
						<div
							style={{
								fontFamily: "var(--fb-sans)",
								fontSize: 12,
								opacity: 0.55,
								marginTop: 6,
							}}
						>
							Pokaż ten ekran kelnerowi.
							<br />
							Ważny przez 30 dni.
						</div>
					</div>
				</div>
			</div>

			{/* Email + screenshot note */}
			<div
				style={{
					marginTop: 16,
					padding: "12px 14px",
					borderRadius: 12,
					background: "var(--fb-paper)",
					border: "0.5px solid rgba(31,26,21,0.08)",
					display: "flex",
					gap: 10,
					alignItems: "flex-start",
				}}
			>
				<div
					style={{
						width: 28,
						height: 28,
						borderRadius: 8,
						background: "#fff",
						border: "0.5px solid rgba(31,26,21,0.08)",
						display: "grid",
						placeItems: "center",
						flexShrink: 0,
					}}
				>
					<svg width="14" height="14" viewBox="0 0 18 18" fill="none">
						<path
							d="M2 4.5h14v9H2zM2 4.5l7 5 7-5"
							stroke="var(--fb-ink)"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div style={{ flex: 1, minWidth: 0 }}>
					<div
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12.5,
							color: "var(--fb-ink)",
							fontWeight: 500,
							wordBreak: "break-word",
						}}
					>
						Kod wysłany na {email || "Twój adres e-mail"}
					</div>
					<div
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 11.5,
							color: "rgba(31,26,21,0.6)",
							marginTop: 2,
							lineHeight: 1.45,
						}}
					>
						Sprawdź skrzynkę (i folder spam). Dla pewności — zrób też zrzut
						ekranu tego kodu.
					</div>
				</div>
			</div>

			<div style={{ flex: 1 }} />

			<PrimaryButton onClick={onNext}>Gotowe</PrimaryButton>
		</div>
	);
};
