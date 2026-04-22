import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly em: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = await this.authService.getSession(request.headers);

    if (!session) {
      throw new UnauthorizedException();
    }

    const user = await this.em.fork().findOne(User, { id: session.user.id });

    if (user?.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    request.auth = {
      session: {
        user: session.user,
        token: session.session.token,
        expiresAt: session.session.expiresAt,
      },
      user,
      isAdmin: true,
      userTierId: undefined,
    };

    return true;
  }
}
