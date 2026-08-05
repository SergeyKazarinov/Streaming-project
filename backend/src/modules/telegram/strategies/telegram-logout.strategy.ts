import { Injectable } from '@nestjs/common';

import { SessionService } from '@/modules/auth/session/session.service';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { TELEGRAM_MESSAGE } from '@/shared/consts/message.const';

import { ICallbackStrategy } from '../types/callback-strategy.interface';
import { TContext, TELEGRAM_BUTTONS_CALLBACK } from '../types/common';

@Injectable()
export class TelegramLogoutStrategy implements ICallbackStrategy {
  readonly dataType: TELEGRAM_BUTTONS_CALLBACK = TELEGRAM_BUTTONS_CALLBACK.LOGOUT;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  async execute(ctx: TContext): Promise<void> {
    const user = await this.userRepository.findUserByTelegramChatId(ctx.chat!.id.toString());

    if (!user) {
      return;
    }

    try {
      await this.sessionService.removeSessionByUserId(user.id);

      await ctx.replyWithHTML(TELEGRAM_MESSAGE.INFO.LOGOUT.SUCCESS);
    } catch {
      await ctx.replyWithHTML(TELEGRAM_MESSAGE.INFO.LOGOUT.LOGOUT_FAILED);
    }
  }
}
