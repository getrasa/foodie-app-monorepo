import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type { VoucherStatus } from "#/lib/api/owner-feedback-api";
import { type VoucherLookupResult, voucherApi } from "#/lib/api/voucher-api";
import { ApiError } from "#/lib/api-client";

type ResultState =
	| null
	| { kind: "invalid"; code: string }
	| { kind: "error"; message: string }
	| { kind: "found"; data: VoucherLookupResult }
	| { kind: "justRedeemed"; data: VoucherLookupResult };

const STATUS_BADGE: Record<VoucherStatus, { color: string; label: string }> = {
	active: { color: "var(--fb-olive)", label: "Aktywny" },
	redeemed: { color: "rgba(31,26,21,0.55)", label: "Już zrealizowany" },
	expired: { color: "rgba(31,26,21,0.55)", label: "Wygasł" },
	voided: { color: "#A63D2A", label: "Unieważniony" },
};

const formatDate = (iso: string | null): string | null => {
	if (!iso) return null;
	return new Date(iso).toLocaleDateString("pl-PL", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

const formatRelative = (iso: string): string => {
	const d = new Date(iso);
	const delta = Date.now() - d.getTime();
	const min = Math.floor(delta / 60000);
	if (min < 1) return "przed chwilą";
	if (min < 60) return `${min} min temu`;
	const hr = Math.floor(min / 60);
	if (hr < 24) return `${hr} godz. temu`;
	return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
};

const ResultBox = ({
	color,
	title,
	body,
	children,
}: {
	color: string;
	title: string;
	body: string;
	children?: React.ReactNode;
}) => (
	<div
		style={{
			padding: 16,
			borderRadius: 12,
			background: "var(--fb-paper)",
			border: `1px solid ${color}`,
		}}
	>
		<div
			style={{
				fontFamily: "var(--fb-mono)",
				fontSize: 11,
				letterSpacing: "0.06em",
				textTransform: "uppercase",
				color,
			}}
		>
			{title}
		</div>
		<div
			style={{
				marginTop: 6,
				fontSize: 13,
				color: "var(--fb-ink)",
				lineHeight: 1.5,
			}}
		>
			{body}
		</div>
		{children}
	</div>
);

export const RedeemPage = () => {
	const [code, setCode] = useState("");
	const [result, setResult] = useState<ResultState>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

	const lookupMutation = useMutation({
		mutationFn: (raw: string) => voucherApi.lookupByCode(raw),
		onSuccess: (data) => {
			setResult({ kind: "found", data });
		},
		onError: (err: Error, variables) => {
			if (err instanceof ApiError && err.status === 404) {
				setResult({ kind: "invalid", code: variables });
				return;
			}
			setResult({
				kind: "error",
				message: err.message || "Nie udało się pobrać kodu",
			});
		},
	});

	const redeemMutation = useMutation({
		mutationFn: (voucherId: string) => voucherApi.redeem(voucherId),
		onSuccess: (voucher) => {
			setResult((prev) =>
				prev?.kind === "found"
					? {
							kind: "justRedeemed",
							data: { voucher, feedback: prev.data.feedback },
						}
					: prev,
			);
		},
		onError: (err: Error) => {
			// 409 with body.status describes the actual server state — refresh the
			// lookup view so the cashier sees the right pill.
			if (
				err instanceof ApiError &&
				err.status === 409 &&
				result?.kind === "found"
			) {
				const serverStatus = (err.body as { status?: VoucherStatus } | null)
					?.status;
				if (serverStatus) {
					setResult({
						kind: "found",
						data: {
							voucher: { ...result.data.voucher, status: serverStatus },
							feedback: result.data.feedback,
						},
					});
					return;
				}
			}
			setResult({
				kind: "error",
				message: err.message || "Nie udało się zrealizować kodu",
			});
		},
	});

	// Kiosk/tablet flow: keep focus where the cashier expects it.
	useEffect(() => {
		if (!result) {
			inputRef.current?.focus();
		} else if (
			result.kind === "found" &&
			result.data.voucher.status === "active"
		) {
			confirmButtonRef.current?.focus();
		}
	}, [result]);

	const check = () => {
		const trimmed = code.trim().toUpperCase();
		if (!trimmed) return;
		lookupMutation.mutate(trimmed);
	};

	const reset = () => {
		setCode("");
		setResult(null);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			check();
		}
	};

	return (
		<div
			style={{
				padding: "28px 32px",
				height: "100%",
				overflowY: "auto",
				fontFamily: "var(--fb-sans)",
			}}
		>
			<div
				style={{
					fontFamily: "var(--fb-serif)",
					fontSize: 28,
					fontStyle: "italic",
					letterSpacing: "-0.01em",
					color: "var(--fb-ink)",
				}}
			>
				Zrealizuj kod
			</div>
			<div
				style={{
					fontSize: 13,
					color: "rgba(31,26,21,0.55)",
					marginTop: 4,
				}}
			>
				Tryb kasjera · Trzymaj tę kartę otwartą przy kasie.
			</div>

			<div style={{ marginTop: 28, maxWidth: 480 }}>
				<div
					style={{
						padding: 22,
						borderRadius: 16,
						background: "#fff",
						border: "0.5px solid rgba(31,26,21,0.08)",
					}}
				>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "rgba(31,26,21,0.55)",
							marginBottom: 8,
						}}
					>
						Wpisz kod z telefonu gościa
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "4px 4px 4px 14px",
							borderRadius: 12,
							background: "var(--fb-paper)",
							border: "1px solid rgba(31,26,21,0.12)",
						}}
					>
						<input
							ref={inputRef}
							value={code}
							onChange={(e) => setCode(e.target.value.toUpperCase())}
							placeholder="LUCIA-4KX9"
							onKeyDown={handleKeyDown}
							style={{
								flex: 1,
								border: "none",
								background: "transparent",
								outline: "none",
								fontFamily: "var(--fb-mono)",
								fontSize: 20,
								letterSpacing: "0.1em",
								color: "var(--fb-ink)",
								padding: "12px 0",
							}}
						/>
						<button
							type="button"
							onClick={check}
							disabled={lookupMutation.isPending || !code.trim()}
							style={{
								padding: "10px 18px",
								borderRadius: 10,
								background: "var(--fb-ink)",
								color: "var(--fb-cream)",
								border: "none",
								cursor: lookupMutation.isPending ? "wait" : "pointer",
								opacity: lookupMutation.isPending || !code.trim() ? 0.5 : 1,
								fontSize: 13,
								fontFamily: "var(--fb-sans)",
								fontWeight: 500,
							}}
						>
							{lookupMutation.isPending ? "Sprawdzam…" : "Sprawdź"}
						</button>
					</div>

					{result && (
						<div style={{ marginTop: 18 }}>
							{result.kind === "invalid" && (
								<ResultBox
									color="#A63D2A"
									title="Nie znaleziono kodu"
									body={`Nie mamy w bazie kodu ${result.code}. Sprawdź pisownię.`}
								>
									<button
										type="button"
										onClick={reset}
										style={{
											marginTop: 12,
											padding: "8px 14px",
											borderRadius: 8,
											background: "var(--fb-ink)",
											color: "var(--fb-cream)",
											border: "none",
											cursor: "pointer",
											fontSize: 12.5,
										}}
									>
										Spróbuj ponownie
									</button>
								</ResultBox>
							)}
							{result.kind === "error" && (
								<ResultBox color="#A63D2A" title="Błąd" body={result.message}>
									<button
										type="button"
										onClick={reset}
										style={{
											marginTop: 12,
											padding: "8px 14px",
											borderRadius: 8,
											background: "var(--fb-ink)",
											color: "var(--fb-cream)",
											border: "none",
											cursor: "pointer",
											fontSize: 12.5,
										}}
									>
										Wyczyść
									</button>
								</ResultBox>
							)}
							{result.kind === "found" && (
								<FoundVoucher
									data={result.data}
									redeeming={redeemMutation.isPending}
									confirmRef={confirmButtonRef}
									onConfirm={() =>
										redeemMutation.mutate(result.data.voucher.id)
									}
									onReset={reset}
								/>
							)}
							{result.kind === "justRedeemed" && (
								<JustRedeemed data={result.data} onReset={reset} />
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

interface FoundVoucherProps {
	data: VoucherLookupResult;
	redeeming: boolean;
	confirmRef: React.RefObject<HTMLButtonElement | null>;
	onConfirm: () => void;
	onReset: () => void;
}

const FoundVoucher = ({
	data,
	redeeming,
	confirmRef,
	onConfirm,
	onReset,
}: FoundVoucherProps) => {
	const { voucher, feedback } = data;
	const badge = STATUS_BADGE[voucher.status];
	const expiry = formatDate(voucher.expiresAt);
	const redeemedAt = formatDate(voucher.redeemedAt);
	const voidedAt = formatDate(voucher.voidedAt);

	if (voucher.status === "active") {
		const issued = formatRelative(voucher.createdAt);
		return (
			<div
				style={{
					padding: 16,
					borderRadius: 12,
					background: "var(--fb-cream)",
					border: "1px solid var(--fb-olive)",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: "50%",
							background: "var(--fb-olive)",
							color: "#fff",
							display: "grid",
							placeItems: "center",
						}}
					>
						<svg
							width="9"
							height="9"
							viewBox="0 0 10 10"
							role="img"
							aria-label="Aktywny"
						>
							<title>Aktywny</title>
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
							fontFamily: "var(--fb-mono)",
							fontSize: 11,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "var(--fb-olive)",
						}}
					>
						{badge.label} · {voucher.description}
					</div>
				</div>
				<div
					style={{
						marginTop: 10,
						fontSize: 14,
						color: "var(--fb-ink)",
						lineHeight: 1.5,
					}}
				>
					Wystawiony {issued.toLowerCase()}
					{feedback ? ` · ${feedback.rating}/5 gwiazdek` : ""}
					{feedback?.commentSnippet ? ` · „${feedback.commentSnippet}”` : ""}
				</div>
				{expiry && (
					<div
						style={{
							marginTop: 6,
							fontSize: 12,
							color: "rgba(31,26,21,0.55)",
						}}
					>
						Ważny do {expiry}
					</div>
				)}
				<div style={{ display: "flex", gap: 8, marginTop: 14 }}>
					<button
						ref={confirmRef}
						type="button"
						onClick={onConfirm}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								onConfirm();
							}
						}}
						disabled={redeeming}
						style={{
							padding: "9px 16px",
							borderRadius: 10,
							background: "var(--fb-ink)",
							color: "var(--fb-cream)",
							border: "none",
							cursor: redeeming ? "wait" : "pointer",
							opacity: redeeming ? 0.7 : 1,
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						{redeeming ? "Realizuję…" : "Oznacz jako zrealizowany"}
					</button>
					<button
						type="button"
						onClick={onReset}
						style={{
							padding: "9px 16px",
							borderRadius: 10,
							background: "transparent",
							color: "var(--fb-ink)",
							border: "0.5px solid rgba(31,26,21,0.2)",
							cursor: "pointer",
							fontSize: 13,
						}}
					>
						Anuluj
					</button>
				</div>
			</div>
		);
	}

	if (voucher.status === "redeemed") {
		return (
			<ResultBox
				color={badge.color}
				title={badge.label}
				body={`Ten kod został już zrealizowany${redeemedAt ? ` ${redeemedAt}` : ""}.`}
			>
				<ResetButton onReset={onReset} />
			</ResultBox>
		);
	}

	if (voucher.status === "expired") {
		return (
			<ResultBox
				color={badge.color}
				title={badge.label}
				body={`Ten kod wygasł${expiry ? ` ${expiry}` : ""}.`}
			>
				<ResetButton onReset={onReset} />
			</ResultBox>
		);
	}

	// voided
	const spamFlagged = feedback?.spamMarkedAt
		? " Opinia gościa została oznaczona jako spam."
		: "";
	return (
		<ResultBox
			color={badge.color}
			title={badge.label}
			body={`Ten kod został unieważniony${voidedAt ? ` ${voidedAt}` : ""}.${spamFlagged}`}
		>
			<ResetButton onReset={onReset} />
		</ResultBox>
	);
};

const ResetButton = ({ onReset }: { onReset: () => void }) => {
	const ref = useRef<HTMLButtonElement | null>(null);
	useEffect(() => {
		ref.current?.focus();
	}, []);
	return (
		<button
			ref={ref}
			type="button"
			onClick={onReset}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					onReset();
				}
			}}
			style={{
				marginTop: 12,
				padding: "8px 14px",
				borderRadius: 8,
				background: "var(--fb-ink)",
				color: "var(--fb-cream)",
				border: "none",
				cursor: "pointer",
				fontSize: 12.5,
			}}
		>
			Następny kod
		</button>
	);
};

const JustRedeemed = ({
	data,
	onReset,
}: {
	data: VoucherLookupResult;
	onReset: () => void;
}) => (
	<ResultBox
		color="var(--fb-olive)"
		title="Zrealizowany"
		body={`Rabat naliczony · ${data.voucher.description}.`}
	>
		<ResetButton onReset={onReset} />
	</ResultBox>
);
