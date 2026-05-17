import { BackRow } from "./back-row";
import { PrimaryButton } from "./primary-button";

interface ScreenEmailProps {
	email: string;
	setEmail: (e: string) => void;
	rating: number;
	onNext: () => void;
	onBack: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ScreenEmail = ({
	email,
	setEmail,
	rating,
	onNext,
	onBack,
}: ScreenEmailProps) => {
	const isFive = rating === 5;
	const total = isFive ? 4 : 3;
	const step = total;
	const trimmed = email.trim();
	const valid = EMAIL_RE.test(trimmed);
	const showError = trimmed.length > 0 && !valid;

	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			<BackRow onBack={onBack} step={step} total={total} />

			<div style={{ marginTop: 24 }}>
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 8,
						padding: "6px 12px",
						borderRadius: 999,
						background: "var(--fb-paper)",
						border: "0.5px solid rgba(31,26,21,0.07)",
					}}
				>
					<svg width="12" height="12" viewBox="0 0 14 14" fill="none">
						<path
							d="M7 0.5L8.2 5.3L13 6.5L8.2 7.7L7 12.5L5.8 7.7L1 6.5L5.8 5.3L7 0.5Z"
							fill="var(--fb-primary)"
						/>
					</svg>
					<span
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12,
							color: "rgba(31,26,21,0.7)",
						}}
					>
						Ostatni krok przed rabatem
					</span>
				</div>

				<div
					style={{
						marginTop: 16,
						fontFamily: "var(--fb-serif)",
						fontSize: 30,
						lineHeight: 1.05,
						letterSpacing: "-0.02em",
						fontStyle: "italic",
						color: "var(--fb-ink)",
						whiteSpace: "nowrap",
					}}
				>
					Na jaki adres wysłać kod?
				</div>
				<div
					style={{
						marginTop: 10,
						fontFamily: "var(--fb-sans)",
						fontSize: 14,
						lineHeight: 1.5,
						color: "rgba(31,26,21,0.62)",
					}}
				>
					Wyślemy kod również e-mailem — żebyś miał(a) go zawsze pod ręką.
				</div>
			</div>

			<div
				style={{
					marginTop: 22,
					padding: "14px 16px",
					background: "var(--fb-paper)",
					borderRadius: 14,
					border: showError
						? "1px solid rgba(200,106,62,0.45)"
						: "0.5px solid rgba(31,26,21,0.1)",
					display: "flex",
					alignItems: "center",
					gap: 10,
				}}
			>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
					<path
						d="M2 4.5h14v9H2zM2 4.5l7 5 7-5"
						stroke="rgba(31,26,21,0.45)"
						strokeWidth="1.4"
						strokeLinejoin="round"
					/>
				</svg>
				<input
					type="email"
					inputMode="email"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="ty@example.pl"
					style={{
						flex: 1,
						border: "none",
						background: "transparent",
						outline: "none",
						fontFamily: "var(--fb-sans)",
						fontSize: 16,
						color: "var(--fb-ink)",
						padding: "6px 0",
					}}
				/>
			</div>

			<div
				style={{
					marginTop: 14,
					padding: "12px 14px",
					background: "transparent",
					border: "0.5px dashed rgba(31,26,21,0.15)",
					borderRadius: 12,
					display: "flex",
					gap: 10,
				}}
			>
				<div
					style={{
						width: 18,
						height: 18,
						borderRadius: 5,
						background: "var(--fb-ink)",
						color: "var(--fb-cream)",
						display: "grid",
						placeItems: "center",
						flexShrink: 0,
						marginTop: 1,
					}}
				>
					<svg width="10" height="10" viewBox="0 0 10 10">
						<path
							d="M2 5.2L4 7.2L8 2.8"
							stroke="currentColor"
							strokeWidth="1.8"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div
					style={{
						fontFamily: "var(--fb-sans)",
						fontSize: 11.5,
						lineHeight: 1.45,
						color: "rgba(31,26,21,0.6)",
					}}
				>
					Adres służy wyłącznie do wysyłki kodu rabatowego i kontroli
					wykorzystania. Nie zapisujemy go do newslettera. Zgodnie z RODO.
				</div>
			</div>

			<div style={{ flex: 1 }} />

			<PrimaryButton onClick={onNext} disabled={!valid}>
				Wyślij i odbierz kod →
			</PrimaryButton>
		</div>
	);
};
