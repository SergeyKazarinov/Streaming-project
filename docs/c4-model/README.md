# C4-модель — Streaming Project

Архитектурная документация платформы live-стриминга в нотации [C4 Model](https://c4model.com/).

Диаграммы описывают **целевое состояние** системы: backend уже реализован, frontend (Next.js) и Telegram-интеграция — в планах.

## Уровни модели

| Уровень       | Вопрос                                                                    | Файл                               |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| **Context**   | Кто использует систему и с какими внешними сервисами она взаимодействует? | [Context.webp](./Context.webp)     |
| **Container** | Из каких приложений и хранилищ состоит платформа?                         | [Container.webp](./Container.webp) |
| **Component** | Из каких модулей состоит Backend API?                                     | [Component.webp](./Component.webp) |

Исходник диаграмм: [c4.dio](./c4.dio) (draw.io / diagrams.net, библиотека C4).

---

## Level 1 — System Context

Контекстная диаграмма показывает **Streaming Project** как единую систему в окружении пользователей и внешних сервисов.

<img width="1280" height="1024" src="/docs/c4-model/Context.webp" alt="Диаграмма контекста" />

---

## Level 2 — Container

Контейнерная диаграмма раскрывает **Streaming Project** на отдельно деплоимые части.

<img width="1280" height="1024" src="/docs/c4-model/Container.webp" alt="Диаграмма контейнера" />

---

## Level 3 — Component

Компонентная диаграмма детализирует контейнер **Backend API** (NestJS).

<img width="1280" height="1024" src="/docs/c4-model/Component.webp" alt="Диаграмма контейнера" />

---

## Связанная документация

- [Backend — архитектура и устройство проекта](../../backend/README.md)
- [Стриминг и LiveKit](../../backend/docs/stream.md)
- [Авторизация пользователей](../../backend/docs/auth.md)
