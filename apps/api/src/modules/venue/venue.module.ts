import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Business } from './entities/business.entity';
import { Venue } from './entities/venue.entity';
import { RewardOffer } from './entities/reward-offer.entity';
import { QrCode } from './entities/qr-code.entity';
import { Tag } from './entities/tag.entity';
import { BusinessService } from './services/business.service';
import { VenueService } from './services/venue.service';
import { RewardOfferService } from './services/reward-offer.service';
import { QrCodeService } from './services/qr-code.service';
import { OwnershipService } from './services/ownership.service';
import { BusinessController } from './controllers/business.controller';
import { VenueController } from './controllers/venue.controller';
import { RewardOfferController } from './controllers/reward-offer.controller';
import { QrCodeController } from './controllers/qr-code.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Business, Venue, RewardOffer, QrCode, Tag])],
  controllers: [
    BusinessController,
    VenueController,
    RewardOfferController,
    QrCodeController,
  ],
  providers: [
    BusinessService,
    VenueService,
    RewardOfferService,
    QrCodeService,
    OwnershipService,
  ],
  exports: [OwnershipService],
})
export class VenueModule {}
