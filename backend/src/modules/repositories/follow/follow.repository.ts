import { Injectable } from '@nestjs/common';
import { FollowCreateArgs, FollowDeleteArgs, FollowWhereInput } from 'prisma/generated/prisma/models';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class FollowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFollowers(followingId: string) {
    return await this.prismaService.follow.findMany({
      where: {
        followingId,
        follower: {
          isDeactivated: false,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        follower: {
          include: {
            notificationSetting: true,
          },
        },
        following: true,
      },
    });
  }

  async findFollowing(followerId: string) {
    return await this.prismaService.follow.findMany({
      where: {
        followerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async findFirst(where: FollowWhereInput) {
    return await this.prismaService.follow.findFirst({
      where,
    });
  }

  async create(data: FollowCreateArgs['data']) {
    return await this.prismaService.follow.create({
      data,
      include: {
        follower: true,
        following: {
          include: {
            notificationSetting: true,
          },
        },
      },
    });
  }

  async delete(where: FollowDeleteArgs['where']) {
    return await this.prismaService.follow.delete({
      where,
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async findFollowersCountByUserId(userId: string) {
    return await this.prismaService.follow.count({
      where: {
        followingId: userId,
        follower: {
          isDeactivated: false,
        },
      },
    });
  }
}
