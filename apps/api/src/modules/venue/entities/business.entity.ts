import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../../auth/entities/user.entity';
import type { Venue } from './venue.entity';

@Entity({ tableName: 'business' })
export class Business {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => User, { fieldName: 'ownerId' })
  owner!: User;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  logo?: string;

  @Property({ type: 'datetime', nullable: true })
  onboardingCompletedAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  archivedAt?: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany('Venue', 'business')
  venues = new Collection<Venue>(this);
}
