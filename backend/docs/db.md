# Схема базы данных

Модель описана в `prisma/schema.prisma`. Миграции хранятся в `prisma/migrations/`.

<img width="1280" height="1024" src="/backend/docs/streaming-project.svg" alt="Диаграмма БД streaming-project" />

Диаграмма — см. [dbdiagram](dbdiagram.md).

## users

Учётная запись стримера/зрителя. Содержит credentials, профиль, флаги верификации и TOTP. При регистрации автоматически создаётся связанный `Stream`.

| Column              | Type        | Nullable | Notes              | Description                                             |
| ------------------- | ----------- | -------- | ------------------ | ------------------------------------------------------- |
| `id`                | `uuid`      | NO       | PK                 |                                                         |
| `email`             | `text`      | NO       | unique             | Email для входа и уведомлений                           |
| `password`          | `text`      | NO       | bcrypt hash        | Хеш пароля                                              |
| `username`          | `text`      | NO       | unique             | Уникальный логин, используется в URL канала             |
| `display_name`      | `text`      | NO       |                    | Отображаемое имя на сайте                               |
| `avatar`            | `text`      | YES      | URL в S3           | URL аватара                                             |
| `bio`               | `text`      | YES      |                    | Краткое описание профиля                                |
| `is_totp_enabled`   | `boolean`   | NO       | default `false`    | Включена ли двухфакторная аутентификация                |
| `totp_secret`       | `text`      | YES      |                    | Секретный ключ TOTP                                     |
| `is_verified`       | `boolean`   | NO       | верификация канала | Верифицирован ли канал (бейдж)                          |
| `is_email_verified` | `boolean`   | NO       |                    | Подтверждён ли email                                    |
| `is_deactivated`    | `boolean`   | NO       |                    | Аккаунт деактивирован пользователем                     |
| `deactivated_at`    | `timestamp` | YES      |                    | Дата деактивации, используется для отложенного удаления |
| `telegram_chat_id`  | `text`      | YES      |                    | ID чата Telegram для push-уведомлений                   |
| `created_at`        | `timestamp` | NO       |                    | Дата регистрации                                        |
| `updated_at`        | `timestamp` | NO       |                    | Дата последнего изменения записи                        |

---

## streams

Канал пользователя. Хранит метаданные трансляции и параметры LiveKit ingress. Флаг `is_live` обновляется через webhook.

| Column          | Type        | Nullable | Notes                   | Description                       |
| --------------- | ----------- | -------- | ----------------------- | --------------------------------- |
| `id`            | `uuid`      | NO       | PK                      |                                   |
| `title`         | `text`      | NO       |                         | Название стрима / канала          |
| `thumbnail_url` | `text`      | YES      |                         | URL превью трансляции             |
| `ingress_id`    | `text`      | YES      | unique, LiveKit ingress | ID ingress в LiveKit              |
| `server_url`    | `text`      | YES      | LiveKit server URL      | URL сервера для OBS               |
| `stream_key`    | `text`      | YES      |                         | Ключ потока для OBS / RTMP        |
| `is_live`       | `boolean`   | NO       | default `false`         | Идёт ли трансляция в прямом эфире |
| `user_id`       | `uuid`      | NO       | unique, FK → `users`    | Владелец канала (1:1)             |
| `category_id`   | `uuid`      | YES      | FK → `categories`       | Категория стрима                  |
| `created_at`    | `timestamp` | NO       |                         | Дата создания канала              |
| `updated_at`    | `timestamp` | NO       |                         | Дата последнего изменения         |

---

## categories

Справочник категорий (игры, музыка и т. п.) для группировки стримов.

| Column          | Type        | Nullable | Notes  | Description               |
| --------------- | ----------- | -------- | ------ | ------------------------- |
| `id`            | `uuid`      | NO       | PK     |                           |
| `title`         | `text`      | NO       | unique | Название категории        |
| `slug`          | `text`      | NO       | unique | URL-slug для навигации    |
| `description`   | `text`      | YES      |        | Описание категории        |
| `thumbnail_url` | `text`      | YES      |        | URL обложки категории     |
| `created_at`    | `timestamp` | NO       |        | Дата создания             |
| `updated_at`    | `timestamp` | NO       |        | Дата последнего изменения |

---

## chat_messages

Сообщения чата, привязанные к конкретному стриму и автору.

