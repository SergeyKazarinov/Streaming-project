import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { MESSAGE } from '@/shared/consts/message.const';
import { hashPassword } from '@/shared/lib/hash-password.util';
import { prisma } from '@/shared/lib/prisma';
import { secureUser } from '@/shared/lib/secure-user.util';
import { BaseUserService } from '@/shared/services/base-user.service';

import { VerificationService } from '../verification/verification.service';

import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';
import { SecureUserModel } from './models/user.model';

@Injectable()
export class AccountService extends BaseUserService {
  constructor(private readonly verificationService: VerificationService) {
    super();
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async me(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return secureUser(user);
  }

  async create(input: CreateUserInput): Promise<boolean> {
    const { username, email, password } = input;

    const isUsernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const isEmailExists = await this.getUserByEmail(email);

    if (isUsernameExists) {
      throw new ConflictException(MESSAGE.ERROR.USERNAME_ALREADY_EXISTS);
    }

    if (isEmailExists) {
      throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        displayName: username,
      },
    });

    await this.verificationService.sendVerificationToken(user);

    return true;
  }

  async changeEmail(user: User, input: ChangeEmailInput): Promise<SecureUserModel> {
    const { email } = input;

    const isEmailExists = await this.getUserByEmail(email);

    if (isEmailExists) {
      throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        isEmailVerified: false,
      },
    });

    await this.verificationService.sendVerificationToken(updatedUser);

    return secureUser(updatedUser);
  }

  async changePassword(user: User, input: ChangePasswordInput): Promise<SecureUserModel> {
    const { oldPassword, newPassword } = input;

    const isOldPasswordValid = await this.comparePassword(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw new BadRequestException(MESSAGE.ERROR.INVALID_OLD_PASSWORD);
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return secureUser(updatedUser);
  }
}
