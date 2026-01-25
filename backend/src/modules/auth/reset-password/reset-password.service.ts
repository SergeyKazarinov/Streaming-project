import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { TokenType } from 'prisma/generated/prisma/enums';

import { MailService } from '@/modules/mail/mail.service';

import { checkToken } from '@/shared/lib/check-token.util';
import { generateToken } from '@/shared/lib/generate-token.util';
import { hashPassword } from '@/shared/lib/hash-password.util';
import { prisma } from '@/shared/lib/prisma';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { ResetPasswordInput } from './inputs/reset-password.input';
import { UpdatePasswordInput } from './inputs/update-password.input';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly mailService: MailService) {}

  async resetPassword(req: Request, input: ResetPasswordInput, userAgent: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const resetPasswordToken = await generateToken({ prisma, user, type: TokenType.RESET_PASSWORD });

    const metadata = getSessionMetadata(req, userAgent);

    await this.mailService.sendResetPasswordToken(user.email, resetPasswordToken.token, metadata);

    return true;
  }

  async updatePassword(input: UpdatePasswordInput) {
    const { token, newPassword } = input;

    const existingToken = await checkToken(token, TokenType.RESET_PASSWORD);

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: existingToken.userId },
      data: { password: hashedPassword },
    });

    await prisma.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.RESET_PASSWORD,
      },
    });

    return true;
  }
}
