import { useState } from "react";

const DEMO_CODES: Record<
	string,
	{ rating: number; when: string; text: string; status: "open" | "redeemed" | "expired" }
> = {
	"4KX9": {
		rating: 5,
		when: "12 min ago",
		text: "The tagliatelle al ragù was unreal. Our server (Marco?) was wonderful with our kid.",
		status: "open",
	},
	"8PQ2": {
		rating: 5,
		when: "47 min ago",
		text: "Best tiramisù in the neighborhood, hands down.",
		status: "redeemed",
	},
	K2LM: {
		rating: 5,
		when: "Yesterday",
		text: "Felt like being in Bologna. The burrata with peaches is a revelation.",
		status: "redeemed",
	},
};

type ResultState =
	| null
	| { kind: "invalid"; code: string }
	| { kind: "used"; rating: number; when: string }
	| { kind: "expired"; rating: number; when: string }
	| { kind: "valid"; rating: number; when: string; text: string }
	| { kind: "justRedeemed" };

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

	const check = () => {
		const c = code.trim().toUpperCase();
		if (!c) return;
		const match = DEMO_CODES[c];
		if (!match) {
			setResult({ kind: "invalid", code: c });
		} else if (match.status === "redeemed") {
			setResult({ kind: "used", rating: match.rating, when: match.when });
		} else if (match.status === "expired") {
			setResult({ kind: "expired", rating: match.rating, when: match.when });
		} else {
			setResult({
				kind: "valid",
				rating: match.rating,
				when: match.when,
				text: match.text,
			});
		}
	};

	const redeem = () => {
		if (result?.kind === "valid") {
			setResult({ kind: "justRedeemed" });
		}
	};

	const reset = () => {
		setCode("");
		setResult(null);
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
				Redeem a code
			</div>
			<div
				style={{
					fontSize: 13,
					color: "rgba(31,26,21,0.55)",
					marginTop: 4,
				}}
			>
				Cashier mode · Keep this tab open at the till.
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
						Enter code from diner's phone
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
						<span
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 16,
								color: "rgba(31,26,21,0.4)",
							}}
						>
							CODE-
						</span>
						<input
							value={code}
							onChange={(e) => setCode(e.target.value.toUpperCase())}
							placeholder="4KX9"
							onKeyDown={(e) => e.key === "Enter" && check()}
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
							style={{
								padding: "10px 18px",
								borderRadius: 10,
								background: "var(--fb-ink)",
								color: "var(--fb-cream)",
								border: "none",
								cursor: "pointer",
								fontSize: 13,
								fontFamily: "var(--fb-sans)",
								fontWeight: 500,
							}}
						>
							Check
						</button>
					</div>

					{result && (
						<div style={{ marginTop: 18 }}>
							{result.kind === "invalid" && (
								<ResultBox
									color="#A63D2A"
									title="Code not found"
									body={`We don't have a record of ${result.code}. Double-check the spelling.`}
								/>
							)}
							{result.kind === "used" && (
								<ResultBox
									color="rgba(31,26,21,0.55)"
									title="Already redeemed"
									body={`This code was marked used. Rating was ${result.rating}/5 · ${result.when}.`}
								/>
							)}
							{result.kind === "expired" && (
								<ResultBox
									color="rgba(31,26,21,0.55)"
									title="Expired"
									body={`This code expired. Rating was ${result.rating}/5 · ${result.when}.`}
								/>
							)}
							{result.kind === "valid" && (
								<div
									style={{
										padding: 16,
										borderRadius: 12,
										background: "var(--fb-cream)",
										border: "1px solid var(--fb-olive)",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
										}}
									>
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
											>
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
											Valid · 15% off
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
										Issued {result.when.toLowerCase()} ·{" "}
										{result.rating}/5 stars
										{result.text &&
											` · "${result.text.slice(0, 60)}${result.text.length > 60 ? "…" : ""}"`}
									</div>
									<div
										style={{
											display: "flex",
											gap: 8,
											marginTop: 14,
										}}
									>
										<button
											type="button"
											onClick={redeem}
											style={{
												padding: "9px 16px",
												borderRadius: 10,
												background: "var(--fb-ink)",
												color: "var(--fb-cream)",
												border: "none",
												cursor: "pointer",
												fontSize: 13,
												fontWeight: 500,
											}}
										>
											Mark as redeemed
										</button>
										<button
											type="button"
											onClick={reset}
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
											Cancel
										</button>
									</div>
								</div>
							)}
							{result.kind === "justRedeemed" && (
								<ResultBox
									color="var(--fb-olive)"
									title="Redeemed"
									body="Discount applied. Diner's feedback has been marked complete."
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
										Next code
									</button>
								</ResultBox>
							)}
						</div>
					)}
				</div>

				<div
					style={{
						marginTop: 16,
						padding: 14,
						borderRadius: 12,
						background: "var(--fb-paper)",
						border: "0.5px solid rgba(31,26,21,0.08)",
					}}
				>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10.5,
							letterSpacing: "0.06em",
							color: "rgba(31,26,21,0.55)",
						}}
					>
						TRY THESE · demo codes
					</div>
					<div
						style={{
							display: "flex",
							gap: 6,
							flexWrap: "wrap",
							marginTop: 8,
						}}
					>
						{["4KX9", "8PQ2", "K2LM", "BADCODE"].map((c) => (
							<button
								key={c}
								type="button"
								onClick={() => setCode(c)}
								style={{
									padding: "5px 10px",
									borderRadius: 7,
									background: "#fff",
									border: "0.5px solid rgba(31,26,21,0.1)",
									cursor: "pointer",
									fontFamily: "var(--fb-mono)",
									fontSize: 11,
									color: "var(--fb-ink)",
								}}
							>
								{c}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
