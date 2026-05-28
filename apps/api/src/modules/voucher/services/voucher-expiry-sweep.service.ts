import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Voucher, VoucherStatus } from '../entities/voucher.entity';

const ONE_HOUR_MS = 60 * 60 * 1000;
const ONE_DAY_MS = 24 * ONE_HOUR_MS;

// Minimal scheduler: runs the expiry sweep at boot (catches any backlog from
// downtime) and then once every 24 hours. A heavier job framework would be
// overkill for a single nightly task.
@Injectable()
export class VoucherExpirySweepService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(VoucherExpirySweepService.name);
  private timer: NodeJS.Timeout | null = null;

  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap(): Promise<void> {
    // Run once immediately so a freshly started instance settles any backlog.
    await this.runSafely();
    this.timer = setInterval(() => {
      void this.runSafely();
    }, ONE_DAY_MS);
    // Don't keep the event loop alive just for the sweep.
    this.timer.unref?.();
  }

  onApplicationShutdown(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // Exposed so a future admin endpoint or a script could trigger a sweep
  // out-of-band; the daily timer is the only caller in MVP.
  async sweep(): Promise<number> {
    const em = this.orm.em.fork();
    const updated = await em.nativeUpdate(
      Voucher,
      {
        status: VoucherStatus.ACTIVE,
        expiresAt: { $lt: new Date() },
      },
      {
        status: VoucherStatus.EXPIRED,
      },
    );
    return updated;
  }

  private async runSafely(): Promise<void> {
    try {
      const count = await this.sweep();
      if (count > 0) {
        this.logger.log(
          `Voucher expiry sweep: marked ${count} voucher(s) as expired`,
        );
      }
    } catch (err) {
      this.logger.error('Voucher expiry sweep failed', err as Error);
    }
  }
}