| Column       | Type        | Nullable | Notes          | Description                           |
| ------------ | ----------- | -------- | -------------- | ------------------------------------- |
| `id`         | `uuid`      | NO       | PK             |                                       |
| `text`       | `text`      | NO       |                | Текст сообщения                       |
| `stream_id`  | `uuid`      | NO       | FK → `streams` | Стрим, к которому относится сообщение |
| `user_id`    | `uuid`      | NO       | FK → `users`   | Автор сообщения                       |
| `created_at` | `timestamp` | NO       |                | Дата отправки                         |
| `updated_at` | `timestamp` | YES      |                | Дата редактирования                   |

---

## follows

Подписка одного пользователя на другого.

| Column         | Type        | Nullable | Notes        | Description               |
| -------------- | ----------- | -------- | ------------ | ------------------------- |
| `id`           | `uuid`      | NO       | PK           |                           |
| `follower_id`  | `uuid`      | NO       | FK → `users` | Кто подписался            |
| `following_id` | `uuid`      | NO       | FK → `users` | На кого подписались       |
| `created_at`   | `timestamp` | NO       |              | Дата подписки             |
| `updated_at`   | `timestamp` | YES      |              | Дата последнего изменения |

---

## notifications

In-app уведомления пользователя. Тип задаётся enum `notification_types`: `NEW_FOLLOWER`, `ENABLE_TWO_FACTOR`, `VERIFIED_CHANNEL`, `STREAM_START`.

| Column       | Type                 | Nullable | Notes                           | Description               |
| ------------ | -------------------- | -------- | ------------------------------- | ------------------------- |
| `id`         | `uuid`               | NO       | PK                              |                           |
| `type`       | `notification_types` | NO       | enum                            | Тип события               |
| `user_id`    | `uuid`               | NO       | FK → `users`, ON DELETE CASCADE | Получатель уведомления    |
| `is_read`    | `boolean`            | NO       | default `false`                 | Прочитано ли уведомление  |
| `text`       | `text`               | NO       |                                 | Текст уведомления         |
| `created_at` | `timestamp`          | NO       |                                 | Дата создания             |
| `updated_at` | `timestamp`          | YES      |                                 | Дата последнего изменения |

---

## notification_settings

Настройки доставки уведомлений: сайт и Telegram.

| Column                          | Type        | Nullable | Notes                | Description               |
| ------------------------------- | ----------- | -------- | -------------------- | ------------------------- |
| `id`                            | `uuid`      | NO       | PK                   |                           |
| `user_id`                       | `uuid`      | NO       | unique, FK → `users` | Пользователь (1:1)        |
| `site_notification_enabled`     | `boolean`   | NO       | default `true`       | Уведомления на сайте      |
| `telegram_notification_enabled` | `boolean`   | NO       | default `false`      | Уведомления в Telegram    |
| `created_at`                    | `timestamp` | NO       |                      | Дата создания настроек    |
| `updated_at`                    | `timestamp` | YES      |                      | Дата последнего изменения |

---

## social_links

Ссылки на соцсети в профиле пользователя.

| Column       | Type        | Nullable | Notes               | Description                           |
| ------------ | ----------- | -------- | ------------------- | ------------------------------------- |
| `id`         | `uuid`      | NO       | PK                  |                                       |
| `title`      | `text`      | NO       |                     | Название ссылки (например, «YouTube») |
| `url`        | `text`      | NO       |                     | URL социальной сети                   |
| `order`      | `int`       | NO       | порядок отображения | Порядок отображения в профиле         |
| `user_id`    | `uuid`      | NO       | FK → `users`        | Владелец ссылки                       |
| `created_at` | `timestamp` | NO       |                     | Дата добавления                       |
| `updated_at` | `timestamp` | YES      |                     | Дата последнего изменения             |

---

## tokens

Одноразовые токены для email-верификации, сброса пароля, деактивации аккаунта и привязки Telegram. Тип задаётся enum `token_types`: `EMAIL_VERIFY`, `TELEGRAM_VERIFY`, `RESET_PASSWORD`, `DEACTIVATE_ACCOUNT`.

| Column       | Type          | Nullable | Notes        | Description               |
| ------------ | ------------- | -------- | ------------ | ------------------------- |
| `id`         | `uuid`        | NO       | PK           |                           |
| `token`      | `text`        | NO       | unique       | Значение токена           |
| `type`       | `token_types` | NO       | enum         | Назначение токена         |
| `expires_in` | `timestamp`   | NO       |              | Срок действия             |
| `user_id`    | `uuid`        | NO       | FK → `users` | Пользователь              |
| `created_at` | `timestamp`   | NO       |              | Дата создания             |
| `updated_at` | `timestamp`   | YES      |              | Дата последнего изменения |
