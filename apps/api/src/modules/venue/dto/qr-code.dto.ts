import { QrCode } from '../entities/qr-code.entity';

export interface QrCodeResponse {
  id: string;
  venueId: string;
  label: string | null;
  active: boolean;
  createdAt: string;
}

export const toQrCodeResponse = (qrCode: QrCode): QrCodeResponse => ({
  id: qrCode.id,
  venueId: qrCode.venue.id,
  label: qrCode.label ?? null,
  active: qrCode.active,
  createdAt: qrCode.createdAt.toISOString(),
});
