import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import { RewardOfferService } from '../services/reward-offer.service';
import { RewardType } from '../entities/reward-offer.entity';
import {
  toRewardOfferResponse,
  type RewardOfferResponse,
} from '../dto/reward-offer.dto';

interface UpsertRewardOfferBody {
  type: RewardType;
  value: string;
  expiresInDays?: number | null;
  dailyCap?: number | null;
  active?: boolean;
}

@Controller('venues/:venueId/reward-offer')
@UseGuards(AuthGuard)
export class RewardOfferController {
  constructor(private readonly offers: RewardOfferService) {}

  @Get()
  async find(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
  ): Promise<RewardOfferResponse | null> {
    const offer = await this.offers.findForVenue(venueId, user.userId);
    return offer ? toRewardOfferResponse(offer) : null;
  }

  @Put()
  async upsert(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Body() body: UpsertRewardOfferBody,
  ): Promise<RewardOfferResponse> {
    const offer = await this.offers.upsert(venueId, user.userId, {
      type: body.type,
      value: body.value,
      expiresInDays: body.expiresInDays ?? null,
      dailyCap: body.dailyCap ?? null,
      active: body.active ?? true,
    });
    return toRewardOfferResponse(offer);
  }
}
