import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import { TagService } from '../services/tag.service';
import { toTagResponse, type TagResponse } from '../dto/tag.dto';

interface CreateTagBody {
  label: string;
  sortOrder?: number | null;
}

interface UpdateTagBody {
  label?: string;
  sortOrder?: number;
}

@Controller()
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tags: TagService) {}

  @Get('venues/:venueId/tags')
  async list(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
  ): Promise<TagResponse[]> {
    const list = await this.tags.listForVenue(venueId, user.userId);
    return list.map(toTagResponse);
  }

  @Post('venues/:venueId/tags')
  async create(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Body() body: CreateTagBody,
  ): Promise<TagResponse> {
    const tag = await this.tags.create(venueId, user.userId, {
      label: body.label,
      sortOrder: body.sortOrder ?? null,
    });
    return toTagResponse(tag);
  }

  @Patch('tags/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
    @Body() body: UpdateTagBody,
  ): Promise<TagResponse> {
    const tag = await this.tags.update(id, user.userId, body);
    return toTagResponse(tag);
  }

  @Delete('tags/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async archive(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
  ): Promise<void> {
    await this.tags.archive(id, user.userId);
  }
}
