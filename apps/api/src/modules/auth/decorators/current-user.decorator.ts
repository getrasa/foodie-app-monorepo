import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthContext, RequestWithAuth } from '../interfaces/auth-context.interface';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthContext => {
    const request = ctx.switchToHttp().getRequest<RequestWithAuth>();
    return request.auth;
  },
);
