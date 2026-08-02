import { Markup } from 'telegraf';

import { TELEGRAM_BUTTONS_CALLBACK } from './types/common';

export const TELEGRAM_BUTTONS = {
  SuccessConnection: Markup.inlineKeyboard([
    [
      Markup.button.callback('👤 Профиль', TELEGRAM_BUTTONS_CALLBACK.PROFILE),
      Markup.button.callback('⚙️ Настройки', TELEGRAM_BUTTONS_CALLBACK.SETTINGS),
    ],
    [
      Markup.button.callback('👥 Подписчики', TELEGRAM_BUTTONS_CALLBACK.FOLLOWERS),
      Markup.button.callback('⭐ Подписки', TELEGRAM_BUTTONS_CALLBACK.SUBSCRIPTIONS),
    ],
    [Markup.button.url('🌐 Открыть сайт', 'https://tlgrm.ru/docs/bots#deep-linking')],
    [Markup.button.callback('Выйти', TELEGRAM_BUTTONS_CALLBACK.LOGOUT)],
  ]),
} as const;
