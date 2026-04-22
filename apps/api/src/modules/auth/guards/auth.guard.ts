import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
// import { User } from '../entities/user.entity';
import { AuthService } from '../auth.service';
// import { AuthContext } from '../interfaces/auth-context.interface';

@Injectable()
export class AuthGuard implements CanActivate {
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

    // const user = await this.em.fork().findOne(
    //   User,
    //   { id: session.user.id },
    //   { populate: ['patreonMember.tier'] },
    // );

    // const authContext: AuthContext = {
    //   session: {
    //     user: session.user,
    //     token: session.session.token,
    //     expiresAt: session.session.expiresAt,
    //   },
    //   user,
    //   isAdmin: user?.role === 'admin',
    //   userTierId: user?.patreonMember?.tier?.tierId,
    // };

    // request.auth = authContext;

    return true;
  }
}
