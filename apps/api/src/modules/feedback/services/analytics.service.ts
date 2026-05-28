import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Feedback } from '../entities/feedback.entity';
import {
  computeEffectiveVoucherStatus,
  Voucher,
  VoucherStatus,
} from '../../voucher/entities/voucher.entity';
import { OwnershipService } from '../../venue/services/ownership.service';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export type RatingDistribution = Record<1 | 2 | 3 | 4 | 5, number>;

export interface RatingTrendBucket {
  date: string;
  avgRating: number;
  count: number;
}

export interface RedemptionRate {
  issued: number;
  redeemed: number;
  expired: number;
  voided: number;
  active: number;
  rate: number;
}

const DEFAULT_LOOKBACK_DAYS = 30;

// Public so it can be exposed via DTO. Returns the {from, to} actually used,
// with defaults applied. Both bounds are inclusive — the controller passes
// midnight-to-midnight ISO strings, so this stays predictable.
export const resolveRange = (range: DateRange): { from: Date; to: Date } => {
  const to = range.to ?? new Date();
  const from =
    range.from ??
    new Date(to.getTime() - DEFAULT_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  return { from, to };
};

const isoDate = (d: Date): string => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly em: EntityManager,
    private readonly ownership: OwnershipService,
  ) {}

  async ratingDistribution(
    venueId: string,
    userId: string,
    range: DateRange,
  ): Promise<RatingDistribution> {
    await this.ownership.assertVenueOwnership(venueId, userId);
    const { from, to } = resolveRange(range);

    const rows = await this.em.find(Feedback, {
      venue: { id: venueId },
      spamMarkedAt: null,
      createdAt: { $gte: from, $lte: to },
    });

    const out: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const f of rows) {
      const r = f.rating as 1 | 2 | 3 | 4 | 5;
      if (r >= 1 && r <= 5) out[r] += 1;
    }
    return out;
  }

  // Daily buckets in UTC. Buckets with zero feedback are returned with
  // avgRating=0, count=0 so the frontend can render a continuous sparkline
  // without having to fill gaps itself.
  async ratingTrend(
    venueId: string,
    userId: string,
    range: DateRange,
  ): Promise<RatingTrendBucket[]> {
    await this.ownership.assertVenueOwnership(venueId, userId);
    const { from, to } = resolveRange(range);

    const rows = await this.em.find(
      Feedback,
      {
        venue: { id: venueId },
        spamMarkedAt: null,
        createdAt: { $gte: from, $lte: to },
      },
      { orderBy: { createdAt: 'ASC' } },
    );

    const totals = new Map<string, { sum: number; count: number }>();
    for (const f of rows) {
      const key = isoDate(f.createdAt);
      const cur = totals.get(key) ?? { sum: 0, count: 0 };
      cur.sum += f.rating;
      cur.count += 1;
      totals.set(key, cur);
    }

    const buckets: RatingTrendBucket[] = [];
    const day = new Date(
      Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()),
    );
    const end = new Date(
      Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()),
    );
    while (day.getTime() <= end.getTime()) {
      const key = isoDate(day);
      const t = totals.get(key);
      buckets.push({
        date: key,
        avgRating: t ? round2(t.sum / t.count) : 0,
        count: t?.count ?? 0,
      });
      day.setUTCDate(day.getUTCDate() + 1);
    }
    return buckets;
  }

  async redemptionRate(
    venueId: string,
    userId: string,
    range: DateRange,
  ): Promise<RedemptionRate> {
    await this.ownership.assertVenueOwnership(venueId, userId);
    const { from, to } = resolveRange(range);

    const vouchers = await this.em.find(Voucher, {
      venue: { id: venueId },
      createdAt: { $gte: from, $lte: to },
    });

    let redeemed = 0;
    let expired = 0;
    let voided = 0;
    let active = 0;
    const now = new Date();
    for (const v of vouchers) {
      const effective = computeEffectiveVoucherStatus(v.status, v.expiresAt, now);
      if (effective === VoucherStatus.REDEEMED) redeemed += 1;
      else if (effective === VoucherStatus.EXPIRED) expired += 1;
      else if (effective === VoucherStatus.VOIDED) voided += 1;
      else if (effective === VoucherStatus.ACTIVE) active += 1;
    }
    const issued = vouchers.length;
    const rate = issued === 0 ? 0 : round2(redeemed / issued);
    return { issued, redeemed, expired, voided, active, rate };
  }
}

const round2 = (n: number): number => Math.round(n * 100) / 100;
