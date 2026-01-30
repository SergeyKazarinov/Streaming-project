import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'prisma/generated/prisma/client';
import { TokenType } from 'prisma/generated/prisma/enums';

import { MailService } from '@/modules/mail/mail.service';
import { UserRepository } from '@/modules/user/user.repository';

import { checkToken } from '@/shared/lib/check-token.util';
import { generateToken } from '@/shared/lib/generate-token.util';
import { prisma } from '@/shared/lib/prisma';
import { saveSession } from '@/shared/lib/session.util';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { VerificationInput } from './inputs/verification.input';

@Injectable()
export class VerificationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
  ) {}

  async verify(req: Request, input: VerificationInput, userAgent: string) {
    const { token } = input;

    const existingToken = await checkToken(token, TokenType.EMAIL_VERIFY);

    const user = await this.userRepository.updateUser(existingToken.userId, {
      isEmailVerified: true,
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
