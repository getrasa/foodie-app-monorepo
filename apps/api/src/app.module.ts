import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { VenueModule } from './modules/venue/venue.module';
import { FeedbackModule } from './modules/feedback/feedback.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    HealthModule,
    VenueModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
