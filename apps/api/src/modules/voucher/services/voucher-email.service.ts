import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { Voucher } from '../entities/voucher.entity';

interface SendVoucherEmailInput {
  toEmail: string;
  voucher: Voucher;
  venueName: string;
}

// Optional delivery channel — when RESEND_KEY is unset the service silently
// no-ops so local/dev environments don't need a Resend account. Failures
// never propagate: a feedback submission must succeed even if delivery breaks.
@Injectable()
export class VoucherEmailService {
  private readonly logger = new Logger(VoucherEmailService.name);
  private readonly resend: Resend | null;
  private readonly fromAddress: string;

  constructor(private readonly config: ConfigService) {
    const key = this.config.get<string>('email.resendKey');
    this.resend = key ? new Resend(key) : null;
    this.fromAddress = this.config.get<string>('email.from') ?? 'noreply@example.com';
    if (!this.resend) {
      this.logger.log('Resend key not configured — voucher emails will not be sent');
    }
  }

  // Fire-and-forget; awaiting is not required at the call site. Returns a
  // promise so tests can assert the side-effect when needed.
  dispatch(input: SendVoucherEmailInput): Promise<void> {
    return this.send(input).catch((err) => {
      this.logger.warn(
        `Voucher email delivery failed for voucher=${input.voucher.id}: ${stringifyError(err)}`,
      );
    });
  }

  private async send(input: SendVoucherEmailInput): Promise<void> {
    if (!this.resend) return;
    const { voucher, venueName, toEmail } = input;
    const subject = `Twój kod rabatowy z ${venueName}`;
    const expiresLine = voucher.expiresAt
      ? `Ważny do ${formatDatePl(voucher.expiresAt)}.`
      : 'Bez daty wygaśnięcia.';
    const html = renderHtml({
      venueName,
      code: voucher.code,
      description: voucher.description,
      expiresLine,
    });

    const { error } = await this.resend.emails.send({
      from: this.fromAddress,
      to: toEmail,
      subject,
      html,
    });
    if (error) {
      throw new Error(error.message ?? 'Resend send failed');
    }
  }
}

const formatDatePl = (d: Date): string => {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${d.getFullYear()}`;
};

const stringifyError = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};

const escapeHtml = (raw: string): string =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderHtml = (data: {
  venueName: string;
  code: string;
  description: string;
  expiresLine: string;
}): string => `<!doctype html>
<html lang="pl">
<body style="margin:0;background:#fbf7ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f1a15">
  <div style="max-width:480px;margin:0 auto;padding:32px 24px">
    <div style="font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(31,26,21,0.55)">${escapeHtml(data.venueName)}</div>
    <h1 style="font-size:28px;margin:12px 0 6px;font-style:italic;letter-spacing:-0.01em">Twój kod rabatowy</h1>
    <p style="font-size:15px;color:rgba(31,26,21,0.75);margin:0 0 24px">${escapeHtml(data.description)}</p>

    <div style="background:#1f1a15;color:#fbf7ef;padding:20px 24px;border-radius:14px">
      <div style="font-size:11px;letter-spacing:0.08em;opacity:0.55">KOD</div>
      <div style="font-family:'SF Mono',Menlo,monospace;font-size:24px;letter-spacing:0.12em;margin-top:4px">${escapeHtml(data.code)}</div>
      <div style="font-size:12px;opacity:0.65;margin-top:10px">${escapeHtml(data.expiresLine)}</div>
    </div>

    <p style="font-size:14px;color:rgba(31,26,21,0.7);margin-top:24px;line-height:1.5">
      Pokaż ten kod obsłudze przy następnej wizycie, aby skorzystać ze zniżki.
    </p>

    <p style="font-size:12px;color:rgba(31,26,21,0.5);margin-top:32px;line-height:1.5">
      Otrzymujesz tę wiadomość, ponieważ podałeś(-aś) swój e-mail po wystawieniu opinii w ${escapeHtml(data.venueName)}.
    </p>
  </div>
</body>
</html>`;
