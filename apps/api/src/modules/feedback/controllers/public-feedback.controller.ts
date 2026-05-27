import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { FeedbackSubmissionService } from '../services/feedback-submission.service';
import {
  toResolveQrResponse,
  type ResolveQrResponse,
} from '../dto/resolve-qr.dto';
import {
  toSubmitFeedbackResponse,
  type SubmitFeedbackBody,
  type SubmitFeedbackResponse,
} from '../dto/submit-feedback.dto';

const FINGERPRINT_HEADER = 'x-device-fingerprint';
const LOCAL_STORAGE_HEADER = 'x-localstorage-token';

const firstString = (value: string | string[] | undefined): string | null => {
  if (!value) return null;
  if (Array.isArray(value)) return value[0]?.trim() || null;
  return value.trim() || null;
};

const clientIp = (req: Request): string | null => {
  const forwarded = req.headers['x-forwarded-for'];
  const fwd = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.ip ?? req.socket?.remoteAddress ?? null;
};

@Controller('q')
export class PublicFeedbackController {
  constructor(private readonly submission: FeedbackSubmissionService) {}

  @Get(':qrCodeId/resolve')
  async resolve(@Param('qrCodeId') qrCodeId: string): Promise<ResolveQrResponse> {
    const { qrCode, offer } = await this.submission.resolveQr(qrCodeId);
    return toResolveQrResponse(qrCode, offer);
  }

  @Post(':qrCodeId/feedback')
  async submit(
    @Param('qrCodeId') qrCodeId: string,
    @Body() body: SubmitFeedbackBody,
    @Req() req: Request,
  ): Promise<SubmitFeedbackResponse> {
    const deviceFingerprint = firstString(req.headers[FINGERPRINT_HEADER]);
    const localStorageToken = firstString(req.headers[LOCAL_STORAGE_HEADER]);
    const userAgent = firstString(req.headers['user-agent']);
    const ipAddress = clientIp(req);

    const outcome = await this.submission.submit({
      qrCodeId,
      body,
      deviceFingerprint,
      localStorageToken,
      ipAddress,
      userAgent,
    });
    return toSubmitFeedbackResponse(
      outcome.feedback,
      outcome.voucher,
      outcome.voucherUnavailableReason,
    );
  }
}
