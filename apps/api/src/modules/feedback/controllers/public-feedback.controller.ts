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

@Controller('q')
export class PublicFeedbackController {
  constructor(private readonly submission: FeedbackSubmissionService) {}

  @Get(':qrCodeId/resolve')
  async resolve(@Param('qrCodeId') qrCodeId: string): Promise<ResolveQrResponse> {
    const { qrCode, offer, tags } = await this.submission.resolveQr(qrCodeId);
    return toResolveQrResponse(qrCode, offer, tags);
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
    const ipAddress = req.ip ?? null;

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
