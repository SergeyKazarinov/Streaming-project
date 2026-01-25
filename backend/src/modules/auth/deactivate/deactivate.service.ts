import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'prisma/generated/prisma/client';
import { TokenType } from 'prisma/generated/prisma/enums';

import { MailService } from '@/modules/mail/mail.service';

import { MESSAGE } from '@/shared/consts/message.const';
import { checkToken } from '@/shared/lib/check-token.util';
import { generateToken } from '@/shared/lib/generate-token.util';
import { prisma } from '@/shared/lib/prisma';
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
  ) {
    super();
  }

  private async checkDeactivateToken(req: Request, deactivateToken: string) {
    const existingToken = await checkToken(deactivateToken, TokenType.DEACTIVATE_ACCOUNT);

    await prisma.user.update({
      where: { id: existingToken.userId },
      data: { isDeactivated: true, deactivatedAt: new Date() },
    });

    await prisma.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.DEACTIVATE_ACCOUNT,
      },
    });

    await destroySession(req, this.configService);
  }

  private async sendDeactivateToken(req: Request, user: User, userAgent: string) {
    const deactivateToken = await generateToken({
      prisma,
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
