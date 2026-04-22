import { Migration } from '@mikro-orm/migrations';

export class Migration20260422073939 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "emailVerified" boolean not null default false, "image" varchar(255) null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, "role" varchar(255) null default 'user', "banned" boolean null default false, "banReason" varchar(255) null, "banExpires" timestamptz null, constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "session" ("id" uuid not null, "userId" uuid not null, "token" varchar(255) not null, "expiresAt" timestamptz not null, "ipAddress" varchar(255) null, "userAgent" varchar(255) null, "impersonatedBy" varchar(255) null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "session_pkey" primary key ("id"));`);
    this.addSql(`alter table "session" add constraint "session_token_unique" unique ("token");`);

    this.addSql(`create table "account" ("id" uuid not null, "userId" uuid not null, "accountId" varchar(255) not null, "providerId" varchar(255) not null, "accessToken" varchar(255) null, "refreshToken" varchar(255) null, "accessTokenExpiresAt" timestamptz null, "refreshTokenExpiresAt" timestamptz null, "scope" varchar(255) null, "idToken" varchar(255) null, "password" varchar(255) null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "account_pkey" primary key ("id"));`);

    this.addSql(`create table "verification" ("id" uuid not null, "identifier" varchar(255) not null, "value" varchar(255) not null, "expiresAt" timestamptz not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "verification_pkey" primary key ("id"));`);

    this.addSql(`alter table "session" add constraint "session_userId_foreign" foreign key ("userId") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "account" add constraint "account_userId_foreign" foreign key ("userId") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "session" drop constraint "session_userId_foreign";`);

    this.addSql(`alter table "account" drop constraint "account_userId_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "session" cascade;`);

    this.addSql(`drop table if exists "account" cascade;`);

    this.addSql(`drop table if exists "verification" cascade;`);
  }

}
