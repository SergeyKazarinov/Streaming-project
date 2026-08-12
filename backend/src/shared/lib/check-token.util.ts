import { BadRequestException, NotFoundException } from '@nestjs/common';
import type { TokenType } from 'prisma/generated/prisma/enums';

import { prisma } from './prisma';

export const checkToken = async (token: string, tokenType: TokenType) => {
  const existingToken = await prisma.token.findUnique({
    where: {
      token,
      type: tokenType,
    },
  });

  if (!existingToken) {
    throw new NotFoundException('Токен не найден');
  }

  const hasExpired = new Date(existingToken.expiresIn) < new Date();

  if (hasExpired) {
    throw new BadRequestException('Токен истек');
  }

  return existingToken;
};
