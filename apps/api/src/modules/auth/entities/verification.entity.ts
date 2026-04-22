import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'verification' })
export class Verification {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ type: 'string' })
  identifier!: string;

  @Property({ type: 'string' })
  value!: string;

  @Property({ type: 'datetime' })
  expiresAt!: Date;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
