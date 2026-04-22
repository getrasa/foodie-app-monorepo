import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './user.entity';

@Entity({ tableName: 'session' })
export class Session {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => User, { fieldName: 'userId' })
  user!: User;

  @Property({ type: 'string' })
  @Unique()
  token!: string;

  @Property({ type: 'datetime' })
  expiresAt!: Date;

  @Property({ type: 'string', nullable: true })
  ipAddress?: string;

  @Property({ type: 'string', nullable: true })
  userAgent?: string;

  @Property({ type: 'string', nullable: true })
  impersonatedBy?: string;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
