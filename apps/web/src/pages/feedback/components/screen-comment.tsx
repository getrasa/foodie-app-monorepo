import { StaticStar } from "#/pages/console/shared/static-star";
import { BackRow } from "./back-row";
import { PrimaryButton } from "./primary-button";

const RATING_WORDS: Record<number, string> = {
	1: "Słabo",
	2: "Mogło być lepiej",
	3: "W porządku",
	4: "Bardzo dobrze",
	5: "Wyśmienicie",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ScreenCommentProps {
	rating: number;
	comment: string;
	setComment: (c: string) => void;
	email: string;
	setEmail: (e: string) => void;
	onSubmit: () => void;
	onBack: () => void;
	submitting: boolean;
	submitError: string | null;
}

export const ScreenComment = ({
	rating,
	comment,
	setComment,
	email,
	setEmail,
	onSubmit,
	onBack,
	submitting,
	submitError,
}: ScreenCommentProps) => {
	const heading =
		rating <= 3
			? "Co poszło nie tak?"
			: rating === 4
				? "Co możemy poprawić?"
				: "Powiesz coś więcej?";

	const placeholder =
		rating <= 3
			? "Opisz, co możemy poprawić…"
			: rating === 4
				? "Co mogłoby być jeszcze lepsze?"
				: "Co wam dziś wyszło wyśmienicie…";

	const trimmedEmail = email.trim();
	const emailValid = trimmedEmail.length === 0 || EMAIL_RE.test(trimmedEmail);
	const commentRequired = rating < 5;
	const commentFilled = comment.trim().length > 0;
	const canSubmit =
		!submitting && emailValid && (!commentRequired || commentFilled);

	return (
		<div
			style={{
				padding: "60px 24px 24px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			<BackRow onBack={onBack} step={2} total={2} />

			<div style={{ marginTop: 24 }}>
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 6,
						padding: "6px 12px",
						borderRadius: 999,
						background: "var(--fb-paper)",
						border: "0.5px solid rgba(31,26,21,0.07)",
					}}
				>
					{[1, 2, 3, 4, 5].map((i) => (
						<StaticStar key={i} size={11} filled={i <= rating} />
					))}
					<span
						style={{
							fontFamily: "var(--fb-sans)",
							fontSize: 12,
							color: "rgba(31,26,21,0.65)",
							marginLeft: 4,
						}}
					>
						{RATING_WORDS[rating]}
					</span>
				</div>

				<div
					style={{
						marginTop: 16,
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
						marginTop: 8,
						fontFamily: "var(--fb-sans)",
						fontSize: 13.5,
						color: commentRequired
							? "var(--fb-primary)"
							: "rgba(31,26,21,0.55)",
					}}
				>
					{commentRequired
						? "Wymagane — opisz, co możemy poprawić."
						: "Opcjonalne — można pominąć i przejść dalej."}
				</div>
			</div>

			<div
				style={{
					marginTop: 14,
					padding: 14,
					background: "var(--fb-paper)",
					borderRadius: 14,
					border:
						commentRequired && !commentFilled
							? "1px solid rgba(200,106,62,0.45)"
							: "0.5px solid rgba(31,26,21,0.07)",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder={placeholder}
					maxLength={500}
					rows={4}
					style={{
						width: "100%",
						border: "none",
						background: "transparent",
						resize: "none",
						outline: "none",
						fontFamily: "var(--fb-sans)",
						fontSize: 15,
						lineHeight: 1.45,
						color: "var(--fb-ink)",
						minHeight: 96,
					}}
				/>
				<div
					style={{
						fontFamily: "var(--fb-mono)",
						fontSize: 10,
						letterSpacing: "0.04em",
						color: "rgba(31,26,21,0.35)",
						textAlign: "right",
					}}
				>
					{comment.length}/500
				</div>
			</div>

			<div style={{ marginTop: 16 }}>
				<label
					htmlFor="customer-email"
					style={{
						display: "block",
						fontFamily: "var(--fb-sans)",
						fontSize: 13,
						color: "rgba(31,26,21,0.65)",
						marginBottom: 6,
					}}
				>
					Wyślij mi kod e-mailem{" "}
					<span style={{ color: "rgba(31,26,21,0.4)" }}>(opcjonalnie)</span>
				</label>
				<div
					style={{
						padding: "12px 14px",
						background: "var(--fb-paper)",
						borderRadius: 12,
						border: !emailValid
							? "1px solid rgba(200,106,62,0.45)"
							: "0.5px solid rgba(31,26,21,0.1)",
						display: "flex",
						alignItems: "center",
						gap: 10,
					}}
				>
					<svg width="16" height="16" viewBox="0 0 18 18" fill="none">
						<path
							d="M2 4.5h14v9H2zM2 4.5l7 5 7-5"
							stroke="rgba(31,26,21,0.45)"
							strokeWidth="1.4"
							strokeLinejoin="round"
						/>
					</svg>
					<input
						id="customer-email"
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
							fontSize: 15,
							color: "var(--fb-ink)",
							padding: "4px 0",
						}}
					/>
				</div>
				{!emailValid && (
					<div
						style={{
							marginTop: 6,
							fontFamily: "var(--fb-sans)",
							fontSize: 12,
							color: "rgba(200,106,62,0.95)",
						}}
					>
						Sprawdź adres e-mail — wygląda na niepoprawny.
					</div>
				)}
			</div>

			<div
				style={{
					marginTop: 16,
					padding: "11px 13px",
					borderRadius: 12,
					border: "0.5px dashed rgba(31,26,21,0.15)",
					fontFamily: "var(--fb-sans)",
					fontSize: 11.5,
					lineHeight: 1.5,
					color: "rgba(31,26,21,0.6)",
				}}
			>
				Wysyłając opinię zapisujemy ocenę, komentarz oraz — dla ochrony przed
				nadużyciami — anonimowy identyfikator urządzenia, adres IP i informację
				o przeglądarce. E-mail służy wyłącznie do wysyłki kodu rabatowego.
			</div>

			{submitError && (
				<div
					style={{
						marginTop: 12,
						padding: "10px 12px",
						borderRadius: 10,
						background: "rgba(200,106,62,0.08)",
						color: "var(--fb-primary)",
						fontFamily: "var(--fb-sans)",
						fontSize: 13,
					}}
				>
					{submitError}
				</div>
			)}

			<div style={{ flex: 1 }} />

			<div style={{ marginTop: 14 }}>
				<PrimaryButton onClick={onSubmit} disabled={!canSubmit}>
					{submitting ? "Wysyłanie…" : "Wyślij opinię i odbierz kod"}
				</PrimaryButton>
				{commentRequired && !commentFilled && (
					<div
						style={{
							marginTop: 8,
							fontFamily: "var(--fb-sans)",
							fontSize: 12,
							color: "rgba(31,26,21,0.5)",
							textAlign: "center",
						}}
					>
						Napisz kilka słów, by przejść dalej.
					</div>
				)}
			</div>
		</div>
	);
};
