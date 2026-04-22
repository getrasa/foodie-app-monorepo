import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { admin, emailOTP } from 'better-auth/plugins';
import { mikroOrmAdapter } from 'better-auth-mikro-orm';
import { MikroORM } from '@mikro-orm/core';
import { Resend } from 'resend';

function createBetterAuth(
  orm: MikroORM,
  configService: ConfigService,
  resend: Resend,
) {
  const emailFrom = configService.get('email.from');
  const webAppUrl = configService.get('WEB_APP_URL');
  const railwayFrontendUrl = process.env.RAILWAY_FRONTEND_URL;

  return betterAuth({
    basePath: "/api/auth",
    trustedOrigins: [
      "http://localhost:3000",
      "https://localhost:3002",
      webAppUrl,
      railwayFrontendUrl,
      process.env.UNIFIED_PLAYER_URL,
    ].filter(Boolean),
    database: mikroOrmAdapter(orm),

    plugins: [
      emailOTP({
        sendVerificationOTP: async ({ email, otp, type }) => {
          await resend.emails.send({
            from: `LustorVR <${emailFrom}>`,
            to: email,
            subject: type === 'sign-in' ? 'LustorVR - Your login code' : 'LustorVR - Verify your email',
            html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code expires in 5 minutes.</p>`,
          });
        },
      }),
      admin(),
    ],

    advanced: {
      database: {
        generateId: false,
      },
      crossSubDomainCookies: {
        enabled: !!process.env.COOKIE_DOMAIN,
        domain: process.env.COOKIE_DOMAIN,
      },
    },
  });
}

@Injectable()
export class AuthService implements OnModuleInit {
  private auth!: ReturnType<typeof createBetterAuth>;
  private resend!: Resend;

  constructor(
    private readonly configService: ConfigService,
    private readonly orm: MikroORM,
  ) {}

  onModuleInit() {
    this.resend = new Resend(this.configService.get('email.resendKey'));
    this.auth = createBetterAuth(this.orm, this.configService, this.resend);
  }

  async getSession(headers: Record<string, string | string[] | undefined>) {
    const normalizedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === 'string') {
        normalizedHeaders[key] = value;
      } else if (Array.isArray(value)) {
        normalizedHeaders[key] = value[0];
      }
    }
    return this.auth.api.getSession({ headers: normalizedHeaders });
  }

  async handler(request: Request): Promise<Response> {
    return this.auth.handler(request);
  }
}
