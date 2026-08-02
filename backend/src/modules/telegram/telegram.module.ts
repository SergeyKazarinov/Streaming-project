import { Module } from '@nestjs/common';

import { TELEGRAM_CALLBACK_STRATEGY } from '@/shared/consts/key.cons';

import { TokenModule } from '../repositories/token/token.module';
import { UserModule } from '../repositories/user/user.module';

import { TelegramCallbackRegistry } from './strategies/telegram-callback.registry';
import { TelegramProfileStrategy } from './strategies/telegram-profile.strategy';
import { ICallbackStrategy } from './types/callback-strategy.interface';
import { TelegramService } from './telegram.service';

const strategies = [TelegramProfileStrategy];

@Module({
  imports: [UserModule, TokenModule],
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
