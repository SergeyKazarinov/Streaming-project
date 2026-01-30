import type { Token, TokenType, User } from 'prisma/generated/prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from './prisma';

interface IGenerateTokenConfig {
  user: User;
  type: TokenType;
  isUUID?: boolean;
  expiresInTime?: number;
}

/**
 * Функция для генерации токена и сохранения его в базу данных
 *
 * @async
 * @param {IGenerateTokenConfig} config - конфигурация для генерации токена
 * @param {User} user - объект пользователя
 * @param {TokenType} type - тип токена
 * @param {boolean} [isUUID=true] - генерировать UUID или случайное число
 * @param {number} [expiresInTime=1000 * 60 * 60 * 5] - время истечения токена в миллисекундах
 * @returns {Promise<Token>} - объект токена
 */
export const generateToken = async ({
  user,
  type,
  isUUID = true,
  expiresInTime = 1000 * 60 * 60 * 24,
}: IGenerateTokenConfig): Promise<Token> => {
  let token: string;

  if (isUUID) {
    token = uuidv4();
  } else {
    token = Math.floor(Math.random() * (1000000 - 100000) + 100000).toString();
  }

  const expiresIn = new Date(Date.now() + expiresInTime);

  const existingToken = await prisma.token.findFirst({
    where: {
      type,
      user: {
        id: user.id,
      },
    },
  });

  if (existingToken) {
    await prisma.token.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newToken = await prisma.token.create({
    data: {
      token,
      type,
      expiresIn,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      user: true,
    },
  });

  return newToken;
};
