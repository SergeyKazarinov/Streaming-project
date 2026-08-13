# Streaming project

> Технологический стек: Node.js, NestJS 11, GraphQL (Apollo), Prisma, PostgreSQL, Redis, LiveKit, S3, Docker Compose, GitHub Actions, SonarQube.

## Назначение

Платформа для live-стриминга: регистрация и аутентификация пользователей, профили и каналы, подписки, категории и стримы, чат в реальном времени, уведомления, интеграция с LiveKit для трансляций, хранение медиа в S3.

Каждый пользователь при регистрации получает свой канал (`Stream`). Стример может настроить ingress через LiveKit, а зрители — смотреть трансляцию и общаться в чате.

## Документация

- [C4-модель — архитектура системы](docs/c4-model/README.md)
- [Backend — архитектура и устройство проекта](backend/README.md)
- [Changelog](CHANGELOG.md)

