import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Venue } from './venue.entity';

@Entity({ tableName: 'tag' })
export class Tag {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => Venue, { fieldName: 'venueId' })
  venue!: Venue;

  @Property({ type: 'string' })
  label!: string;

  @Property({ type: 'number', default: 0 })
  sortOrder: number = 0;

  @Property({ type: 'datetime', nullable: true })
  archivedAt?: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();
}
