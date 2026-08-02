import type { User } from 'prisma/generated/prisma/client';

import { escapeHtml } from '../lib/escape-html.util';

type TUser = User & {
  _count?: { followers: number; followings: number };
  stream?: { title: string; isLive: boolean } | null;
  notificationSetting?: { telegramNotificationEnabled: boolean } | null;
};

export const MESSAGE = {
  ERROR: {
    UNAUTHORIZED: 'Неверный логин или пароль',
    NOT_VERIFIED: 'Аккаунт не подтвержден, пожалуйста проверьте свою почту',
    INVALID_TOTP_CODE: 'Неверный код',
    NOT_AUTHORIZED: 'Пользователь не авторизован',
    NOT_FOUNT_SESSION: 'Сессия не найдена',
    CONFLICT_REMOVE_SESSION: 'Текущую сессию удалить нельзя',
    USER_ALREADY_DEACTIVATED: 'Аккаунт уже деактивирован',
    EMAIL_ALREADY_EXISTS: 'Email уже используется',
    USERNAME_ALREADY_EXISTS: 'Пользователь с таким именем уже существует',
    INVALID_OLD_PASSWORD: 'Неверный текущий пароль',
    STREAM_NOT_FOUND: 'Стрим не найден',
    CATEGORY_NOT_FOUND: 'Категория не найдена',
    STREAM_NOT_LIVE: 'Стрим не в прямом эфире',
    FOLLOW_YOURSELF: 'Вы не можете подписаться на самого себя',
    ALREADY_FOLLOWING: 'Вы уже подписаны на этого пользователя',
    FOLLOW_NOT_FOUND: 'Вы не подписаны на этого пользователя',
    CHANNEL_NOT_FOUND: 'Канал не найден',
  },
  INFO: {
    TOTP_ENABLED: 'Двухфакторная аутентификация включена, пожалуйста введите код из приложения',
    DEACTIVATE_ACCOUNT_REQUEST: 'Запрос на деактивацию аккаунта отправлен на вашу почту',
  },
} as const;

export const TELEGRAM_MESSAGE = {
  ERROR: {
    NOT_FOUND_USER: '😕 Аккаунт не найден.\nПроверьте привязку на сайте и попробуйте снова.',
    NOT_FOUND_CHAT: '😕 Не удалось определить чат.\nОткройте бота в личных сообщениях и нажмите /start ещё раз.',
    NOT_VERIFIED_TOKEN:
      '⏳ Ссылка устарела или уже использована.\nСгенерируйте новую в настройках уведомлений на сайте.',
    ERROR_ON_VERIFY: '⚠️ Что-то пошло не так.\nПопробуйте чуть позже — мы уже разбираемся.',
    NO_TOKEN:
      '👋 Привет!\n\nЧтобы получать уведомления о стримах, подпишитесь и подключите Telegram в настройках на сайте.',
  },
  INFO: {
    ALREADY_CONNECTED: '👋 Привет, чем я могу помочь?',

    SUCCESS_VERIFY:
      '🎉 Готово! Аккаунт подключён.\n\nТеперь я буду присылать уведомления о  новых стримах и важных событиях.\n Выберите нужный раздел ниже 👇',

    MENU: '📺 Главное меню\nВыберите, что открыть:',

    PROFILE: (user: TUser) => {
      const registeredAt = user.createdAt.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      return [
        `👤 <b>Профиль</b>`,
        '',
        `<b>${escapeHtml(user.displayName)}</b>${user.isVerified ? ' ✅' : ''}`,
        '',
        `👥 Подписчики: <b>${user._count?.followers ?? 0}</b>`,
        `⭐ Подписки: <b>${user._count?.followings ?? 0}</b>`,
        `📺 Стрим: ${user.stream?.isLive ? `🔴 В эфире: ${escapeHtml(user.stream.title)}` : '⚪ Оффлайн'}`,
        '',
        `📧 Email: <code>${escapeHtml(user.email)}</code>`,
        `✉️ Почта: ${user.isEmailVerified ? 'подтверждена ✅' : 'не подтверждена'}`,
        `🔐 2FA: ${user.isTotpEnabled ? 'включена 🔐' : 'выключена'}`,
        `🔔 Telegram: ${user.notificationSetting?.telegramNotificationEnabled ? 'включены ✅' : 'выключены'}`,
        `📝 О себе: ${user.bio ? escapeHtml(user.bio) : 'не указано'}`,
        `📅 На сайте с ${registeredAt}`,
      ].join('\n');
    },
  },
} as const;
