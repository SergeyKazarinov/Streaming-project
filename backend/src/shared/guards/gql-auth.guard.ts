import { type CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { prisma } from '../lib/prisma';
import { GqlContext } from '../types/gql-context.type';

/**
 * Guard для защиты маршрута
 * @returns { boolean } true, если пользователь авторизован, false в противном случае
 */
@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext<GqlContext>().req;

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: request.session.userId,
      },
    });

    request.user = user;

    return true;
  }
}
