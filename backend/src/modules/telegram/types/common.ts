import type { Context } from 'telegraf';
import type { CommandContextExtn } from 'telegraf/typings/telegram-types';

export type TContext = Context &
  CommandContextExtn & {
    update: {
      update_id: number;
      callback_query: {
        id: string;
        data: string;
      };
    };
  };

export enum TELEGRAM_BUTTONS_CALLBACK {
  PROFILE = 'profile',
  SETTINGS = 'settings',
  FOLLOWERS = 'followers',
  SUBSCRIPTIONS = 'subscriptions',
  WEBSITE = 'website',
  LOGOUT = 'logout',
}
