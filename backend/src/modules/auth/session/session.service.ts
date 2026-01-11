import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { SessionData } from 'express-session';
import { RedisClientType } from 'redis';

import { prisma } from '@/shared/lib/prisma';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { REDIS_KEY } from './../../../shared/consts/key.cons';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class SessionService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(REDIS_KEY) private readonly redisClient: RedisClientType,
  ) {}

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
