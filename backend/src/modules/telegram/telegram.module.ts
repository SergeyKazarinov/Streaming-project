import { Module } from '@nestjs/common';

import { SessionModule } from '@/modules/auth/session/session.module';
import { FollowModule } from '@/modules/follow/follow.module';
import { TokenModule } from '@/modules/repositories/token/token.module';
import { UserModule } from '@/modules/repositories/user/user.module';

import { TELEGRAM_CALLBACK_STRATEGY } from '@/shared/consts/key.cons';

import { TelegramCallbackRegistry } from './strategies/telegram-callback.registry';
import { TelegramFollowersStrategy } from './strategies/telegram-followers.strategy';
import { TelegramFollowingsStrategy } from './strategies/telegram-followings.strategy';
import { TelegramLogoutStrategy } from './strategies/telegram-logout.strategy';
import { TelegramProfileStrategy } from './strategies/telegram-profile.strategy';
import { ICallbackStrategy } from './types/callback-strategy.interface';
import { TelegramService } from './telegram.service';

const strategies = [
  TelegramProfileStrategy,
  TelegramFollowersStrategy,
  TelegramFollowingsStrategy,
  TelegramLogoutStrategy,
];

@Module({
  imports: [UserModule, TokenModule, FollowModule, SessionModule],
  providers: [
    TelegramService,
    TelegramCallbackRegistry,
    ...strategies,
    {
      provide: TELEGRAM_CALLBACK_STRATEGY,
      useFactory: (...strategies: ICallbackStrategy[]) => strategies,
      inject: strategies,
    },
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
