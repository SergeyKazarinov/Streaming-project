import { Module } from '@nestjs/common';

import { TELEGRAM_CALLBACK_STRATEGY } from '@/shared/consts/key.cons';

import { FollowModule } from '../follow/follow.module';
import { TokenModule } from '../repositories/token/token.module';
import { UserModule } from '../repositories/user/user.module';

import { TelegramCallbackRegistry } from './strategies/telegram-callback.registry';
import { TelegramFollowersStrategy } from './strategies/telegram-followers.strategy';
import { TelegramFollowingsStrategy } from './strategies/telegram-followings.strategy';
import { TelegramProfileStrategy } from './strategies/telegram-profile.strategy';
import { ICallbackStrategy } from './types/callback-strategy.interface';
import { TelegramService } from './telegram.service';

const strategies = [TelegramProfileStrategy, TelegramFollowersStrategy, TelegramFollowingsStrategy];

@Module({
  imports: [UserModule, TokenModule, FollowModule],
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
})
export class TelegramModule {}
