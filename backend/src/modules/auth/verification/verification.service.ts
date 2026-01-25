import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'prisma/generated/prisma/client';
import { TokenType } from 'prisma/generated/prisma/enums';

import { MailService } from '@/modules/mail/mail.service';

import { checkToken } from '@/shared/lib/check-token.util';
import { generateToken } from '@/shared/lib/generate-token.util';
import { prisma } from '@/shared/lib/prisma';
import { saveSession } from '@/shared/lib/session.util';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { VerificationInput } from './inputs/verification.input';

@Injectable()
export class VerificationService {
  constructor(private readonly mailService: MailService) {}

  async verify(req: Request, input: VerificationInput, userAgent: string) {
    const { token } = input;

    const existingToken = await checkToken(token, TokenType.EMAIL_VERIFY);

    const user = await prisma.user.update({
      where: { id: existingToken.userId },
      data: { isEmailVerified: true },
    });

    await prisma.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.EMAIL_VERIFY,
      },
    });

    const metadata = getSessionMetadata(req, userAgent);

    return saveSession(req, user, metadata);
  }

  async sendVerificationToken(user: User) {
    const verificationToken = await generateToken({ prisma, user, type: TokenType.EMAIL_VERIFY });

    await this.mailService.sendVerificationToken(user.email, verificationToken.token);

    return true;
  }
}
