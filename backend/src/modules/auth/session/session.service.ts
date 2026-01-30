import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { SessionData } from 'express-session';
import { TokenType } from 'prisma/generated/prisma/enums';
import { RedisClientType } from 'redis';

import { TokenRepository } from '@/modules/repositories/token/token.repository';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { MESSAGE } from '@/shared/consts/message.const';
import { generateTotpObject } from '@/shared/lib/generate-totp-object';
import { destroySession, saveSession } from '@/shared/lib/session.util';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';
import { BaseUserService } from '@/shared/services/base-user.service';

import { AuthModel } from '../account/models/auth.model';
import { VerificationService } from '../verification/verification.service';

import { REDIS_KEY } from './../../../shared/consts/key.cons';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class SessionService extends BaseUserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService,
    protected readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    @Inject(REDIS_KEY) private readonly redisClient: RedisClientType,
  ) {
    super(userRepository);
  }

  async login(req: Request, input: LoginInput, userAgent: string): Promise<AuthModel> {
    const { login, password, totpCode } = input;
    const user = await this.checkUser(login, password);

    if (!user.isEmailVerified) {
      await this.verificationService.sendVerificationToken(user);

      throw new BadRequestException(MESSAGE.ERROR.NOT_VERIFIED);
    }

    if (user.isTotpEnabled) {
      if (!totpCode) {
        return {
          message: MESSAGE.INFO.TOTP_ENABLED,
        };
      }

      const totp = generateTotpObject(user.email, user.totpSecret as string); // если флаг isTotpEnabled true, то totpSecret не может быть null

      const delta = totp.validate({ token: totpCode });

      if (delta === null) {
        throw new BadRequestException(MESSAGE.ERROR.INVALID_TOTP_CODE);
      }
    }

    if (user.isDeactivated) {
      await this.userRepository.updateUser(user.id, {
        isDeactivated: false,
        deactivatedAt: null,
      });

      await this.tokenRepository.deleteMany({
        userId: user.id,
        type: TokenType.DEACTIVATE_ACCOUNT,
      });
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
      throw new NotFoundException(MESSAGE.ERROR.NOT_AUTHORIZED);
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
      throw new NotFoundException(MESSAGE.ERROR.NOT_FOUNT_SESSION);
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
      throw new ConflictException(MESSAGE.ERROR.CONFLICT_REMOVE_SESSION);
    }

    await this.redisClient.del(`${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`);

    return true;
  }
}
