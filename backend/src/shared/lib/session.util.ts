import { InternalServerErrorException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import type { User } from 'prisma/generated/prisma/client';

import type { SessionMetadata } from '../types/session-metadata.types';

import { secureUser } from './secure-user.util';

export const saveSession = (req: Request, user: User, metadata: SessionMetadata) => {
  return new Promise((resolve, reject) => {
    req.session.createdAt = new Date();
    req.session.userId = user.id;
    req.session.metadata = metadata;

    req.session.save((err) => {
      if (err) {
        return reject(new InternalServerErrorException('Не удалось сохранить сессию'));
      }
      resolve(secureUser(user));
    });
  });
};

export const destroySession = (req: Request, configService: ConfigService) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        return reject(new InternalServerErrorException('Не удалось завершить сессию'));
      }

      req.res?.clearCookie(configService.getOrThrow<string>('SESSION_NAME'));
      resolve(true);
    });
  });
};
