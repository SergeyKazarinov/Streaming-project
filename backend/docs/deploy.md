# Deploy

## Локальная разработка

### 1. Зависимости

```bash
cd backend
yarn install
```

### 2. Переменные окружения

Создайте файл `.env` в каталоге `backend/` со всеми переменными из [config.md](config.md).

Минимальный набор для старта:

```env
NODE_ENV=development
APP_PORT=3000
ALLOWED_ORIGINS=http://localhost:5173
GRAPHQL_PREFIX=/graphql

POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=streaming
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/streaming

REDIS_URL=redis://:secret@localhost:6379
REDIS_PASSWORD=secret

SESSION_SECRET=your-session-secret
SESSION_NAME=session_id
SESSION_DOMAIN=localhost
SESSION_MAX_AGE=7d
SESSION_HTTP_ONLY=true
SESSION_SECURE=false
SESSION_FOLDER=sess:
COOKIE_SECRET=your-cookie-secret
```

Также потребуются переменные для SMTP, S3 и LiveKit — см. [config.md](config.md).

### 3. Инфраструктура (Docker)

```bash
docker compose up -d
```

Поднимает:

- **PostgreSQL 15** — порт `5433:5432`
- **Redis 7** — порт `6379`

### 4. База данных

```bash
# Применить миграции
yarn prisma migrate dev

# Или push схемы без миграции (dev)
yarn db:push

# Сгенерировать Prisma Client
yarn update-prisma-client

# Заполнить тестовыми данными
yarn db:seed
```

### 5. Запуск приложения

```bash
# watch mode
yarn start:dev

# production build
yarn build
yarn start:prod
```

GraphQL Playground (GraphiQL) доступен в dev-режиме по адресу `http://localhost:3000/graphql`.

### 6. Prisma Studio

```bash
yarn db:studio
```

### 7. Preview email-шаблонов

```bash
yarn email:dev
```

---

## Скрипты

| Команда           | Описание                 |
| ----------------- | ------------------------ |
| `yarn start:dev`  | Dev-сервер с hot reload  |
| `yarn build`      | Сборка в `dist/`         |
| `yarn start:prod` | Запуск production-сборки |
| `yarn lint`       | ESLint                   |
| `yarn format`     | Prettier                 |
| `yarn test`       | Unit-тесты (Jest)        |
| `yarn test:e2e`   | E2E-тесты                |
| `yarn db:push`    | Prisma db push           |
| `yarn db:seed`    | Seed данных              |
| `yarn db:studio`  | Prisma Studio            |

---

## Production

1. Собрать приложение: `yarn build`.
2. Задать все ENV-переменные в окружении (без `.env` файла — `ignoreEnvFile: true` в production).
3. Применить миграции: `npx prisma migrate deploy`.
4. Запустить: `node dist/main`.
5. Убедиться, что `SESSION_SECURE=true` и `ALLOWED_ORIGINS` указывает на production-домен фронтенда.
6. Настроить webhook LiveKit на `https://<backend-domain>/webhook/livekit`.

---

## CI/CD

Релизы автоматизированы через GitHub Actions (`.github/workflows/release.yml`) с `semantic-release` при push/merge в `main`/`master`.
