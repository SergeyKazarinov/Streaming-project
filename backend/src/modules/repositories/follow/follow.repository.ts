import { Injectable } from '@nestjs/common';
import { FollowCreateArgs, FollowDeleteArgs, type FollowModel, FollowWhereInput } from 'prisma/generated/prisma/models';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class FollowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFollowers(followerId: string): Promise<FollowModel[]> {
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

  async findFollowing(followingId: string): Promise<FollowModel[]> {
    return await this.prismaService.follow.findMany({
      where: {
        followingId,
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

  async findFirst(where: FollowWhereInput): Promise<FollowModel | null> {
    return await this.prismaService.follow.findFirst({
      where,
    });
  }

  async create(data: FollowCreateArgs['data']) {
    return await this.prismaService.follow.create({
      data,
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async delete(where: FollowDeleteArgs['where']): Promise<FollowModel> {
    return await this.prismaService.follow.delete({
      where,
      include: {
        follower: true,
        following: true,
      },
    });
  }

  async findFollowersCountByUserId(userId: string): Promise<number> {
    return await this.prismaService.follow.count({
      where: {
        followingId: userId,
      },
    });
  }
}
