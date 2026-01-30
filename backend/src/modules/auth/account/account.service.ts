import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { UserRepository } from '@/modules/user/user.repository';

import { MESSAGE } from '@/shared/consts/message.const';
import { hashPassword } from '@/shared/lib/hash-password.util';
import { secureUser } from '@/shared/lib/secure-user.util';
import { BaseUserService } from '@/shared/services/base-user.service';

import { VerificationService } from '../verification/verification.service';

import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';
import { SecureUserModel } from './models/user.model';

@Injectable()
export class AccountService extends BaseUserService {
  constructor(
    private readonly verificationService: VerificationService,
    protected readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }

  async me(id: string) {
    const user = await this.userRepository.findUniqueUserById(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return secureUser(user);
  }

  async create(input: CreateUserInput): Promise<boolean> {
    const { username, email, password } = input;

    const isUsernameExists = await this.userRepository.findUniqueUserByUsername(username);

    const isEmailExists = await this.userRepository.findUniqueUserByEmail(email);

    if (isUsernameExists) {
      throw new ConflictException(MESSAGE.ERROR.USERNAME_ALREADY_EXISTS);
    }

    if (isEmailExists) {
      throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
      displayName: username,
    });

    await this.verificationService.sendVerificationToken(user);

    return true;
  }

  async changeEmail(user: User, input: ChangeEmailInput): Promise<SecureUserModel> {
    const { email } = input;

    const isEmailExists = await this.userRepository.findUniqueUserByEmail(email);

    if (isEmailExists) {
      throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
    }

    const updatedUser = await this.userRepository.updateUser(user.id, {
      email,
      isEmailVerified: false,
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

    const updatedUser = await this.userRepository.updateUser(user.id, {
      password: hashedPassword,
    });

    return secureUser(updatedUser);
  }
}
