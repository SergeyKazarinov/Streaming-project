import { applyDecorators, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../guards/gql-auth.guard';

/**
 * Декоратор для защиты маршрута
 * @returns { Function } декоратор для защиты маршрута
 */
export const Authorization = () => {
  return applyDecorators(UseGuards(GqlAuthGuard));
};
