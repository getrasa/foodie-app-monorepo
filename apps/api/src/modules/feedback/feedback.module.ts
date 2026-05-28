import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Feedback } from './entities/feedback.entity';
import { FeedbackTag } from './entities/feedback-tag.entity';
import { QrCode } from '../venue/entities/qr-code.entity';
import { RewardOffer } from '../venue/entities/reward-offer.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { PublicFeedbackController } from './controllers/public-feedback.controller';
import { FeedbackManagementController } from './controllers/feedback-management.controller';
import { AnalyticsController } from './controllers/analytics.controller';
import { FeedbackSubmissionService } from './services/feedback-submission.service';
import { FeedbackManagementService } from './services/feedback-management.service';
import { AbuseStackService } from './services/abuse-stack.service';
import { AnalyticsService } from './services/analytics.service';
import { VenueModule } from '../venue/venue.module';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Feedback,
      FeedbackTag,
      QrCode,
      RewardOffer,
      Voucher,
    ]),
    VenueModule,
    VoucherModule,
  ],
  controllers: [
    PublicFeedbackController,
    FeedbackManagementController,
    AnalyticsController,
  ],
  providers: [
    FeedbackSubmissionService,
    FeedbackManagementService,
    AbuseStackService,
    AnalyticsService,
  ],
})
export class FeedbackModule {}
