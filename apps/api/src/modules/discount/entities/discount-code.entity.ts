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
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Review } from '../../review/entities/review.entity';

export enum DiscountCodeStatus {
  ACTIVE = 'active',
  REDEEMED = 'redeemed',
  EXPIRED = 'expired',
}

@Entity({ tableName: 'discountCode' })
export class DiscountCode {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'string' })
  @Unique()
  code!: string;

  @ManyToOne(() => Restaurant, { fieldName: 'restaurantId' })
  restaurant!: Restaurant;

  @OneToOne(() => Review, (r) => r.discountCode, {
    fieldName: 'reviewId',
    owner: true,
  })
  review!: Review;

  @Enum(() => DiscountCodeStatus)
  status: DiscountCodeStatus = DiscountCodeStatus.ACTIVE;

  @Property({ type: 'string' })
  discountDescription!: string;

  @Property({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  redeemedAt?: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();
}
