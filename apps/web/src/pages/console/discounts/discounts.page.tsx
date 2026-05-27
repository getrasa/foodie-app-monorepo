import { Alert, Center, Loader, UnstyledButton } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMyBusiness } from "#/lib/api/use-my-business";
import { venueApi, type RewardType } from "#/lib/api/venue-api";

const FormLabel = ({
	label,
	hint,
	children,
}: {
	label: string;
	hint?: string;
	children: React.ReactNode;
}) => (
	<div>
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

interface FormState {
	type: RewardType;
	value: string;
	expiresInDays: number;
	dailyCap: number | null;
	active: boolean;
}

const DEFAULT_STATE: FormState = {
	type: "percentage",
	value: "15",
	expiresInDays: 30,
	dailyCap: 3,
	active: true,
};

export const DiscountsPage = () => {
	const queryClient = useQueryClient();
	const businessQuery = useMyBusiness();
	const venue = businessQuery.data?.venues?.[0];

	const offerQuery = useQuery({
		queryKey: ["reward-offer", venue?.id ?? null],
		queryFn: () => venueApi.getRewardOffer(venue!.id),
		enabled: !!venue?.id,
	});

	const [form, setForm] = useState<FormState>(DEFAULT_STATE);
	const [dirty, setDirty] = useState(false);
	const [bannerMessage, setBannerMessage] = useState<{
		kind: "success" | "error";
		text: string;
	} | null>(null);

	// Sync form from server data when it loads or refetches (only if not dirty).
	useEffect(() => {
		if (offerQuery.data && !dirty) {
			setForm({
				type: offerQuery.data.type,
				value: offerQuery.data.value,
				expiresInDays: offerQuery.data.expiresInDays ?? 30,
				dailyCap: offerQuery.data.dailyCap,
				active: offerQuery.data.active,
			});
		}
	}, [offerQuery.data, dirty]);

	const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		setDirty(true);
		setBannerMessage(null);
	};

	const mutation = useMutation({
		mutationFn: async () => {
			if (!venue) throw new Error("Najpierw skonfiguruj swoją restaurację");
			return venueApi.upsertRewardOffer(venue.id, {
				type: form.type,
				value: form.value,
				expiresInDays: form.expiresInDays || null,
				dailyCap: form.dailyCap ?? null,
				active: form.active,
			});
		},
		onSuccess: async (data) => {
			setBannerMessage({ kind: "success", text: "Zapisano zmiany" });
			setDirty(false);
			if (venue) {
				queryClient.setQueryData(["reward-offer", venue.id], data);
			}
		},
		onError: (err: Error) => {
			setBannerMessage({ kind: "error", text: err.message });
		},
	});

	const handleReset = () => {
		if (offerQuery.data) {
			setForm({
				type: offerQuery.data.type,
				value: offerQuery.data.value,
				expiresInDays: offerQuery.data.expiresInDays ?? 30,
				dailyCap: offerQuery.data.dailyCap,
				active: offerQuery.data.active,
			});
		} else {
			setForm(DEFAULT_STATE);
		}
		setDirty(false);
		setBannerMessage(null);
	};

	if (businessQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (!venue) {
		return (
			<div style={{ padding: "28px 32px" }}>
				<Alert color="yellow" variant="light">
					Najpierw przejdź przez konfigurację swojej restauracji.
				</Alert>
			</div>
		);
	}

	if (offerQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	const numericValue = Number(form.value) || 0;
	const valueLabel =
		form.type === "free_item" ? "Opis produktu" : "Wartość";

	return (
		<div
			style={{
				padding: "28px 32px",
				overflowY: "auto",
				height: "100%",
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
				Rabaty
			</div>
			<div style={{ fontSize: 13, color: "rgba(31,26,21,0.55)", marginTop: 4 }}>
				To, co dostaje każdy gość po wystawieniu opinii.
			</div>

			{bannerMessage && (
				<div style={{ marginTop: 16 }}>
					<Alert color={bannerMessage.kind === "success" ? "olive" : "red"} variant="light">
						{bannerMessage.text}
					</Alert>
				</div>
			)}

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 320px",
					gap: 24,
					marginTop: 22,
				}}
			>
				{/* Form */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 22,
					}}
				>
					<FormLabel label="Rodzaj nagrody">
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: 8,
							}}
						>
							{(
								[
									{ k: "percentage", l: "Procent zniżki", s: "% od rachunku" },
									{ k: "fixed_amount", l: "Kwota stała", s: "zł od rachunku" },
									{ k: "free_item", l: "Darmowy produkt", s: "np. deser" },
								] as const
							).map((o) => (
								<UnstyledButton
									key={o.k}
									onClick={() => update("type", o.k)}
									style={{
										padding: "14px 12px",
										borderRadius: 12,
										background: form.type === o.k ? "var(--fb-cream)" : "#fff",
										border:
											form.type === o.k
												? "1.5px solid var(--fb-ink)"
												: "1px solid rgba(31,26,21,0.12)",
										textAlign: "left",
										fontFamily: "var(--fb-sans)",
									}}
								>
									<div
										style={{
											fontSize: 13,
											fontWeight: 500,
											color: "var(--fb-ink)",
										}}
									>
										{o.l}
									</div>
									<div
										style={{
											fontSize: 11.5,
											color: "rgba(31,26,21,0.55)",
											marginTop: 2,
										}}
									>
										{o.s}
									</div>
								</UnstyledButton>
							))}
						</div>
					</FormLabel>

					<FormLabel label={valueLabel}>
						{form.type === "free_item" ? (
							<input
								value={form.value}
								onChange={(e) => update("value", e.target.value)}
								placeholder="np. Darmowy deser do wyboru"
								style={{
									width: "100%",
									padding: "10px 14px",
									borderRadius: 10,
									border: "1px solid rgba(31,26,21,0.12)",
									background: "#fff",
									fontFamily: "var(--fb-sans)",
									fontSize: 14,
									color: "var(--fb-ink)",
									outline: "none",
								}}
							/>
						) : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "baseline",
										gap: 2,
										padding: "10px 14px",
										borderRadius: 10,
										background: "#fff",
										border: "1px solid rgba(31,26,21,0.12)",
										width: 160,
									}}
								>
									<input
										value={form.value}
										onChange={(e) => update("value", e.target.value)}
										style={{
											border: "none",
											background: "transparent",
											outline: "none",
											fontFamily: "var(--fb-serif)",
											fontSize: 28,
											fontStyle: "italic",
											width: "100%",
											color: "var(--fb-ink)",
										}}
									/>
									<span
										style={{
											fontSize: 18,
											color: "rgba(31,26,21,0.55)",
										}}
									>
										{form.type === "percentage" ? "%" : "zł"}
									</span>
								</div>
								<input
									type="range"
									min={5}
									max={form.type === "fixed_amount" ? 50 : 40}
									step={5}
									value={numericValue}
									onChange={(e) => update("value", e.target.value)}
									style={{
										flex: 1,
										accentColor: "var(--fb-primary)",
									}}
								/>
							</div>
						)}
					</FormLabel>

					<FormLabel label="Wygasa po">
						<div style={{ display: "flex", gap: 8 }}>
							{[14, 30, 60, 90].map((d) => (
								<UnstyledButton
									key={d}
									onClick={() => update("expiresInDays", d)}
									style={{
										padding: "9px 16px",
										borderRadius: 10,
										background: form.expiresInDays === d ? "var(--fb-ink)" : "#fff",
										color: form.expiresInDays === d ? "var(--fb-cream)" : "var(--fb-ink)",
										border:
											form.expiresInDays === d ? "none" : "1px solid rgba(31,26,21,0.12)",
										fontSize: 13,
										fontFamily: "var(--fb-sans)",
									}}
								>
									{d} dni
								</UnstyledButton>
							))}
						</div>
					</FormLabel>

					<FormLabel label="Dzienny limit na gościa" hint="Zapobiega nadużyciom.">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 14,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									background: "#fff",
									border: "1px solid rgba(31,26,21,0.12)",
									borderRadius: 10,
									overflow: "hidden",
								}}
							>
								<button
									type="button"
									onClick={() =>
										update("dailyCap", Math.max(1, (form.dailyCap ?? 1) - 1))
									}
									style={{
										width: 34,
										height: 36,
										background: "transparent",
										border: "none",
										fontSize: 16,
										cursor: "pointer",
										color: "var(--fb-ink)",
									}}
								>
									−
								</button>
								<div
									style={{
										padding: "0 14px",
										fontFamily: "var(--fb-serif)",
										fontSize: 20,
										fontStyle: "italic",
										minWidth: 30,
										textAlign: "center",
									}}
								>
									{form.dailyCap ?? "∞"}
								</div>
								<button
									type="button"
									onClick={() =>
										update("dailyCap", (form.dailyCap ?? 0) + 1)
									}
									style={{
										width: 34,
										height: 36,
										background: "transparent",
										border: "none",
										fontSize: 16,
										cursor: "pointer",
										color: "var(--fb-ink)",
									}}
								>
									+
								</button>
							</div>
							<UnstyledButton
								onClick={() => update("dailyCap", form.dailyCap ? null : 3)}
								style={{
									fontSize: 12.5,
									color: "rgba(31,26,21,0.55)",
									textDecoration: "underline",
								}}
							>
								{form.dailyCap ? "Wyłącz limit" : "Włącz limit"}
							</UnstyledButton>
							<div
								style={{
									fontSize: 12.5,
									color: "rgba(31,26,21,0.55)",
								}}
							>
								kodów na urządzenie dziennie
							</div>
						</div>
					</FormLabel>

					<FormLabel label="Status">
						<UnstyledButton
							onClick={() => update("active", !form.active)}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								padding: "10px 14px",
								background: "#fff",
								border: "1px solid rgba(31,26,21,0.12)",
								borderRadius: 10,
								fontFamily: "var(--fb-sans)",
								fontSize: 13,
							}}
						>
							<div
								style={{
									width: 32,
									height: 18,
									borderRadius: 9,
									background: form.active
										? "var(--fb-olive)"
										: "rgba(31,26,21,0.15)",
									position: "relative",
									transition: "background 0.2s",
								}}
							>
								<div
									style={{
										position: "absolute",
										top: 2,
										left: form.active ? 16 : 2,
										width: 14,
										height: 14,
										borderRadius: "50%",
										background: "#fff",
										transition: "left 0.2s",
										boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
									}}
								/>
							</div>
							{form.active ? "Zbieramy opinie" : "Wstrzymane"}
						</UnstyledButton>
					</FormLabel>

					<div
						style={{
							display: "flex",
							gap: 10,
							paddingTop: 6,
						}}
					>
						<button
							type="button"
							disabled={mutation.isPending || !dirty}
							onClick={() => mutation.mutate()}
							style={{
								padding: "10px 20px",
								borderRadius: 10,
								background: "var(--fb-ink)",
								color: "var(--fb-cream)",
								border: "none",
								cursor: mutation.isPending || !dirty ? "not-allowed" : "pointer",
								opacity: mutation.isPending || !dirty ? 0.5 : 1,
								fontSize: 13,
								fontFamily: "var(--fb-sans)",
								fontWeight: 500,
							}}
						>
							{mutation.isPending ? "Zapisuję…" : "Zapisz zmiany"}
						</button>
						<button
							type="button"
							onClick={handleReset}
							disabled={!dirty}
							style={{
								padding: "10px 20px",
								borderRadius: 10,
								background: "transparent",
								color: "var(--fb-ink)",
								border: "0.5px solid rgba(31,26,21,0.2)",
								cursor: dirty ? "pointer" : "not-allowed",
								opacity: dirty ? 1 : 0.5,
								fontSize: 13,
								fontFamily: "var(--fb-sans)",
							}}
						>
							Resetuj
						</button>
					</div>
				</div>

				{/* Preview */}
				<div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 10,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							color: "rgba(31,26,21,0.5)",
							marginBottom: 10,
						}}
					>
						Gość widzi
					</div>
					<div
						style={{
							background: "var(--fb-ink)",
							color: "var(--fb-cream)",
							borderRadius: 16,
							padding: 20,
							position: "relative",
							boxShadow: "0 14px 30px -10px rgba(31,26,21,0.3)",
						}}
					>
						<div
							style={{
								fontFamily: "var(--fb-mono)",
								fontSize: 10,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								opacity: 0.55,
							}}
						>
							{venue.name}
						</div>
						<div
							style={{
								fontFamily: "var(--fb-serif)",
								fontSize: 36,
								lineHeight: 1,
								marginTop: 4,
								fontStyle: "italic",
								letterSpacing: "-0.02em",
							}}
						>
							{form.type === "percentage"
								? `${numericValue}% rabatu`
								: form.type === "fixed_amount"
									? `${numericValue} zł rabatu`
									: form.value || "Darmowy produkt"}
						</div>
						<div
							style={{
								fontFamily: "var(--fb-sans)",
								fontSize: 12,
								opacity: 0.7,
								marginTop: 2,
							}}
						>
							następna wizyta · na miejscu
						</div>
						<div
							style={{
								marginTop: 16,
								borderTop: "1px dashed rgba(251,247,239,0.25)",
								paddingTop: 12,
							}}
						>
							<div
								style={{
									fontFamily: "var(--fb-mono)",
									fontSize: 10,
									opacity: 0.5,
									letterSpacing: "0.06em",
								}}
							>
								KOD
							</div>
							<div
								style={{
									fontFamily: "var(--fb-mono)",
									fontSize: 22,
									letterSpacing: "0.12em",
									marginTop: 2,
								}}
							>
								XXXX-XXXX
							</div>
							<div
								style={{
									fontSize: 11,
									opacity: 0.55,
									marginTop: 6,
								}}
							>
								Ważny {form.expiresInDays} dni od wydania
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
