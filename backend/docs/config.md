# ENV переменные

Переменные читаются из `.env` (в dev) или из окружения контейнера/сервера. Часть значений дублируется в `src/shared/config/env-config.ts`.

## Приложение

| Переменная        | Назначение                  | Пример                       |
| ----------------- | --------------------------- | ---------------------------- |
| `NODE_ENV`        | Режим работы                | `development` / `production` |
| `APP_PORT`        | Порт HTTP-сервера           | `3000`                       |
| `ALLOWED_ORIGINS` | CORS origin (URL фронтенда) | `http://localhost:5173`      |
| `GRAPHQL_PREFIX`  | Путь GraphQL-эндпоинта      | `/graphql`                   |

## PostgreSQL

| Переменная          | Назначение                                             | Пример                                |
| ------------------- | ------------------------------------------------------ | ------------------------------------- |
| `POSTGRES_HOST`     | Хост БД                                                | `localhost`                           |
| `POSTGRES_PORT`     | Порт БД                                                | `5432`                                |
| `POSTGRES_USER`     | Пользователь                                           | `postgres`                            |
| `POSTGRES_PASSWORD` | Пароль                                                 | `postgres`                            |
| `POSTGRES_DATABASE` | Имя базы                                               | `streaming`                           |
| `DATABASE_URL`      | Полная строка подключения (используется PrismaService) | `postgresql://user:pass@host:5432/db` |

## Redis

| Переменная       | Назначение                    | Пример                             |
| ---------------- | ----------------------------- | ---------------------------------- |
| `REDIS_URL`      | URL подключения к Redis       | `redis://:password@localhost:6379` |
| `REDIS_PASSWORD` | Пароль Redis (docker-compose) | `secret`                           |

## Сессии

| Переменная          | Назначение                    | Пример           |
| ------------------- | ----------------------------- | ---------------- |
| `SESSION_SECRET`    | Секрет для подписи сессии     | случайная строка |
| `SESSION_NAME`      | Имя cookie сессии             | `session_id`     |
| `SESSION_DOMAIN`    | Domain cookie                 | `localhost`      |
| `SESSION_MAX_AGE`   | Время жизни сессии            | `7d`             |
| `SESSION_HTTP_ONLY` | HttpOnly cookie               | `true`           |
| `SESSION_SECURE`    | Secure cookie (HTTPS)         | `false` / `true` |
| `SESSION_FOLDER`    | Префикс ключей сессий в Redis | `sess:`          |
| `COOKIE_SECRET`     | Секрет для cookie-parser      | случайная строка |

## Почта (SMTP)

| Переменная      | Назначение            | Пример                |
| --------------- | --------------------- | --------------------- |
| `MAIL_HOST`     | SMTP-хост             | `smtp.gmail.com`      |
| `MAIL_PORT`     | SMTP-порт             | `587`                 |
| `MAIL_USER`     | Логин                 | `user@example.com`    |
| `MAIL_PASSWORD` | Пароль / app password | `***`                 |
| `MAIL_FROM`     | Адрес отправителя     | `noreply@example.com` |

## S3 (хранилище медиа)

| Переменная       | Назначение                         | Пример                     |
| ---------------- | ---------------------------------- | -------------------------- |
| `S3_ENDPOINT`    | Endpoint S3-совместимого хранилища | `https://s3.amazonaws.com` |
| `S3_REGION`      | Регион                             | `eu-central-1`             |
| `S3_BUCKET_NAME` | Имя бакета                         | `streaming-media`          |
| `S3_KEY_ID`      | Access Key ID                      | `***`                      |
| `S3_SECRET_KEY`  | Secret Access Key                  | `***`                      |

## LiveKit

| Переменная           | Назначение         | Пример                        |
| -------------------- | ------------------ | ----------------------------- |
| `LIVEKIT_API_URL`    | URL LiveKit Server | `https://livekit.example.com` |
| `LIVEKIT_API_KEY`    | API Key            | `***`                         |
| `LIVEKIT_API_SECRET` | API Secret         | `***`                         |

## Telegram (опционально, модуль временно отключён)

| Переменная           | Назначение          | Пример |
| -------------------- | ------------------- | ------ |
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота | `***`  |
