import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { prisma } from '@/shared/lib/prisma';

import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  constructor() {}

  async findAll() {
    const users = await prisma.user.findMany();

    return users;
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

    const hashedPassword = await bcrypt.hash(password, 10);
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
