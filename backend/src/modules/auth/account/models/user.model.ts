import { Field, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import { ChatMessageModel } from '@/modules/chat-message/model/chat-message.model';
import { FollowModel } from '@/modules/follow/model/follow.model';
import { NotificationSettingModel } from '@/modules/notification/model/notification-setting.model';
import { SocialLinkModel } from '@/modules/social/models/social-link.model';
import { StreamModel } from '@/modules/stream/model/stream.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType({ description: 'Модель пользователя' })
export class UserModel extends MetaModel implements User {
  @Field(() => ID, { description: 'ID пользователя' })
  id!: string;

  @Field(() => ID, { description: 'Email пользователя' })
  email!: string;

  @Field(() => String, { description: 'Пароль пользователя' })
  password!: string;

  @Field(() => String, { description: 'Имя пользователя' })
  username!: string;

  @Field(() => String, { description: 'Имя пользователя, отображаемое на сайте' })
  displayName!: string;

  @Field(() => String, { nullable: true, description: 'Аватар пользователя' })
  avatar!: Nullable<string>;

  @Field(() => Boolean, { description: 'Статус верификации пользователя' })
  isVerified!: boolean;

  @Field(() => Boolean, { description: 'Статус включения TOTP пользователя (двухфакторная аутентификация)' })
  isTotpEnabled!: boolean;

  @Field(() => String, { nullable: true, description: 'Секретный ключ TOTP пользователя' })
  totpSecret!: Nullable<string>;

  @Field(() => Boolean, { description: 'Статус верификации пользователя по почте' })
  isEmailVerified!: boolean;

  @Field(() => Boolean, { description: 'Статус деактивации пользователя' })
  isDeactivated!: boolean;

  @Field(() => Date, { nullable: true, description: 'Дата деактивации пользователя' })
  deactivatedAt!: Nullable<Date>;

  @Field(() => String, { nullable: true, description: 'Биография пользователя' })
  bio!: Nullable<string>;

  @Field(() => [SocialLinkModel], { description: 'Социальные ссылки пользователя' })
  socialLinks?: SocialLinkModel[];

  @Field(() => StreamModel, { nullable: true, description: 'Стрим пользователя' })
  stream?: StreamModel;

  @Field(() => [ChatMessageModel], { description: 'Сообщения чата пользователя' })
  chatMessages?: ChatMessageModel[];

  @Field(() => [FollowModel], { description: 'Подписки пользователя' })
  followings?: FollowModel[];

  @Field(() => [FollowModel], { description: 'Подписчики пользователя' })
  followers?: FollowModel[];

  @Field(() => NotificationSettingModel, { nullable: true, description: 'Настройки уведомлений пользователя' })
  notificationSetting?: NotificationSettingModel;

  @Field(() => String, { nullable: true, description: 'ID чата в телеграмме' })
  telegramChatId!: Nullable<string>;
}

@ObjectType()
export class SecureUserModel extends OmitType(UserModel, ['password']) {}
