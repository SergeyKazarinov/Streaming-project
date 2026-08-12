import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';

import { FollowModel } from './model/follow.model';
import { FollowService } from './follow.service';

@Resolver('Follow')
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Authorization()
  @Query(() => [FollowModel], { name: 'findMyFollowers' })
  async findMyFollowers(@Authorized() user: User): Promise<ReturnType<typeof this.followService.findMyFollowers>> {
    return await this.followService.findMyFollowers(user);
  }

  @Authorization()
  @Query(() => [FollowModel], { name: 'findMyFollowings' })
  async findMyFollowings(@Authorized() user: User): Promise<ReturnType<typeof this.followService.findMyFollowings>> {
    return await this.followService.findMyFollowings(user);
  }

  @Authorization()
  @Mutation(() => FollowModel, { name: 'follow' })
  async follow(@Authorized() user: User, @Args('chanelId') chanelId: string) {
    return await this.followService.follow(user, chanelId);
  }

  @Authorization()
  @Mutation(() => FollowModel, { name: 'unfollow' })
  async unfollow(@Authorized() user: User, @Args('chanelId') chanelId: string) {
    return await this.followService.unfollow(user, chanelId);
  }
}
