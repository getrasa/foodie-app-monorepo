import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import {
  AnalyticsService,
  type RatingDistribution,
  type RatingTrendBucket,
  type RedemptionRate,
} from '../services/analytics.service';

const parseDate = (raw: string | undefined, field: string): Date | undefined => {
  if (raw == null || raw === '') return undefined;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) {
    throw new BadRequestException(`${field} must be a valid ISO date`);
  }
  return d;
};

@Controller('venues/:venueId/analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get('rating-distribution')
  async ratingDistribution(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<RatingDistribution> {
    return this.analytics.ratingDistribution(venueId, user.userId, {
      from: parseDate(from, 'from'),
      to: parseDate(to, 'to'),
    });
  }

  @Get('rating-trend')
  async ratingTrend(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<RatingTrendBucket[]> {
    return this.analytics.ratingTrend(venueId, user.userId, {
      from: parseDate(from, 'from'),
      to: parseDate(to, 'to'),
    });
  }

  @Get('redemption-rate')
  async redemptionRate(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<RedemptionRate> {
    return this.analytics.redemptionRate(venueId, user.userId, {
      from: parseDate(from, 'from'),
      to: parseDate(to, 'to'),
    });
  }
}
