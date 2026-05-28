import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthContext } from '../../auth/interfaces/auth-context.interface';
import {
  FeedbackManagementService,
  type ArchivedFilter,
  type RatingFilter,
  type ReadFilter,
  type SpamFilter,
} from '../services/feedback-management.service';
import {
  toFeedbackListItem,
  type FeedbackListItem,
} from '../dto/feedback-list.dto';
import {
  toFeedbackDetailResponse,
  type FeedbackDetailResponse,
} from '../dto/feedback-detail.dto';

interface UpdateFeedbackBody {
  read?: boolean;
  archived?: boolean;
}

const parseRating = (raw: string | undefined): RatingFilter | undefined => {
  if (raw == null || raw === '' || raw === 'all') return undefined;
  if (raw === 'low') return 'low';
  const n = Number(raw);
  if (!Number.isInteger(n)) {
    throw new BadRequestException('rating must be an integer 1–5 or "low"');
  }
  return n;
};

const parseRead = (raw: string | undefined): ReadFilter | undefined => {
  if (raw == null || raw === '' || raw === 'all') return undefined;
  if (raw !== 'unread' && raw !== 'read') {
    throw new BadRequestException('read must be one of: unread, read, all');
  }
  return raw;
};

const parseArchived = (raw: string | undefined): ArchivedFilter | undefined => {
  if (raw == null || raw === '') return undefined;
  if (raw !== 'yes' && raw !== 'no' && raw !== 'all') {
    throw new BadRequestException('archived must be one of: yes, no, all');
  }
  return raw;
};

const parseSpam = (raw: string | undefined): SpamFilter | undefined => {
  if (raw == null || raw === '') return undefined;
  if (raw !== 'yes' && raw !== 'no' && raw !== 'all') {
    throw new BadRequestException('spam must be one of: yes, no, all');
  }
  return raw;
};

const parseDate = (
  raw: string | undefined,
  field: string,
): Date | undefined => {
  if (raw == null || raw === '') return undefined;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) {
    throw new BadRequestException(`${field} must be a valid ISO date`);
  }
  return d;
};

@Controller()
@UseGuards(AuthGuard)
export class FeedbackManagementController {
  constructor(private readonly feedback: FeedbackManagementService) {}

  @Get('venues/:venueId/feedback')
  async list(
    @Param('venueId', new ParseUUIDPipe()) venueId: string,
    @CurrentUser() user: AuthContext,
    @Query('rating') rating?: string,
    @Query('read') read?: string,
    @Query('archived') archived?: string,
    @Query('spam') spam?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
  ): Promise<FeedbackListItem[]> {
    const items = await this.feedback.list(venueId, user.userId, {
      rating: parseRating(rating),
      read: parseRead(read),
      archived: parseArchived(archived),
      spam: parseSpam(spam),
      from: parseDate(from, 'from'),
      to: parseDate(to, 'to'),
      limit: limit ? Number(limit) : undefined,
    });
    return items.map(toFeedbackListItem);
  }

  @Get('feedback/:id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
  ): Promise<FeedbackDetailResponse> {
    const feedback = await this.feedback.findOne(id, user.userId);
    return toFeedbackDetailResponse(feedback);
  }

  @Patch('feedback/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
    @Body() body: UpdateFeedbackBody,
  ): Promise<FeedbackDetailResponse> {
    const feedback = await this.feedback.update(id, user.userId, body);
    return toFeedbackDetailResponse(feedback);
  }

  @Post('feedback/:id/mark-spam')
  async markSpam(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthContext,
  ): Promise<FeedbackDetailResponse> {
    const feedback = await this.feedback.markSpam(id, user.userId);
    return toFeedbackDetailResponse(feedback);
  }
}
