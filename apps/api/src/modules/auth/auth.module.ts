import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { Account } from './entities/account.entity';
import { Verification } from './entities/verification.entity';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([User, Session, Account, Verification]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AdminGuard],
  exports: [AuthService, AuthGuard, AdminGuard],
})
export class AuthModule {}
