/**
 * Экранирует HTML-теги в строке, для корректного отображения в Telegram
 *
 * @param {string} value - Строка для экранирования
 * @returns {string} - Экранированная строка
 */
export const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
