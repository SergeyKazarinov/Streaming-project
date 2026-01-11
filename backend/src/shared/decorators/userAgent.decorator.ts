import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

import type { GqlContext } from '../types/gql-context.type';

export const UserAgent = createParamDecorator<unknown>((_, ctx) => {
  if (ctx.getType() === 'http') {
    return ctx.switchToHttp().getRequest<Request>().headers['user-agent'];
  }
  const context = GqlExecutionContext.create(ctx);
  return context.getContext<GqlContext>().req.headers['user-agent'];
});
