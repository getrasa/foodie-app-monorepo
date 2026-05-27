import { Business } from '../entities/business.entity';
import { Venue } from '../entities/venue.entity';

export interface BusinessResponse {
  id: string;
  name: string;
  logo: string | null;
  onboardingCompletedAt: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  venues?: VenueSummary[];
}

export interface VenueSummary {
  id: string;
  name: string;
  address: string | null;
  googlePlaceId: string | null;
  googleMapsUrl: string | null;
  archivedAt: string | null;
}

export const toBusinessResponse = (
  business: Business,
  venues?: Venue[],
): BusinessResponse => ({
  id: business.id,
  name: business.name,
  logo: business.logo ?? null,
  onboardingCompletedAt: business.onboardingCompletedAt?.toISOString() ?? null,
  archivedAt: business.archivedAt?.toISOString() ?? null,
  createdAt: business.createdAt.toISOString(),
  updatedAt: business.updatedAt.toISOString(),
  venues: venues?.map(toVenueSummary),
});

export const toVenueSummary = (venue: Venue): VenueSummary => ({
  id: venue.id,
  name: venue.name,
  address: venue.address ?? null,
  googlePlaceId: venue.googlePlaceId ?? null,
  googleMapsUrl: venue.googleMapsUrl ?? null,
  archivedAt: venue.archivedAt?.toISOString() ?? null,
});
