import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Feedback } from './entities/feedback.entity';
import { FeedbackTag } from './entities/feedback-tag.entity';
import { QrCode } from '../venue/entities/qr-code.entity';
import { RewardOffer } from '../venue/entities/reward-offer.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { PublicFeedbackController } from './controllers/public-feedback.controller';
import { FeedbackManagementController } from './controllers/feedback-management.controller';
import { FeedbackSubmissionService } from './services/feedback-submission.service';
import { FeedbackManagementService } from './services/feedback-management.service';
import { AbuseStackService } from './services/abuse-stack.service';
import { VenueModule } from '../venue/venue.module';

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
  ],
  controllers: [PublicFeedbackController, FeedbackManagementController],
  providers: [
    FeedbackSubmissionService,
    FeedbackManagementService,
    AbuseStackService,
  ],
})
export class FeedbackModule {}
