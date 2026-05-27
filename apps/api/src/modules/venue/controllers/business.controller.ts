import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import { BusinessService } from '../services/business.service';
import {
  toBusinessResponse,
  type BusinessResponse,
} from '../dto/business.dto';

interface CreateBusinessBody {
  name: string;
  logo?: string;
}

interface UpdateBusinessBody {
  name?: string;
  logo?: string | null;
  archived?: boolean;
}

@Controller('businesses')
@UseGuards(AuthGuard)
export class BusinessController {
  constructor(private readonly businesses: BusinessService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthContext,
    @Body() body: CreateBusinessBody,
  ): Promise<BusinessResponse> {
    const business = await this.businesses.create(user.userId, {
      name: body.name,
      logo: body.logo,
    });
    return toBusinessResponse(business, business.venues.getItems());
  }

  @Get('me')
  async findMine(@CurrentUser() user: AuthContext): Promise<BusinessResponse> {
    const business = await this.businesses.findForOwner(user.userId);
    if (!business) {
      throw new NotFoundException('No Business yet for this user');
    }
    return toBusinessResponse(business, business.venues.getItems());
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
    @Body() body: UpdateBusinessBody,
  ): Promise<BusinessResponse> {
    const business = await this.businesses.update(id, user.userId, body);
    return toBusinessResponse(business);
  }

  @Post(':id/complete-onboarding')
  async completeOnboarding(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
  ): Promise<BusinessResponse> {
    const business = await this.businesses.completeOnboarding(id, user.userId);
    return toBusinessResponse(business);
  }
}
