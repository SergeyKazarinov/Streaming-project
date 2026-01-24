import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { SessionData } from 'express-session';
import { RedisClientType } from 'redis';

import { generateTotpObject } from '@/shared/lib/generate-totp-object';
import { prisma } from '@/shared/lib/prisma';
import { destroySession, saveSession } from '@/shared/lib/session.util';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { AuthModel } from '../account/models/auth.model';
import { VerificationService } from '../verification/verification.service';

import { REDIS_KEY } from './../../../shared/consts/key.cons';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class SessionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService,
    @Inject(REDIS_KEY) private readonly redisClient: RedisClientType,
  ) {}

  private UNAUTHORIZED_MESSAGE_ERROR = 'Неверный логин или пароль' as const;

  async login(req: Request, input: LoginInput, userAgent: string): Promise<AuthModel> {
    const { login, password, totpCode } = input;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: { equals: login } }, { email: { equals: login } }],
      },
    });

    if (!user) {
      throw new UnauthorizedException(this.UNAUTHORIZED_MESSAGE_ERROR);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(this.UNAUTHORIZED_MESSAGE_ERROR);
    }

    if (!user.isEmailVerified) {
      await this.verificationService.sendVerificationToken(user);

      throw new BadRequestException('Аккаунт не подтвержден, пожалуйста проверьте свою почту');
    }

    if (user.isTotpEnabled) {
      if (!totpCode) {
        return {
          message: 'Двухфакторная аутентификация включена, пожалуйста введите код из приложения',
        };
      }

      const totp = generateTotpObject(user.email, user.totpSecret as string); // если флаг isTotpEnabled true, то totpSecret не может быть null

      const delta = totp.validate({ token: totpCode });

      if (delta === null) {
        throw new BadRequestException('Неверный код');
      }
    }

    const metadata = getSessionMetadata(req, userAgent);

    return {
      user: await saveSession(req, user, metadata),
    };
  }

  async logout(req: Request) {
    return destroySession(req, this.configService);
  }

  async findSessionsByUser(req: Request) {
    const userId = req.session.userId;

    if (!userId) {
      throw new NotFoundException('Не авторизован');
    }

    const keys = await this.redisClient.keys('*');

    const userSessions: (SessionData & { id: string })[] = [];

    for (const key of keys) {
      const sessionData = await this.redisClient.get(key);

      if (sessionData) {
        const session = JSON.parse(sessionData) as SessionData;

        if ((session.userId = userId)) {
          userSessions.push({ ...session, id: key.split(':')[1] });
        }
      }
    }

    userSessions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return userSessions.filter((session) => session.id !== req.session.id);
  }

  async findCurrent(req: Request) {
    const sessionId = req.session.id;

    const sessionData = await this.redisClient.get(
      `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`,
    );

    if (!sessionData) {
      throw new NotFoundException('Сессия не найдена');
    }

    const session = JSON.parse(sessionData) as SessionData;

    return {
      ...session,
      id: sessionId,
    };
  }

  clearSession(req: Request) {
    req.res?.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));

    return true;
  }

  async remove(req: Request, id: string) {
    if (req.session.id === id) {
      throw new ConflictException('Текущую сессию удалить нельзя');
    }

    await this.redisClient.del(`${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`);

    return true;
  }
}
