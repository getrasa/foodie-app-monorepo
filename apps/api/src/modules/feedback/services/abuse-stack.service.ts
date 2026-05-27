import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Feedback } from '../entities/feedback.entity';
import { Voucher } from '../../voucher/entities/voucher.entity';

// Layered abuse model per docs/adr/0002. All signals are cheap and silent —
// the diner never sees an error message, only the natural outcomes:
//   - daily-cap hit: feedback recorded, voucher withheld
//   - IP soft-alarm (>5/min at the same Venue): logged warning, otherwise pass
//   - IP hard-block (>100/h at the same Venue): request rejected as 429
// IP volumes are intentionally generous because shared Wi-Fi at a busy venue
// produces high legitimate volume from one egress IP (mall, hotel, restaurant).
//
// No DB-level uniqueness constraints exist on customer identifiers — fingerprints
// and IPs are too noisy to constrain at the schema layer.

const SOFT_IP_WINDOW_MS = 60 * 1000;
const SOFT_IP_THRESHOLD = 5;
const HARD_IP_WINDOW_MS = 60 * 60 * 1000;
const HARD_IP_THRESHOLD = 100;
const COOLDOWN_WINDOW_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class AbuseStackService {
  private readonly logger = new Logger(AbuseStackService.name);

  constructor(private readonly em: EntityManager) {}

  async checkIpHardBlock(venueId: string, ipAddress: string | null): Promise<boolean> {
    if (!ipAddress) return false;
    const since = new Date(Date.now() - HARD_IP_WINDOW_MS);
    const count = await this.em.count(Feedback, {
      venue: { id: venueId },
      ipAddress,
      createdAt: { $gte: since },
    });
    return count >= HARD_IP_THRESHOLD;
  }

  async checkIpSoftAlarm(venueId: string, ipAddress: string | null): Promise<void> {
    if (!ipAddress) return;
    const since = new Date(Date.now() - SOFT_IP_WINDOW_MS);
    const count = await this.em.count(Feedback, {
      venue: { id: venueId },
      ipAddress,
      createdAt: { $gte: since },
    });
    if (count >= SOFT_IP_THRESHOLD) {
      this.logger.warn(
        `IP soft-alarm: venue=${venueId} ip=${ipAddress} count=${count} window=${SOFT_IP_WINDOW_MS}ms`,
      );
    }
  }

  async isDailyCapReached(
    venueId: string,
    deviceFingerprint: string | null,
    dailyCap: number | null | undefined,
  ): Promise<boolean> {
    if (dailyCap == null || dailyCap <= 0) return false;
    if (!deviceFingerprint) return false;
    const since = new Date(Date.now() - COOLDOWN_WINDOW_MS);
    const count = await this.em.count(Voucher, {
      venue: { id: venueId },
      feedback: { deviceFingerprint },
      createdAt: { $gte: since },
    });
    return count >= dailyCap;
  }
}
