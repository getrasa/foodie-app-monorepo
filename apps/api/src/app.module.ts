import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
