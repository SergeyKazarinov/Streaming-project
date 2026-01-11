import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { hashPassword } from '@/shared/lib/hash-password.util';
import { prisma } from '@/shared/lib/prisma';

import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  constructor() {}

  async me(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async create(input: CreateUserInput) {
    const { username, email, password } = input;

    const isUsernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const isEmailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUsernameExists || isEmailExists) {
      throw new ConflictException('Username already exists');
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

    if (!user) {
      throw new InternalServerErrorException('Failed to create user');
    }

    return true;
  }
}
