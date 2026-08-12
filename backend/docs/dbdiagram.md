# Диаграмма базы данных

<img width="1280" height="1024" alt="image" src="/backend/docs/streaming-project.svg" alt="Диаграмма БД streaming-project" />

Схема БД для [dbdiagram.io](https://dbdiagram.io/)

```
Enum TokenType {
  EMAIL_VERIFY
  TELEGRAM_VERIFY
  RESET_PASSWORD
  DEACTIVATE_ACCOUNT
}

Enum NotificationType {
  NEW_FOLLOWER
  ENABLE_TWO_FACTOR
  VERIFIED_CHANNEL
  STREAM_START
}

Table users {
  id uuid [primary key, default: `uuid()`]
  email String [unique, not null]
  password String [not null]
  username String [unique, not null]
  display_name String [not null]
  avatar String
  bio String
  is_totp_enabled Boolean [not null, default: false]
  totp_secret String
  is_verified Boolean [not null, default: false]
  is_email_verified Boolean [not null, default: false]
  is_deactivated Boolean [not null, default: false]
  deactivated_at DateTime

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime

  Note: 'User account'
}

Table notifications {
  id uuid [primary key, default: `uuid()`]
  type NotificationType

  user_id uuid [not null]
  is_read bool [default: false]
  text string

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime
}

Table notification_settings {
  id uuid [primary key, default: `uuid()`]

  user_id uuid [not null]
  site_notification_enabled bool [default: true]
  telegram_notification_enabled bool [default: true]

  telegram_chat_id string

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime
}

Table tokens {
  id String [pk, default: `uuid()`]
  token String [unique, not null]
  type TokenType [not null]
  expires_in DateTime [not null]

  user_id uuid [unique, not null]

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime

  Note: 'Auth / verification tokens'
}

Table social_links {
  id String [pk, default: `uuid()`]
  title String [not null]
  url String [not null]
  order Int [not null]

  userId String [not null]

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime [not null]

  Note: 'User social links'
}

Table streams {
  id uuid [pk, default: `uuid()`]
  title String [not null]
  thumbnail_url String
  ingress_id String [unique]
  server_url String
  stream_key String
  is_live Boolean [not null, default: false]

  user_id uuid [unique, not null]
  category_id String

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime

  Note: '1:1 with User'
}

Table categories {
  id String [pk, default: `uuid()`]
  title String [unique, not null]
  slug String [unique, not null]
  description String
  thumbnail_url String

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime

  Note: 'Stream categories'
}

Table chat_messages {
  id uuid [pk, default: `uuid()`]
  text String

  user_id uuid [unique, not null]
  stream_id uuid [not null]

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime
}

Table chat_configs {
  id uuid [pk, default: `uuid()`]
  text String

  user_id uuid [unique, not null]
  stream_id uuid [not null]

  is_chat_enabled bool [default: false]
  is_chat_follower_only bool [default: false]
  is_chat_follower_premium_only bool [default: false]
}

Table follows {
  id uuid [pk, default: `uuid()`]

  follower_id uuid [unique, not null]
  following_id uuid [unique, not null]

  created_at DateTime [not null, default: `now()`]
  updated_at DateTime

  indexes {
    (follower_id, following_id) [unique]
    follower_id
    following_id
  }


}

Ref: tokens.user_id > users.id [delete: cascade]
Ref: social_links.userId > users.id [delete: cascade]
Ref: streams.user_id - users.id [delete: cascade]
Ref: streams.category_id > categories.id
Ref: chat_messages.user_id > users.id [delete: cascade]
Ref: chat_messages.stream_id > streams.id [delete: cascade]
Ref: chat_configs.user_id > users.id [delete: cascade]
Ref: chat_configs.stream_id > streams.id [delete: cascade]
Ref: follows.follower_id > users.id [delete: cascade]
Ref: follows.following_id > users.id [delete: cascade]
Ref: notifications.user_id > users.id [delete: cascade]
Ref: notification_settings.user_id > users.id [delete: cascade]
```
