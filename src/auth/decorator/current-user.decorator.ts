import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const rest = context.switchToHttp().getRequest();
    const request = rest;
    return request.user as User;
  }
);
