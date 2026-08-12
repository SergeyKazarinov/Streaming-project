import * as OTPAuth from 'otpauth';

/**
 * Генерирует объект TOTP
 * @param {string} email - email пользователя для идентификации в TOTP
 * @param {string} secret - секретный ключ пользователя
 * @returns {OTPAuth.TOTP} объект TOTP
 */
export const generateTotpObject = (email: string, secret: string): OTPAuth.TOTP => {
  return new OTPAuth.TOTP({
    issuer: 'Streaming-project',
    label: email,
    secret,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
  });
};
