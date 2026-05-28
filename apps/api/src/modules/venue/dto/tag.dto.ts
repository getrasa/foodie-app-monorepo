import { Tag } from '../entities/tag.entity';

export interface TagResponse {
  id: string;
  venueId: string;
  label: string;
  sortOrder: number;
  archivedAt: string | null;
  createdAt: string;
}

export const toTagResponse = (tag: Tag): TagResponse => ({
  id: tag.id,
  venueId: tag.venue.id,
  label: tag.label,
  sortOrder: tag.sortOrder,
  archivedAt: tag.archivedAt?.toISOString() ?? null,
  createdAt: tag.createdAt.toISOString(),
});
