import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Venue } from '../../venue/entities/venue.entity';
import { QrCode } from '../../venue/entities/qr-code.entity';
import type { Voucher } from '../../voucher/entities/voucher.entity';
import type { FeedbackTag } from './feedback-tag.entity';

@Entity({ tableName: 'feedback' })
export class Feedback {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => Venue, { fieldName: 'venueId' })
  venue!: Venue;

  @ManyToOne(() => QrCode, { fieldName: 'qrCodeId', nullable: true })
  qrCode?: QrCode;

  @Property({ type: 'number' })
  rating!: number;

  @Property({ type: 'string', nullable: true })
  comment?: string;

  @Property({ type: 'string', nullable: true })
  customerEmail?: string;

  @Property({ type: 'string', nullable: true })
  deviceFingerprint?: string;

  @Property({ type: 'string', nullable: true })
  localStorageToken?: string;

  @Property({ type: 'string', nullable: true })
  ipAddress?: string;

  @Property({ type: 'string', nullable: true })
  userAgent?: string;

  @Property({ type: 'datetime', nullable: true })
  readAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  spamMarkedAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  archivedAt?: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @OneToOne('Voucher', 'feedback', { nullable: true })
  voucher?: Voucher;

  @OneToMany('FeedbackTag', 'feedback')
  feedbackTags = new Collection<FeedbackTag>(this);
}
