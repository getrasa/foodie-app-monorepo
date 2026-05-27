import { Migration } from '@mikro-orm/migrations';

export class Migration20260527093131 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "business" ("id" uuid not null, "ownerId" uuid not null, "name" varchar(255) not null, "logo" varchar(255) null, "onboardingCompletedAt" timestamptz null, "archivedAt" timestamptz null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "business_pkey" primary key ("id"));`);

    this.addSql(`create table "venue" ("id" uuid not null, "businessId" uuid not null, "name" varchar(255) not null, "address" varchar(255) null, "googlePlaceId" varchar(255) null, "googleMapsUrl" varchar(255) null, "archivedAt" timestamptz null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "venue_pkey" primary key ("id"));`);

    this.addSql(`create table "tag" ("id" uuid not null, "venueId" uuid not null, "label" varchar(255) not null, "sortOrder" int not null default 0, "archivedAt" timestamptz null, "createdAt" timestamptz not null, constraint "tag_pkey" primary key ("id"));`);

    this.addSql(`create table "rewardOffer" ("id" uuid not null, "venueId" uuid not null, "type" text check ("type" in ('percentage', 'fixed_amount', 'free_item')) not null, "value" varchar(255) not null, "expiresInDays" int null, "dailyCap" int null, "active" boolean not null default true, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "rewardOffer_pkey" primary key ("id"));`);
    this.addSql(`alter table "rewardOffer" add constraint "rewardOffer_venueId_unique" unique ("venueId");`);

    this.addSql(`create table "qrCode" ("id" varchar(255) not null, "venueId" uuid not null, "label" varchar(255) null, "active" boolean not null default true, "createdAt" timestamptz not null, constraint "qrCode_pkey" primary key ("id"));`);

    this.addSql(`create table "feedback" ("id" uuid not null, "venueId" uuid not null, "qrCodeId" varchar(255) null, "rating" int not null, "comment" varchar(255) null, "customerEmail" varchar(255) null, "deviceFingerprint" varchar(255) null, "localStorageToken" varchar(255) null, "ipAddress" varchar(255) null, "userAgent" varchar(255) null, "readAt" timestamptz null, "spamMarkedAt" timestamptz null, "archivedAt" timestamptz null, "createdAt" timestamptz not null, constraint "feedback_pkey" primary key ("id"));`);

    this.addSql(`create table "feedbackTag" ("feedbackId" uuid not null, "tagId" uuid not null, constraint "feedbackTag_pkey" primary key ("feedbackId", "tagId"));`);

    this.addSql(`create table "voucher" ("id" uuid not null, "code" varchar(255) not null, "venueId" uuid not null, "feedbackId" uuid not null, "qrCodeId" varchar(255) null, "type" text check ("type" in ('percentage', 'fixed_amount', 'free_item')) not null, "value" varchar(255) not null, "description" varchar(255) not null, "status" text check ("status" in ('active', 'redeemed', 'expired', 'voided')) not null default 'active', "expiresAt" timestamptz null, "redeemedAt" timestamptz null, "voidedAt" timestamptz null, "createdAt" timestamptz not null, constraint "voucher_pkey" primary key ("id"));`);
    this.addSql(`alter table "voucher" add constraint "voucher_code_unique" unique ("code");`);
    this.addSql(`alter table "voucher" add constraint "voucher_feedbackId_unique" unique ("feedbackId");`);

    this.addSql(`alter table "business" add constraint "business_ownerId_foreign" foreign key ("ownerId") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "venue" add constraint "venue_businessId_foreign" foreign key ("businessId") references "business" ("id") on update cascade;`);

    this.addSql(`alter table "tag" add constraint "tag_venueId_foreign" foreign key ("venueId") references "venue" ("id") on update cascade;`);

    this.addSql(`alter table "rewardOffer" add constraint "rewardOffer_venueId_foreign" foreign key ("venueId") references "venue" ("id") on update cascade;`);

    this.addSql(`alter table "qrCode" add constraint "qrCode_venueId_foreign" foreign key ("venueId") references "venue" ("id") on update cascade;`);

    this.addSql(`alter table "feedback" add constraint "feedback_venueId_foreign" foreign key ("venueId") references "venue" ("id") on update cascade;`);
    this.addSql(`alter table "feedback" add constraint "feedback_qrCodeId_foreign" foreign key ("qrCodeId") references "qrCode" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "feedbackTag" add constraint "feedbackTag_feedbackId_foreign" foreign key ("feedbackId") references "feedback" ("id") on update cascade;`);
    this.addSql(`alter table "feedbackTag" add constraint "feedbackTag_tagId_foreign" foreign key ("tagId") references "tag" ("id") on update cascade;`);

    this.addSql(`alter table "voucher" add constraint "voucher_venueId_foreign" foreign key ("venueId") references "venue" ("id") on update cascade;`);
    this.addSql(`alter table "voucher" add constraint "voucher_feedbackId_foreign" foreign key ("feedbackId") references "feedback" ("id") on update cascade;`);
    this.addSql(`alter table "voucher" add constraint "voucher_qrCodeId_foreign" foreign key ("qrCodeId") references "qrCode" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "venue" drop constraint "venue_businessId_foreign";`);

    this.addSql(`alter table "tag" drop constraint "tag_venueId_foreign";`);

    this.addSql(`alter table "rewardOffer" drop constraint "rewardOffer_venueId_foreign";`);

    this.addSql(`alter table "qrCode" drop constraint "qrCode_venueId_foreign";`);

    this.addSql(`alter table "feedback" drop constraint "feedback_venueId_foreign";`);

    this.addSql(`alter table "voucher" drop constraint "voucher_venueId_foreign";`);

    this.addSql(`alter table "feedbackTag" drop constraint "feedbackTag_tagId_foreign";`);

    this.addSql(`alter table "feedback" drop constraint "feedback_qrCodeId_foreign";`);

    this.addSql(`alter table "voucher" drop constraint "voucher_qrCodeId_foreign";`);

    this.addSql(`alter table "feedbackTag" drop constraint "feedbackTag_feedbackId_foreign";`);

    this.addSql(`alter table "voucher" drop constraint "voucher_feedbackId_foreign";`);

    this.addSql(`drop table if exists "business" cascade;`);

    this.addSql(`drop table if exists "venue" cascade;`);

    this.addSql(`drop table if exists "tag" cascade;`);

    this.addSql(`drop table if exists "rewardOffer" cascade;`);

    this.addSql(`drop table if exists "qrCode" cascade;`);

    this.addSql(`drop table if exists "feedback" cascade;`);

    this.addSql(`drop table if exists "feedbackTag" cascade;`);

    this.addSql(`drop table if exists "voucher" cascade;`);
  }

}
