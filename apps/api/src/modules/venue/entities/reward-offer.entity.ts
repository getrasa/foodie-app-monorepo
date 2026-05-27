import {
  Entity,
  Enum,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Venue } from './venue.entity';

export enum RewardType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_ITEM = 'free_item',
}

@Entity({ tableName: 'rewardOffer' })
export class RewardOffer {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @OneToOne(() => Venue, (v) => v.rewardOffer, {
    fieldName: 'venueId',
    owner: true,
  })
  venue!: Venue;

  @Enum(() => RewardType)
  type!: RewardType;

  @Property({ type: 'string' })
  value!: string;

  @Property({ type: 'number', nullable: true })
  expiresInDays?: number;

  @Property({ type: 'number', nullable: true })
  dailyCap?: number;

  @Property({ type: 'boolean', default: true })
  active: boolean = true;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
