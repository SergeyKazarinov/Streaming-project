import { Args, Query, Resolver } from '@nestjs/graphql';

import { SecureUserModel } from '@/modules/auth/account/models/user.model';

import { ChannelService } from './channel.service';

@Resolver('Channel')
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => Number, { name: 'followersCount' })
  async followersCount(
    @Args('channelId') channelId: string,
  ): Promise<ReturnType<ChannelService['findFollowersCountByChannel']>> {
    return this.channelService.findFollowersCountByChannel(channelId);
  }

  @Query(() => [SecureUserModel], { name: 'recommendedChannels' })
  async recommendedChannels(): Promise<ReturnType<ChannelService['findRecommendedChannels']>> {
    return this.channelService.findRecommendedChannels();
  }

  @Query(() => SecureUserModel, { name: 'channelByUsername' })
  async channelByUsername(
    @Args('username') username: string,
  ): Promise<ReturnType<ChannelService['findChannelsByUsername']>> {
    return this.channelService.findChannelsByUsername(username);
  }
}
