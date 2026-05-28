import {
  Entity,
  Enum,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Venue } from '../../venue/entities/venue.entity';
import { QrCode } from '../../venue/entities/qr-code.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { RewardType } from '../../venue/entities/reward-offer.entity';

export enum VoucherStatus {
  ACTIVE = 'active',
  REDEEMED = 'redeemed',
  EXPIRED = 'expired',
  VOIDED = 'voided',
}

// An ACTIVE voucher past its expiresAt is effectively EXPIRED — the nightly
// sweep transitions the stored status, but callers should not depend on that
// timing. Use this everywhere a voucher's status is read for a decision or a
// response, so the redeem path and the lookup path agree.
export const computeEffectiveVoucherStatus = (
  status: VoucherStatus,
  expiresAt: Date | null | undefined,
  now: Date = new Date(),
): VoucherStatus =>
  status === VoucherStatus.ACTIVE && expiresAt && expiresAt <= now
    ? VoucherStatus.EXPIRED
    : status;

@Entity({ tableName: 'voucher' })
export class Voucher {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'string' })
  @Unique()
  code!: string;

  @ManyToOne(() => Venue, { fieldName: 'venueId' })
  venue!: Venue;

  @OneToOne(() => Feedback, (f) => f.voucher, {
    fieldName: 'feedbackId',
    owner: true,
  })
  feedback!: Feedback;

  @ManyToOne(() => QrCode, { fieldName: 'qrCodeId', nullable: true })
  qrCode?: QrCode;

  @Enum(() => RewardType)
  type!: RewardType;

  @Property({ type: 'string' })
  value!: string;

  @Property({ type: 'string' })
  description!: string;

  @Enum(() => VoucherStatus)
  status: VoucherStatus = VoucherStatus.ACTIVE;

  @Property({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  redeemedAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  voidedAt?: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();
}
