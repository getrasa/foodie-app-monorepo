import {
  Entity,
  Enum,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_ITEM = 'free_item',
}

@Entity({ tableName: 'discountConfig' })
export class DiscountConfig {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @OneToOne(() => Restaurant, (r) => r.discountConfig, {
    fieldName: 'restaurantId',
    owner: true,
  })
  restaurant!: Restaurant;

  @Enum(() => DiscountType)
  type!: DiscountType;

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
