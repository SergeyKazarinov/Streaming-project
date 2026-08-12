import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/modules/repositories/user/user.repository';

import { TELEGRAM_MESSAGE } from '@/shared/consts/message.const';

import { ICallbackStrategy } from '../types/callback-strategy.interface';
import { TContext, TELEGRAM_BUTTONS_CALLBACK } from '../types/common';

@Injectable()
export class TelegramProfileStrategy implements ICallbackStrategy {
  readonly dataType = TELEGRAM_BUTTONS_CALLBACK.PROFILE;
  constructor(private readonly userRepository: UserRepository) {}

  async execute(ctx: TContext): Promise<void> {
    const user = await this.userRepository.findUserByTelegramChatId(ctx.chat!.id.toString());
    if (user) {
      await ctx.replyWithHTML(TELEGRAM_MESSAGE.INFO.PROFILE(user));
    }
  }
}
