import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import type { UserRepository } from '@/modules/user/user.repository';

import { MESSAGE } from '../consts/message.const';

export class BaseUserService {
  constructor(protected readonly userRepository: UserRepository) {}

  protected async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  protected async checkUser(loginOrEmail: string, password: string) {
    const user = await this.userRepository.findUserByUsernameOrEmail(loginOrEmail);

    if (!user) {
      throw new UnauthorizedException(MESSAGE.ERROR.UNAUTHORIZED);
    }

    const isValidPassword = await this.comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(MESSAGE.ERROR.UNAUTHORIZED);
    }

    return user;
  }
}
