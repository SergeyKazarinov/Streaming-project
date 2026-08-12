import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FollowService } from '@/modules/follow/follow.service';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { TELEGRAM_MESSAGE } from '@/shared/consts/message.const';

import { ICallbackStrategy } from '../types/callback-strategy.interface';
import { TContext, TELEGRAM_BUTTONS_CALLBACK } from '../types/common';
@Injectable()
export class TelegramFollowingsStrategy implements ICallbackStrategy {
  readonly dataType: TELEGRAM_BUTTONS_CALLBACK = TELEGRAM_BUTTONS_CALLBACK.SUBSCRIPTIONS;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly followService: FollowService,
    private readonly configService: ConfigService,
  ) {}

  async execute(ctx: TContext): Promise<void> {
    const user = await this.userRepository.findUserByTelegramChatId(ctx.chat!.id.toString());

    if (!user) {
      return;
    }
    const followings = await this.followService.findMyFollowings(user);

    await ctx.replyWithHTML(
      TELEGRAM_MESSAGE.INFO.FOLLOWINGS(
        followings.map((following) => following.following),
        this.configService.get<string>('ALLOWED_ORIGINS') || '',
      ),
    );
  }
}
