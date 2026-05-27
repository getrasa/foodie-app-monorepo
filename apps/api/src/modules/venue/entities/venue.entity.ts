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
import { Business } from './business.entity';
import type { RewardOffer } from './reward-offer.entity';
import type { QrCode } from './qr-code.entity';
import type { Tag } from './tag.entity';

@Entity({ tableName: 'venue' })
export class Venue {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => Business, { fieldName: 'businessId' })
  business!: Business;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  address?: string;

  @Property({ type: 'string', nullable: true })
  googlePlaceId?: string;

  @Property({ type: 'string', nullable: true })
  googleMapsUrl?: string;

  @Property({ type: 'datetime', nullable: true })
  archivedAt?: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToOne('RewardOffer', 'venue', { nullable: true })
  rewardOffer?: RewardOffer;

  @OneToMany('QrCode', 'venue')
  qrCodes = new Collection<QrCode>(this);

  @OneToMany('Tag', 'venue')
  tags = new Collection<Tag>(this);
}
