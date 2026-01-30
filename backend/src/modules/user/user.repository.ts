import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';
import { UserCreateInput, UserDeleteManyArgs, UserUpdateInput, UserWhereInput } from 'prisma/generated/prisma/models';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: { equals: usernameOrEmail } }, { email: { equals: usernameOrEmail } }],
      },
    });
  }

  async findUniqueUserById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUniqueUserByUsername(username: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findUniqueUserByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findMany(where: UserWhereInput): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where,
    });
  }

  async createUser(user: UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({
      data: user,
    });
  }

  async updateUser(id: string, user: UserUpdateInput): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async deleteMany(where: UserDeleteManyArgs['where']): Promise<void> {
    await this.prismaService.user.deleteMany({
      where,
    });
  }
}
