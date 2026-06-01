import { useMyBusiness } from "#/lib/api/use-my-business";
import { AccountSettings } from "./components/account-settings";
import { RestaurantProfileForm } from "./components/restaurant-profile-form";
import { TagManager } from "./components/tag-manager";

const SectionCard = ({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
}) => (
	<div
		style={{
			background: "var(--fb-cream)",
			border: "0.5px solid rgba(31,26,21,0.1)",
			borderRadius: 16,
			padding: 22,
		}}
	>
		<div
			style={{
				fontFamily: "var(--fb-serif)",
				fontSize: 20,
				fontStyle: "italic",
				letterSpacing: "-0.01em",
				color: "var(--fb-ink)",
			}}
		>
			{title}
		</div>
		{subtitle && (
			<div
				style={{
					fontSize: 12.5,
					color: "rgba(31,26,21,0.55)",
					marginTop: 4,
					lineHeight: 1.5,
				}}
			>
				{subtitle}
			</div>
		)}
		<div style={{ marginTop: 18 }}>{children}</div>
	</div>
);

export const SettingsPage = () => {
	const businessQuery = useMyBusiness();
	const venue = businessQuery.data?.venues?.[0];

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
				Ustawienia
			</div>
			<div
				style={{
					fontSize: 13,
					color: "rgba(31,26,21,0.55)",
					marginTop: 4,
				}}
			>
				Profil restauracji, tagi opinii i ustawienia konta.
			</div>

			<div
				style={{
					marginTop: 24,
					display: "flex",
					flexDirection: "column",
					gap: 18,
					maxWidth: 720,
				}}
			>
				<SectionCard
					title="Profil restauracji"
					subtitle="Te dane widzą goście na ekranie opinii oraz na voucherze."
				>
					<RestaurantProfileForm />
				</SectionCard>

				<SectionCard
					title="Tagi opinii"
					subtitle="Krótkie etykiety, które gość może wybrać przy ocenie zamiast pisać komentarz."
				>
					{venue ? (
						<TagManager venueId={venue.id} />
					) : (
						<div
							style={{
								fontSize: 13,
								color: "rgba(31,26,21,0.55)",
							}}
						>
							Najpierw skonfiguruj swoją restaurację, by zarządzać tagami.
						</div>
					)}
				</SectionCard>

				<SectionCard title="Konto" subtitle="E-mail logowania i hasło.">
					<AccountSettings />
				</SectionCard>
			</div>
		</div>
	);
};
