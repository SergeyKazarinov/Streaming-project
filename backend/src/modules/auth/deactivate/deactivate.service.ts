import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'prisma/generated/prisma/client';
import { TokenType } from 'prisma/generated/prisma/enums';

import { MailService } from '@/modules/mail/mail.service';
import { TokenRepository } from '@/modules/repositories/token/token.repository';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { MESSAGE } from '@/shared/consts/message.const';
import { checkToken } from '@/shared/lib/check-token.util';
import { generateToken } from '@/shared/lib/generate-token.util';
import { destroySession } from '@/shared/lib/session.util';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';
import { BaseUserService } from '@/shared/services/base-user.service';

import { AuthModel } from '../account/models/auth.model';

import { DeactivateInput } from './inputs/deactivate.input';

@Injectable()
export class DeactivateService extends BaseUserService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    protected readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {
    super(userRepository);
  }

  private async checkDeactivateToken(req: Request, deactivateToken: string) {
    const existingToken = await checkToken(deactivateToken, TokenType.DEACTIVATE_ACCOUNT);

    await this.userRepository.updateUser(existingToken.userId, {
      isDeactivated: true,
      deactivatedAt: new Date(),
    });

    await this.tokenRepository.delete({
      id: existingToken.id,
      type: TokenType.DEACTIVATE_ACCOUNT,
    });

    await destroySession(req, this.configService);
  }

  private async sendDeactivateToken(req: Request, user: User, userAgent: string) {
    const deactivateToken = await generateToken({
      user,
      type: TokenType.DEACTIVATE_ACCOUNT,
      isUUID: false,
    });

    const metadata = getSessionMetadata(req, userAgent);

    await this.mailService.sendDeactivateToken(user.email, deactivateToken.token, metadata);
  }

  async deactivate(req: Request, input: DeactivateInput, userAgent: string): Promise<AuthModel> {
    const { email, password, deactivateToken } = input;

    const user = await this.checkUser(email, password);

    if (!deactivateToken) {
      await this.sendDeactivateToken(req, user, userAgent);

      return {
        message: MESSAGE.INFO.DEACTIVATE_ACCOUNT_REQUEST,
      };
    }

    await this.checkDeactivateToken(req, deactivateToken);

    return { user };
  }
}
