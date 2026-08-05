import type { User } from 'prisma/generated/prisma/client';

import { escapeHtml } from './escape-html.util';

/**
 * Формирует список каналов и ссылку на канал в виде списка для сообщения в телеграмм
 *
 * @param {User[]} users
 * @param {string} domain
 * @returns {*}
 */
export const getChannelList = (users: User[], domain: string) => {
  return users
    .map((user, index) => {
      const href = `${domain}/${user.username}`;
      const label = escapeHtml(user.username);

      return `${index + 1}. <a href="${href}">${label}</a>`;
    })
    .join('\n');
};
