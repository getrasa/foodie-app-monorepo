import { Alert, Center, Loader } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
	MY_BUSINESS_QUERY_KEY,
	useMyBusiness,
} from "#/lib/api/use-my-business";
import { venueApi, type VenueSummary } from "#/lib/api/venue-api";
import {
	brandInputStyle,
	brandPrimaryButtonStyle,
	brandSecondaryButtonStyle,
} from "./brand-styles";
import { FormLabel } from "./form-label";

interface FormState {
	name: string;
	address: string;
	googleMapsUrl: string;
}

const EMPTY_STATE: FormState = { name: "", address: "", googleMapsUrl: "" };

const toFormState = (venue: VenueSummary): FormState => ({
	name: venue.name,
	address: venue.address ?? "",
	googleMapsUrl: venue.googleMapsUrl ?? "",
});

export const RestaurantProfileForm = () => {
	const queryClient = useQueryClient();
	const businessQuery = useMyBusiness();
	const business = businessQuery.data;
	const venue = business?.venues?.[0];

	const [form, setForm] = useState<FormState>(EMPTY_STATE);
	const [snapshot, setSnapshot] = useState<FormState>(EMPTY_STATE);
	const [banner, setBanner] = useState<{ kind: "success" | "error"; text: string } | null>(null);
	const [nameError, setNameError] = useState<string | null>(null);
	const hydratedRef = useRef(false);

	// Seed the form once the venue arrives. Don't re-seed on background refetches
	// — that would clobber user edits. Successful saves reset the snapshot
	// explicitly in onSuccess below.
	useEffect(() => {
		if (!venue || hydratedRef.current) return;
		const initial = toFormState(venue);
		setForm(initial);
		setSnapshot(initial);
		hydratedRef.current = true;
	}, [venue]);

	const dirty =
		form.name !== snapshot.name ||
		form.address !== snapshot.address ||
		form.googleMapsUrl !== snapshot.googleMapsUrl;

	const mutation = useMutation({
		mutationFn: async () => {
			if (!business || !venue) throw new Error("Brak danych restauracji");
			const trimmedName = form.name.trim();
			const address = form.address.trim() || null;
			const googleMapsUrl = form.googleMapsUrl.trim() || null;

			await Promise.all([
				business.name !== trimmedName
					? venueApi.updateBusiness(business.id, { name: trimmedName })
					: null,
				venueApi.updateVenue(venue.id, {
					name: trimmedName,
					address,
					googleMapsUrl,
				}),
			]);

			return { name: trimmedName, address: address ?? "", googleMapsUrl: googleMapsUrl ?? "" };
		},
		onSuccess: async (saved) => {
			setBanner({ kind: "success", text: "Profil restauracji zapisany" });
			setForm(saved);
			setSnapshot(saved);
			await queryClient.invalidateQueries({ queryKey: MY_BUSINESS_QUERY_KEY });
		},
		onError: (err: Error) => {
			setBanner({ kind: "error", text: err.message });
		},
	});

	const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		if (key === "name") setNameError(null);
		setBanner(null);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!dirty || mutation.isPending) return;
		if (form.name.trim().length < 2) {
			setNameError("Nazwa restauracji musi mieć co najmniej 2 znaki");
			return;
		}
		mutation.mutate();
	};

	const handleReset = () => {
		setForm(snapshot);
		setNameError(null);
		setBanner(null);
	};

	if (businessQuery.isPending) {
		return (
			<Center py="lg">
				<Loader color="var(--fb-primary)" size="sm" />
			</Center>
		);
	}

	if (!venue) {
		return (
			<Alert color="yellow" variant="light">
				Najpierw przejdź przez konfigurację swojej restauracji.
			</Alert>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
				{banner && (
					<Alert
						color={banner.kind === "success" ? "olive" : "red"}
						variant="light"
					>
						{banner.text}
					</Alert>
				)}

				<FormLabel label="Nazwa restauracji">
					<input
						value={form.name}
						onChange={(e) => update("name", e.target.value)}
						placeholder="np. Trattoria u Mario"
						style={brandInputStyle(!!nameError)}
					/>
					{nameError && (
						<div
							style={{
								fontSize: 12,
								color: "var(--fb-primary)",
								marginTop: 6,
							}}
						>
							{nameError}
						</div>
					)}
				</FormLabel>

				<FormLabel label="Adres">
					<textarea
						value={form.address}
						onChange={(e) => update("address", e.target.value)}
						placeholder="ul. Główna 123, Miasto"
						rows={2}
						style={{
							...brandInputStyle(false),
							resize: "vertical",
							minHeight: 64,
						}}
					/>
				</FormLabel>

				<FormLabel
					label="Link do Google Maps"
					hint="Kierujemy zadowolonych gości do wystawienia opinii w Google"
				>
					<input
						value={form.googleMapsUrl}
						onChange={(e) => update("googleMapsUrl", e.target.value)}
						placeholder="https://maps.google.com/…"
						style={brandInputStyle(false)}
					/>
				</FormLabel>

				<div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
					<button
						type="submit"
						disabled={!dirty || mutation.isPending}
						style={brandPrimaryButtonStyle(!dirty || mutation.isPending)}
					>
						{mutation.isPending ? "Zapisuję…" : "Zapisz profil"}
					</button>
					<button
						type="button"
						onClick={handleReset}
						disabled={!dirty || mutation.isPending}
						style={brandSecondaryButtonStyle(!dirty || mutation.isPending)}
					>
						Resetuj
					</button>
				</div>
			</div>
		</form>
	);
};
