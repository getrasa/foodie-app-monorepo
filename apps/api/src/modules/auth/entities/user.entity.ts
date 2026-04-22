import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { Account } from './account.entity';
import type { Session } from './session.entity';

@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  email!: string;

  @Property({ type: 'boolean', default: false })
  emailVerified: boolean = false;

  @Property({ type: 'string', nullable: true })
  image?: string;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: 'string', default: 'user', nullable: true })
  role?: string = 'user';

  @Property({ type: 'boolean', default: false, nullable: true })
  banned?: boolean = false;

  @Property({ type: 'string', nullable: true })
  banReason?: string;

  @Property({ type: 'datetime', nullable: true })
  banExpires?: Date;

  @OneToMany('Session', 'user')
  sessions = new Collection<Session>(this);

  @OneToMany('Account', 'user')
  accounts = new Collection<Account>(this);
}
