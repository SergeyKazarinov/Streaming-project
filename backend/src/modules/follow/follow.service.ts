import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { FollowRepository } from '@/modules/repositories/follow/follow.repository';

import { MESSAGE } from '@/shared/consts/message.const';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  async findMyFollowers(user: User): Promise<ReturnType<typeof this.followRepository.findFollowers>> {
    return await this.followRepository.findFollowers(user.id);
  }

  async findMyFollowings(user: User): Promise<ReturnType<typeof this.followRepository.findFollowing>> {
    return await this.followRepository.findFollowing(user.id);
  }

  async follow(user: User, chanelId: string) {
    if (user.id === chanelId) {
      throw new BadRequestException(MESSAGE.ERROR.FOLLOW_YOURSELF);
    }

    const follower = await this.followRepository.findFirst({
      followerId: user.id,
      followingId: chanelId,
    });

    if (follower) {
      throw new ConflictException(MESSAGE.ERROR.ALREADY_FOLLOWING);
    }

    return await this.followRepository.create({
      followerId: user.id,
      followingId: chanelId,
    });
  }

  async unfollow(user: User, chanelId: string) {
    const follower = await this.followRepository.findFirst({
      followerId: user.id,
      followingId: chanelId,
    });

    if (!follower) {
      throw new NotFoundException(MESSAGE.ERROR.FOLLOW_NOT_FOUND);
    }

    return await this.followRepository.delete({
      id: follower.id,
    });
  }
}
