import { Injectable } from '@nestjs/common';

import { FollowService } from '@/modules/follow/follow.service';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { TELEGRAM_MESSAGE } from '@/shared/consts/message.const';

import { ICallbackStrategy } from '../types/callback-strategy.interface';
import { TContext, TELEGRAM_BUTTONS_CALLBACK } from '../types/common';
@Injectable()
export class TelegramFollowersStrategy implements ICallbackStrategy {
  readonly dataType: TELEGRAM_BUTTONS_CALLBACK = TELEGRAM_BUTTONS_CALLBACK.FOLLOWERS;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly followService: FollowService,
  ) {}

  async execute(ctx: TContext): Promise<void> {
    const user = await this.userRepository.findUserByTelegramChatId(ctx.chat!.id.toString());

    if (!user) {
      return;
    }
    const followers = await this.followService.findMyFollowers(user);

    await ctx.replyWithHTML(TELEGRAM_MESSAGE.INFO.FOLLOWERS(followers.map((follower) => follower.follower)));
  }
}
