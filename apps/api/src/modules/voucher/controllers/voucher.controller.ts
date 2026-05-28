import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import { VoucherService } from '../services/voucher.service';
import {
  toVoucherLookupResponse,
  toVoucherResponse,
  type VoucherLookupResponse,
  type VoucherResponse,
} from '../dto/voucher-lookup.dto';

@Controller('vouchers')
@UseGuards(AuthGuard)
export class VoucherController {
  constructor(private readonly vouchers: VoucherService) {}

  @Get('by-code/:code')
  async lookup(
    @Param('code') code: string,
    @CurrentUser() user: AuthContext,
  ): Promise<VoucherLookupResponse> {
    const voucher = await this.vouchers.lookupByCode(code, user.userId);
    return toVoucherLookupResponse(voucher);
  }

  @Post(':id/redeem')
  async redeem(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
  ): Promise<VoucherResponse> {
    const voucher = await this.vouchers.redeem(id, user.userId);
    return toVoucherResponse(voucher);
  }
}
