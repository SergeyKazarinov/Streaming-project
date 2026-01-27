import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { MESSAGE } from '../consts/message.const';
import { prisma } from '../lib/prisma';

export class BaseUserService {
  constructor() {}

  protected async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  protected async checkUser(loginOrEmail: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: { equals: loginOrEmail } }, { email: { equals: loginOrEmail } }],
      },
    });

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
