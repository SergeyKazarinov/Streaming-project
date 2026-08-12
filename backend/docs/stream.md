# Стриминг и LiveKit

## Обзор

Трансляции обеспечиваются [LiveKit](https://livekit.io/). Backend управляет ingress (входной поток для OBS/RTMP), выдаёт viewer-токены и обрабатывает webhook-события о начале/окончании эфира.

## Компоненты

| Модуль | Путь | Назначение |
| --- | --- | --- |
| `StreamModule` | `src/modules/stream/` | CRUD стрима, превью, viewer token |
| `IngressModule` | `src/modules/stream/ingress/` | Создание LiveKit ingress |
| `LivekitModule` | `src/modules/libs/livekit/` | Клиент LiveKit SDK |
| `WebhookModule` | `src/modules/webhook/` | REST webhook от LiveKit |

## Модель Stream

Каждый пользователь имеет один `Stream` (1:1). Поля, связанные с LiveKit:

- `ingressId` — ID ingress в LiveKit
- `serverUrl` — URL сервера для OBS
- `streamKey` — ключ потока
- `isLive` — флаг «в эфире» (обновляется webhook)

## Создание ingress

Мутация `createIngress(ingressType)` (требует авторизации):

1. `IngressService` создаёт комнату/ingress через LiveKit SDK.
2. Параметры (`ingressId`, `serverUrl`, `streamKey`) сохраняются в `Stream`.

Стример использует `serverUrl` + `streamKey` в OBS для начала трансляции.

## Viewer token

Мутация `generateStreamToken(input)`:

```typescript
input: {
  chanelId: string;  // ID канала (user/stream)
  userId: string;    // ID зрителя
}
```

Возвращает JWT-токен для подключения зрителя к комнате LiveKit через `livekit-server-sdk`.

## Webhook LiveKit

`POST /webhook/livekit` — принимает события от LiveKit Server.

- Middleware `RawBodyMiddleware` сохраняет raw body для верификации подписи.
- `WebhookService` обрабатывает события (participant joined/left, room started/finished).
- При старте/остановке эфира обновляется `isLive`, создаются уведомления подписчикам (`STREAM_START`).

## Превью стрима

- `changeThumbnail(file: Upload)` — загрузка превью в S3 через `StorageService` + `sharp`.
- `removeThumbnail` — удаление превью из S3 и обнуление поля.

## Чат стрима

Модуль `ChatMessageModule`:

- `sendMessage(streamId, data)` — отправка сообщения (auth required).
- `findMessagesByStreamId(streamId)` — история чата.
- `subscribeChat(streamId)` — GraphQL subscription для real-time сообщений.

## Категории

Стрим может быть привязан к `Category` через `changeStreamInfo({ categoryId, title })`.

Категории используются для навигации и фильтрации на фронтенде.
