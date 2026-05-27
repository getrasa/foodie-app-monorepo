import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import { QrCodeService } from '../services/qr-code.service';
import { toQrCodeResponse, type QrCodeResponse } from '../dto/qr-code.dto';

interface CreateQrCodeBody {
  label?: string | null;
}

interface UpdateQrCodeBody {
  label?: string | null;
  active?: boolean;
}

@Controller()
@UseGuards(AuthGuard)
export class QrCodeController {
  constructor(private readonly qrCodes: QrCodeService) {}

  @Get('venues/:venueId/qr-codes')
  async list(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
  ): Promise<QrCodeResponse[]> {
    const list = await this.qrCodes.listForVenue(venueId, user.userId);
    return list.map(toQrCodeResponse);
  }

  @Post('venues/:venueId/qr-codes')
  async create(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Body() body: CreateQrCodeBody,
  ): Promise<QrCodeResponse> {
    const qrCode = await this.qrCodes.create(venueId, user.userId, body);
    return toQrCodeResponse(qrCode);
  }

  @Patch('qr-codes/:id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: AuthContext,
    @Body() body: UpdateQrCodeBody,
  ): Promise<QrCodeResponse> {
    const qrCode = await this.qrCodes.update(id, user.userId, body);
    return toQrCodeResponse(qrCode);
  }
}
