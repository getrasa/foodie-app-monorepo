import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Venue } from './venue.entity';

// Opaque, short, URL-safe IDs (e.g. "qrc_a8f3b2c1") — embedded in the physical QR.
// See docs/adr/0004-opaque-qr-identity-via-qrcode-entity.md.
const QR_ID_PREFIX = 'qrc_';
const QR_ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const QR_ID_BODY_LENGTH = 10;

const generateQrCodeId = (): string => {
  let body = '';
  for (let i = 0; i < QR_ID_BODY_LENGTH; i += 1) {
    body += QR_ID_ALPHABET[Math.floor(Math.random() * QR_ID_ALPHABET.length)];
  }
  return QR_ID_PREFIX + body;
};

@Entity({ tableName: 'qrCode' })
export class QrCode {
  @PrimaryKey({ type: 'string' })
  id: string = generateQrCodeId();

  @ManyToOne(() => Venue, { fieldName: 'venueId' })
  venue!: Venue;

  @Property({ type: 'string', nullable: true })
  label?: string;

  @Property({ type: 'boolean', default: true })
  active: boolean = true;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();
}
