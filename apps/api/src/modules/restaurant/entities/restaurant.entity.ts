import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../../auth/entities/user.entity';
import type { DiscountConfig } from '../../discount/entities/discount-config.entity';

@Entity({ tableName: 'restaurant' })
export class Restaurant {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => User, { fieldName: 'ownerId' })
  owner!: User;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  logo?: string;

  @Property({ type: 'string', nullable: true })
  address?: string;

  @Property({ type: 'string', nullable: true })
  googlePlaceId?: string;

  @Property({ type: 'string', nullable: true })
  googleMapsUrl?: string;

  @OneToOne('DiscountConfig', 'restaurant', { nullable: true })
  discountConfig?: DiscountConfig;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
