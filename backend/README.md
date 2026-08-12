# Архитектура и устройство проекта

## 1) Структура

- **Точка входа** (`src/main.ts`): bootstrap NestJS-приложения, сессии, CORS, загрузка файлов.
- **Core-модуль** (`src/core/**`): глобальная сборка приложения — Prisma, Redis, GraphQL.
- **Feature-модули** (`src/modules/**`): бизнес-логика по доменам (auth, stream, follow, chat и т. д.).
- **Репозитории** (`src/modules/repositories/**`): слой доступа к данным через Prisma.
- **Инфраструктурные библиотеки** (`src/modules/libs/**`): LiveKit, S3-хранилище, GraphQL subscriptions.
- **Shared** (`src/shared/**`): декораторы, guards, pipes, конфиги, утилиты, шаблоны писем.
- **Prisma** (`prisma/**`): схема БД, миграции, seed.

## 2) Карта каталогов

```
backend/
├── src/
│   ├── main.ts                    # Bootstrap приложения
│   ├── core/
│   │   ├── core.module.ts         # Корневой NestJS-модуль
│   │   ├── prisma/                # PrismaService, seed
│   │   ├── redis/                 # Redis-клиент (сессии)
│   │   └── graphql/
│   │       └── schema.gql         # Автогенерируемая GraphQL-схема
│   ├── modules/
│   │   ├── auth/                  # account, session, profile, totp, verification, reset-password, deactivate
│   │   ├── stream/                # Стримы, ingress (LiveKit)
│   │   ├── category/              # Категории стримов
│   │   ├── channel/               # Публичные страницы каналов
│   │   ├── follow/                # Подписки
│   │   ├── chat-message/          # Чат стрима + subscriptions
│   │   ├── notification/          # Уведомления
│   │   ├── social/                # Социальные ссылки профиля
│   │   ├── mail/                  # Отправка email (React Email)
│   │   ├── webhook/               # Webhook LiveKit (REST)
│   │   ├── cron/                  # Планировщик задач
│   │   ├── telegram/              # Telegram-бот (временно отключён)
│   │   ├── repositories/          # Prisma-репозитории
│   │   └── libs/                  # livekit, storage (S3), subscriptions
│   └── shared/                    # Общие декораторы, guards, config, utils
├── prisma/
│   ├── schema.prisma              # Модель данных
│   ├── migrations/                # SQL-миграции
│   └── generated/prisma/          # Сгенерированный Prisma Client
├── docs/                          # Документация
└── docker-compose.yaml            # PostgreSQL + Redis
```

## 3) GraphQL

- **Code-first подход**: резолверы и модели описаны в TypeScript, схема генерируется автоматически в `src/core/graphql/schema.gql`.
- **Конфигурация**: `src/shared/config/graphql.config.ts` — Apollo Driver, GraphiQL в dev, subscriptions через `graphql-ws`.
- **Защита эндпоинтов**: декоратор `@Authorization()` + `GqlAuthGuard` проверяют сессию пользователя.
- **Подписки**: чат стрима (`subscribeChat`) через `PubSub` и WebSocket.

Подробнее — см. раздел [GraphQL](docs/graphql.md).

## 4) Доступ к данным (Prisma)

- **ORM**: Prisma 7 с PostgreSQL-адаптером (`@prisma/adapter-pg`).
- **Схема**: `prisma/schema.prisma` — единый источник правды для моделей.
- **Репозитории**: инкапсулируют запросы Prisma (`UserRepository`, `StreamRepository` и т. д.), сервисы не обращаются к `PrismaService` напрямую.
- **Миграции**: `prisma migrate` / `yarn db:push`; seed — `yarn db:seed`.

## 5) NestJS-модули (сборка приложения)

- `CoreModule` импортирует все feature-модули и инфраструктуру.
- `ConfigModule.forRoot` загружает переменные окружения через `envConfig`.
- Зависимости внедряются через DI NestJS (`@Injectable`, `@Module`).
- Cron-задачи (`@nestjs/schedule`) — очистка деактивированных аккаунтов, предупреждения об удалении.

## 6) Схема БД (обзор)

Ключевые сущности:

| Таблица                 | Назначение                                                  |
| ----------------------- | ----------------------------------------------------------- |
| `users`                 | Пользователи, профиль, TOTP, верификация                    |
| `streams`               | Канал/стрим пользователя, статус эфира, LiveKit ingress     |
| `categories`            | Категории стримов                                           |
| `chat_messages`         | Сообщения чата                                              |
| `follows`               | Подписки (follower → following)                             |
| `notifications`         | Уведомления пользователя                                    |
| `notification_settings` | Настройки уведомлений (сайт / Telegram)                     |
| `social_links`          | Ссылки на соцсети в профиле                                 |
| `tokens`                | Одноразовые токены (верификация, сброс пароля, деактивация) |

Детали — см. раздел [Модель данных](docs/db.md).

---

# [Конфиги](docs/config.md)

# [Модель данных](docs/db.md)

# [GraphQL](docs/graphql.md)

# [Авторизация пользователей](docs/auth.md)

# [Стриминг и LiveKit](docs/stream.md)

# [Deploy](docs/deploy.md)
