import { Center, Container, Loader, Stepper, Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ApiError } from "#/lib/api-client";
import { venueApi } from "#/lib/api/venue-api";
import {
	MY_BUSINESS_QUERY_KEY,
	useMyBusiness,
} from "#/lib/api/use-my-business";
import {
	StepDiscountConfig,
	type DiscountConfigValues,
} from "./components/step-discount-config";
import { StepQrDownload } from "./components/step-qr-download";
import {
	StepRestaurantProfile,
	type RestaurantProfileValues,
} from "./components/step-restaurant-profile";

const normalizeNumberInput = (value: number | ""): number | null =>
	value === "" || value == null ? null : Number(value);

export const OnboardingPage = () => {
	const queryClient = useQueryClient();
	const businessQuery = useMyBusiness();
	const business = businessQuery.data;
	const venue = business?.venues?.[0];

	const rewardOfferQuery = useQuery({
		queryKey: ["reward-offer", venue?.id ?? null],
		queryFn: () => venueApi.getRewardOffer(venue!.id),
		enabled: !!venue?.id,
	});

	const qrCodesQuery = useQuery({
		queryKey: ["qr-codes", venue?.id ?? null],
		queryFn: () => venueApi.listQrCodes(venue!.id),
		enabled: !!venue?.id,
	});

	const [active, setActive] = useState(0);
	const [profileError, setProfileError] = useState<string | null>(null);
	const [offerError, setOfferError] = useState<string | null>(null);
	const [finishError, setFinishError] = useState<string | null>(null);

	// Resume-where-you-left-off: derive the right step from what already exists.
	useEffect(() => {
		if (businessQuery.isPending) return;
		if (!business) {
			setActive(0);
			return;
		}
		if (rewardOfferQuery.isPending) return;
		if (!rewardOfferQuery.data) {
			setActive(1);
			return;
		}
		setActive(2);
	}, [
		businessQuery.isPending,
		business,
		rewardOfferQuery.isPending,
		rewardOfferQuery.data,
	]);

	const profileMutation = useMutation({
		mutationFn: async (values: RestaurantProfileValues) => {
			const trimmedName = values.name.trim();
			const address = values.address.trim() || null;
			const googleMapsUrl = values.googleMapsUrl.trim() || null;

			if (!business || !venue) {
				const created = await venueApi.createBusiness({ name: trimmedName });
				const newVenue = created.venues?.[0];
				if (newVenue && (address || googleMapsUrl)) {
					await venueApi.updateVenue(newVenue.id, { address, googleMapsUrl });
				}
				return;
			}

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
		},
		onSuccess: async () => {
			setProfileError(null);
			await queryClient.invalidateQueries({ queryKey: MY_BUSINESS_QUERY_KEY });
			setActive(1);
		},
		onError: (err: Error) => {
			setProfileError(err.message);
		},
	});

	const offerMutation = useMutation({
		mutationFn: async (values: DiscountConfigValues) => {
			if (!venue) throw new Error("Brak lokalu — wróć do kroku 1");
			return venueApi.upsertRewardOffer(venue.id, {
				type: values.type,
				value: values.value.trim(),
				expiresInDays: normalizeNumberInput(values.expiresInDays),
				dailyCap: normalizeNumberInput(values.dailyCap),
				active: values.active,
			});
		},
		onSuccess: async () => {
			setOfferError(null);
			if (!venue) return;
			await queryClient.invalidateQueries({
				queryKey: ["reward-offer", venue.id],
			});
			setActive(2);
		},
		onError: (err: Error) => {
			setOfferError(err.message);
		},
	});

	const completeMutation = useMutation({
		mutationFn: async () => {
			if (!business) throw new Error("Brak firmy do oznaczenia jako gotowej");
			if (business.onboardingCompletedAt) return business;
			return venueApi.completeOnboarding(business.id);
		},
		onSuccess: async () => {
			setFinishError(null);
			await queryClient.invalidateQueries({ queryKey: MY_BUSINESS_QUERY_KEY });
		},
		onError: (err: Error) => {
			setFinishError(err.message);
		},
	});

	if (businessQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (businessQuery.isError && !(businessQuery.error instanceof ApiError)) {
		return (
			<Container size="sm" py="xl">
				<Title order={3} c="red">
					Nie udało się załadować danych
				</Title>
			</Container>
		);
	}

	const profileInitial: RestaurantProfileValues = {
		name: venue?.name ?? business?.name ?? "",
		address: venue?.address ?? "",
		googleMapsUrl: venue?.googleMapsUrl ?? "",
	};

	const offerInitial: DiscountConfigValues | undefined = rewardOfferQuery.data
		? {
				type: rewardOfferQuery.data.type,
				value: rewardOfferQuery.data.value,
				expiresInDays: rewardOfferQuery.data.expiresInDays ?? "",
				dailyCap: rewardOfferQuery.data.dailyCap ?? "",
				active: rewardOfferQuery.data.active,
			}
		: undefined;

	const firstQrCode = qrCodesQuery.data?.[0];

	const canSelectStep = (target: number): boolean => {
		if (target === 0) return true;
		if (target === 1) return !!business;
		if (target === 2) return !!business && !!rewardOfferQuery.data;
		return false;
	};

	return (
		<Container size="sm" py="xl">
			<Title order={2} mb="xl">
				Skonfiguruj swoją restaurację
			</Title>

			<Stepper
				active={active}
				onStepClick={(target) => {
					if (canSelectStep(target)) setActive(target);
				}}
				allowNextStepsSelect={false}
			>
				<Stepper.Step label="Restauracja" description="Twój profil">
					<StepRestaurantProfile
						initialValues={profileInitial}
						submitting={profileMutation.isPending}
						error={profileError}
						onNext={(values) => profileMutation.mutate(values)}
					/>
				</Stepper.Step>

				<Stepper.Step label="Rabat" description="Skonfiguruj ofertę">
					<StepDiscountConfig
						initialValues={offerInitial}
						submitting={offerMutation.isPending}
						error={offerError}
						onNext={(values) => offerMutation.mutate(values)}
						onBack={() => setActive(0)}
					/>
				</Stepper.Step>

				<Stepper.Step label="Kod QR" description="Pobierz i udostępnij">
					<StepQrDownload
						qrCodeId={firstQrCode?.id}
						completing={completeMutation.isPending}
						error={finishError}
						onFinish={async () => {
							await completeMutation.mutateAsync();
						}}
					/>
				</Stepper.Step>
			</Stepper>
		</Container>
	);
};
