import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import type { DiscountCode } from '../../discount/entities/discount-code.entity';

@Entity({ tableName: 'review' })
@Unique({ properties: ['restaurant', 'reviewerEmail'] })
export class Review {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => Restaurant, { fieldName: 'restaurantId' })
  restaurant!: Restaurant;

  @Property({ type: 'number' })
  rating!: number;

  @Property({ type: 'string', nullable: true })
  comment?: string;

  @Property({ type: 'string' })
  reviewerName!: string;

  @Property({ type: 'string' })
  reviewerEmail!: string;

  @Property({ type: 'string', nullable: true })
  deviceFingerprint?: string;

  @Property({ type: 'string', nullable: true })
  ipAddress?: string;

  @OneToOne('DiscountCode', 'review', { nullable: true })
  discountCode?: DiscountCode;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();
}
