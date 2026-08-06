import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { FollowRepository } from '@/modules/repositories/follow/follow.repository';

import { MESSAGE } from '@/shared/consts/message.const';

import { NotificationService } from '../notification/notification.service';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async findMyFollowers(user: User) {
    return await this.followRepository.findFollowers(user.id);
  }

  async findMyFollowings(user: User) {
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

    const follow = await this.followRepository.create({
      followerId: user.id,
      followingId: chanelId,
    });

    if (follow.following.notificationSetting?.siteNotificationEnabled) {
      await this.notificationService.createFollowNotification(follow.following.id, follow.follower);
    }

    // if (follow.following.notificationSetting?.telegramNotificationEnabled && follow.following.telegramChatId) {
    //   await this.telegramService.sendNotification(follow.following.telegramChatId);
    // }

    return follow;
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
