import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import { VenueService } from '../services/venue.service';
import { toVenueSummary, type VenueSummary } from '../dto/business.dto';

interface UpdateVenueBody {
  name?: string;
  address?: string | null;
  googlePlaceId?: string | null;
  googleMapsUrl?: string | null;
  archived?: boolean;
}

@Controller('venues')
@UseGuards(AuthGuard)
export class VenueController {
  constructor(private readonly venues: VenueService) {}

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
  ): Promise<VenueSummary> {
    const venue = await this.venues.findOne(id, user.userId);
    return toVenueSummary(venue);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
    @Body() body: UpdateVenueBody,
  ): Promise<VenueSummary> {
    const venue = await this.venues.update(id, user.userId, body);
    return toVenueSummary(venue);
  }
}
