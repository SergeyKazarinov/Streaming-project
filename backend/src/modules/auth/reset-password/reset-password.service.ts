import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { TokenType } from 'prisma/generated/prisma/enums';

import { MailService } from '@/modules/mail/mail.service';
import { TokenRepository } from '@/modules/repositories/token/token.repository';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { checkToken } from '@/shared/lib/check-token.util';
import { generateToken } from '@/shared/lib/generate-token.util';
import { hashPassword } from '@/shared/lib/hash-password.util';
import { getSessionMetadata } from '@/shared/lib/session-metadata.util';

import { ResetPasswordInput } from './inputs/reset-password.input';
import { UpdatePasswordInput } from './inputs/update-password.input';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async resetPassword(req: Request, input: ResetPasswordInput, userAgent: string) {
    const user = await this.userRepository.findUniqueUserByEmail(input.email);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const resetPasswordToken = await generateToken({ user, type: TokenType.RESET_PASSWORD });

    const metadata = getSessionMetadata(req, userAgent);

    await this.mailService.sendResetPasswordToken(user.email, resetPasswordToken.token, metadata);

    return true;
  }

  async updatePassword(input: UpdatePasswordInput) {
    const { token, newPassword } = input;

    const existingToken = await checkToken(token, TokenType.RESET_PASSWORD);

    const hashedPassword = await hashPassword(newPassword);

    await this.userRepository.updateUser(existingToken.userId, {
      password: hashedPassword,
    });

    await this.tokenRepository.delete({
      id: existingToken.id,
      type: TokenType.RESET_PASSWORD,
    });

    return true;
  }
}
