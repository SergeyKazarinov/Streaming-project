# GraphQL API

## Подход

Проект использует **code-first** подход NestJS GraphQL:

- резолверы, input-типы и object-типы описаны декораторами в TypeScript;
- итоговая схема автоматически генерируется в `src/core/graphql/schema.gql` при запуске;
- конфигурация — `src/shared/config/graphql.config.ts`.

```typescript
GraphQLModule.forRootAsync({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
  sortSchema: true,
  graphiql: isDev,
  subscriptions: { 'graphql-ws': true },
});
```

## Структура файлов

```
src/modules/<domain>/
├── <domain>.module.ts
├── <domain>.resolver.ts      # Query / Mutation / Subscription
├── <domain>.service.ts       # Бизнес-логика
├── inputs/                   # Input-типы (@InputType)
└── model/                    # Object-типы (@ObjectType)

src/shared/
├── decorators/
│   ├── auth.decorator.ts     # @Authorization()
│   └── authorized.decorator.ts  # @Authorized()
├── guards/gql-auth.guard.ts
└── inputs/                   # Общие input (FiltersInput, PaginationInput)
```

## Защита эндпоинтов

Публичные операции (регистрация, логин, списки стримов) доступны без сессии.

Защищённые операции помечаются декоратором `@Authorization()`:

```typescript
@Authorization()
@Mutation(() => StreamModel, { name: 'changeStreamInfo' })
async changeStreamInfo(@Authorized() user: User, @Args('data') input: ChangeStreamInfoInput) {
  return this.streamService.changeStreamInfo(user, input);
}
```

`GqlAuthGuard` проверяет `req.session.userId`, загружает пользователя из БД и кладёт в `req.user`.

## Основные операции

### Query

| Операция | Описание | Auth |
| --- | --- | --- |
| `findMe` | Текущий пользователь | ✓ |
| `findAllStreams` | Список стримов с фильтрами | |
| `findRandomStreams` | Случайные стримы | |
| `findAllCategories` | Все категории | |
| `findCategoryBySlug` | Категория по slug | |
| `findRandomCategories` | Случайные категории | |
| `channelByUsername` | Канал по username | |
| `recommendedChannels` | Рекомендуемые каналы | |
| `followersCount` | Число подписчиков | |
| `findMessagesByStreamId` | История чата | |
| `findMyFollowers` / `findMyFollowings` | Подписки | ✓ |
| `findSocialLinksByUser` | Соцссылки | ✓ |
| `findSessionsByUser` / `findCurrentSession` | Сессии | ✓ |
| `notificationList` / `notificationCount` | Уведомления | ✓ |
| `notificationSetting` | Настройки уведомлений | ✓ |
| `generateSecret` | TOTP secret + QR | ✓ |

### Mutation

| Группа | Операции |
| --- | --- |
| Auth | `createUser`, `login`, `logout`, `verifyAccount`, `resetPassword`, `updatePassword` |
| Account | `changeEmail`, `changePassword`, `changeInfoUser`, `changeAvatar`, `removeAvatar` |
| TOTP | `enableTotp`, `disableTotp` |
| Deactivate | `deactivateAccount` |
| Session | `removeSession`, `clearSessionCookie` |
| Stream | `changeStreamInfo`, `changeThumbnail`, `removeThumbnail`, `generateStreamToken`, `createIngress` |
| Follow | `follow`, `unfollow` |
| Chat | `sendMessage` |
| Social | `createSocialLink`, `updateSocialLink`, `removeSocialLink`, `reorderSocialLinks` |
| Notification | `updateNotificationSetting` |

### Subscription

| Операция | Описание |
| --- | --- |
| `subscribeChat(streamId)` | Новые сообщения чата стрима в реальном времени |

## Загрузка файлов

Для мутаций с аватаром и превью стрима используется scalar `Upload` (`graphql-upload-ts`):

```typescript
@Mutation(() => StreamModel, { name: 'changeThumbnail' })
async changeThumbnail(
  @Authorized() user: User,
  @Args('data', { type: () => GraphQLUpload }, FileValidationPipe) file: FileUpload,
) { ... }
```

Middleware `graphqlUploadExpress` подключён в `main.ts` на путь `/graphql`.

## REST-эндпоинты

Помимо GraphQL есть REST webhook:

- `POST /webhook/livekit` — события LiveKit (старт/стоп трансляции).

## Фильтрация и пагинация

Общий input `FiltersInput`:

```typescript
{
  limit?: number;
  offset?: number;
  searchTerm?: string;
}
```

Используется в `findAllStreams` и других list-запросах.

## Subscriptions (PubSub)

Модуль `src/modules/libs/subscriptions` регистрирует глобальный `PubSub`. При отправке сообщения в чат сервис публикует событие, а subscription фильтрует по `streamId`.
