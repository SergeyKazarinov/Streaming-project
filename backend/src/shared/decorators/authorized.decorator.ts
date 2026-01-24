import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { User } from 'prisma/generated/prisma/client';

import type { GqlContext } from '../types/gql-context.type';

/**
 * Декоратор для получения авторизованного пользователя
 * @param key - ключ пользователя, который нужно получить (не обязательный параметр)
 * @returns пользователь
 * @example
 * @Authorized()
 * @Authorized('id')
 * @Authorized('email')
 */
export const Authorized = createParamDecorator<keyof User, User | User[keyof User]>((key, ctx) => {
  let user: User;

  if (ctx.getType() === 'http') {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    user = request.user;
  } else {
    const context = GqlExecutionContext.create(ctx);
    user = context.getContext<GqlContext>().req.user as User;
  }

  return key ? user[key] : user;
});
