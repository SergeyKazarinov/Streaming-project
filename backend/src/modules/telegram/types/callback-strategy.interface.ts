import type { TContext, TELEGRAM_BUTTONS_CALLBACK } from './common';

export interface ICallbackStrategy {
  readonly dataType: TELEGRAM_BUTTONS_CALLBACK;
  execute(ctx: TContext): Promise<void>;
}
