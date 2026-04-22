import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './user.entity';

@Entity({ tableName: 'account' })
export class Account {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => User, { fieldName: 'userId' })
  user!: User;

  @Property({ type: 'string' })
  accountId!: string;

  @Property({ type: 'string' })
  providerId!: string;

  @Property({ type: 'string', nullable: true })
  accessToken?: string;

  @Property({ type: 'string', nullable: true })
  refreshToken?: string;

  @Property({ type: 'datetime', nullable: true })
  accessTokenExpiresAt?: Date;

  @Property({ type: 'datetime', nullable: true })
  refreshTokenExpiresAt?: Date;

  @Property({ type: 'string', nullable: true })
  scope?: string;

  @Property({ type: 'string', nullable: true })
  idToken?: string;

  @Property({ type: 'string', nullable: true })
  password?: string;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
