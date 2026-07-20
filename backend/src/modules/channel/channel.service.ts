import { Injectable, NotFoundException } from '@nestjs/common';

import { SecureUserModel } from '@/modules/auth/account/models/user.model';
import { FollowRepository } from '@/modules/repositories/follow/follow.repository';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { MESSAGE } from '@/shared/consts/message.const';

@Injectable()
export class ChannelService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  async findRecommendedChannels(): Promise<SecureUserModel[]> {
    const channels = await this.userRepository.findMany(
      {},
      {
        followers: true,
        followings: true,
        stream: true,
      },
      {
        followings: {
          _count: 'desc',
        },
      },
      7,
    );

    return channels;
  }

  async findChannelsByUsername(username: string): Promise<SecureUserModel> {
    const channel = await this.userRepository.findUniqueUserByUsername(username);

    if (!channel) {
      throw new NotFoundException(MESSAGE.ERROR.CHANNEL_NOT_FOUND);
    }

    return channel;
  }

  async findFollowersCountByChannel(channelId: string): Promise<number> {
    return await this.followRepository.findFollowersCountByUserId(channelId);
  }
}
