import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';

import { prisma } from '@/shared/lib/prisma';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { LoginInput } from './inputs/login.input';

@Injectable()
export class SessionService {
  constructor(private readonly configService: ConfigService) {}

  async login(req: Request, input: LoginInput, userAgent: string) {
    const { login, password } = input;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const metadata = getSessionMetadata(req, userAgent);

    return new Promise((resolve, reject) => {
      req.session.createdAt = new Date();
      req.session.userId = user.id;
      req.session.metadata = metadata;

      req.session.save((err) => {
        if (err) {
          return reject(new InternalServerErrorException('Не удалось сохранить сессию'));
        }
        resolve(user);
      });
    });
  }

  async logout(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException('Не удалось завершить сессию'));
        }

        req.res?.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve(true);
      });
    });
  }
}
