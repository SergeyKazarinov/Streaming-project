# Пользователи и аутентификация

## Обзор

- **Механизм**: cookie-based сессии (`express-session`) с хранением в Redis.
- **Пароли**: bcrypt hash при регистрации и смене пароля.
- **2FA**: опциональный TOTP (`otpauth`).
- **Верификация email**: одноразовый токен (`TokenType.EMAIL_VERIFY`) + письмо через SMTP.

Клиент должен отправлять запросы с `credentials: true` (cookies). CORS настроен на `ALLOWED_ORIGINS`.

---

## Компоненты

### SessionService

`src/modules/auth/session/session.service.ts` — логин, логаут, управление сессиями.

При успешном логине:

1. Проверяется email-верификация.
2. При включённом TOTP — валидируется `totpCode`.
3. Сессия сохраняется в Redis через `saveSession`.
4. В сессию записываются `userId`, `createdAt`, `metadata` (IP, устройство, геолокация).

### GqlAuthGuard

`src/shared/guards/gql-auth.guard.ts`:

```typescript
if (!request.session.userId) {
  throw new UnauthorizedException('Пользователь не авторизован');
}
const user = await this.userRepository.findUniqueUserById(request.session.userId);
request.user = user;
```

### Декораторы

- `@Authorization()` — включает `GqlAuthGuard` на resolver-методе.
- `@Authorized()` / `@Authorized('id')` — извлекает пользователя (или поле) из `req.user`.

### SecureUserModel

Публичное представление пользователя без чувствительных полей (`password`, `totpSecret`). Формируется утилитой `secureUser()`.

---

## Поток регистрации

1. `createUser` — проверка уникальности username/email, hash пароля.
2. Создание `User` + связанного `Stream`.
3. Отправка письма верификации (`VerificationService.sendVerificationToken`).
4. Создание `NotificationSetting` с дефолтными значениями.

## Поток логина

1. Клиент вызывает `login(data: LoginInput)`.
2. Проверка credentials + email verification + TOTP (если включён).
3. При деактивированном аккаунте — автоматическая реактивация.
4. Ответ: `AuthModel { user: SecureUserModel }` + Set-Cookie с session id.

## Поток logout

1. `logout` — уничтожение сессии (`destroySession`) + очистка cookie.

## Управление сессиями

- `findSessionsByUser` — список активных сессий пользователя (из Redis).
- `removeSession(id)` — удаление конкретной сессии.
- `clearSessionCookie` — очистка cookie без удаления серверной сессии.

Метаданные сессии (`SessionMetadata`): IP, браузер, ОС, тип устройства, геолокация (geoip-lite + device-detector-js).

---

## TOTP (двухфакторная аутентификация)

1. `generateSecret` — генерация secret + QR-код.
2. `enableTotp(input)` — подтверждение первым кодом, сохранение `totpSecret`.
3. При логине, если `isTotpEnabled`, первый вызов без `totpCode` возвращает сообщение; второй — с кодом.

## Сброс пароля

1. `resetPassword(email)` — отправка письма с токеном `RESET_PASSWORD`.
2. `updatePassword(token, newPassword)` — смена пароля по токену.

## Деактивация аккаунта

1. `deactivateAccount` — проверка пароля, установка `isDeactivated`, отправка письма с токеном подтверждения.
2. Cron-задача через 6 дней — предупреждение об удалении.
3. Cron-задача через 7 дней — удаление аккаунта, аватара из S3.

---

## Токены (Token)

Одноразовые токены хранятся в таблице `tokens`:

| TokenType | Назначение |
| --- | --- |
| `EMAIL_VERIFY` | Подтверждение email |
| `RESET_PASSWORD` | Сброс пароля |
| `DEACTIVATE_ACCOUNT` | Подтверждение деактивации |
| `TELEGRAM_VERIFY` | Привязка Telegram-бота |

Токены имеют срок действия (`expiresIn`) и удаляются после использования.

---

## Использование в коде

```typescript
@Authorization()
@Query(() => SecureUserModel, { name: 'findMe' })
async findMe(@Authorized() user: User) {
  return secureUser(user);
}
```

Для HTTP-контроллеров (webhook) guard не применяется — webhook LiveKit авторизуется через заголовок `Authorization`.
