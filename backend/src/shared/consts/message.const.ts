export const MESSAGE = {
  ERROR: {
    UNAUTHORIZED: 'Неверный логин или пароль',
    NOT_VERIFIED: 'Аккаунт не подтвержден, пожалуйста проверьте свою почту',
    INVALID_TOTP_CODE: 'Неверный код',
    NOT_AUTHORIZED: 'Пользователь не авторизован',
    NOT_FOUNT_SESSION: 'Сессия не найдена',
    CONFLICT_REMOVE_SESSION: 'Текущую сессию удалить нельзя',
  },
  INFO: {
    TOTP_ENABLED: 'Двухфакторная аутентификация включена, пожалуйста введите код из приложения',
    DEACTIVATE_ACCOUNT_REQUEST: 'Запрос на деактивацию аккаунта отправлен на вашу почту',
  },
} as const;
