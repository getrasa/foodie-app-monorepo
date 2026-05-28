import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Voucher } from './entities/voucher.entity';
import { VoucherController } from './controllers/voucher.controller';
import { VoucherService } from './services/voucher.service';
import { VoucherExpirySweepService } from './services/voucher-expiry-sweep.service';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [MikroOrmModule.forFeature([Voucher]), VenueModule],
  controllers: [VoucherController],
  providers: [VoucherService, VoucherExpirySweepService],
})
export class VoucherModule {}
