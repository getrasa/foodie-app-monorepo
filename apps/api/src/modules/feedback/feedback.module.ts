import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Feedback } from './entities/feedback.entity';
import { FeedbackTag } from './entities/feedback-tag.entity';
import { QrCode } from '../venue/entities/qr-code.entity';
import { RewardOffer } from '../venue/entities/reward-offer.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { PublicFeedbackController } from './controllers/public-feedback.controller';
import { FeedbackSubmissionService } from './services/feedback-submission.service';
import { AbuseStackService } from './services/abuse-stack.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Feedback, FeedbackTag, QrCode, RewardOffer, Voucher]),
  ],
  controllers: [PublicFeedbackController],
  providers: [FeedbackSubmissionService, AbuseStackService],
})
export class FeedbackModule {}
