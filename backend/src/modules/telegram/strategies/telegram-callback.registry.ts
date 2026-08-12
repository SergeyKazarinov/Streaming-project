import { Inject, Injectable } from '@nestjs/common';

import { TELEGRAM_CALLBACK_STRATEGY } from '@/shared/consts/key.cons';

import { TELEGRAM_BUTTONS_CALLBACK } from '../types/common';

import { ICallbackStrategy } from './../types/callback-strategy.interface';

@Injectable()
export class TelegramCallbackRegistry {
  private readonly strategies: ReadonlyMap<TELEGRAM_BUTTONS_CALLBACK, ICallbackStrategy>;
  constructor(
    @Inject(TELEGRAM_CALLBACK_STRATEGY)
    strategies: ICallbackStrategy[],
  ) {
    this.strategies = new Map(strategies.map((strategy) => [strategy.dataType, strategy]));
  }

  findStrategy(dataType: string) {
    if (!this.checkDataTypeGuard(dataType)) {
      return undefined;
    }
    return this.strategies.get(dataType);
  }

  private checkDataTypeGuard(dataType: string): dataType is TELEGRAM_BUTTONS_CALLBACK {
    const values: string[] = Object.values(TELEGRAM_BUTTONS_CALLBACK);
    return values.includes(dataType);
  }
}
