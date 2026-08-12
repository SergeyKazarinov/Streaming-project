import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import type { Notification } from 'prisma/generated/prisma/client';

import { MetaModel } from '@/shared/models/meta.model';

enum NotificationType {
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  ENABLE_TWO_FACTOR = 'ENABLE_TWO_FACTOR',
  VERIFIED_CHANNEL = 'VERIFIED_CHANNEL',
  STREAM_START = 'STREAM_START',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Тип уведомления',
});

@ObjectType()
export class NotificationModel extends MetaModel implements Notification {
  @Field(() => ID, { description: 'ID уведомления' })
  id!: string;

  @Field(() => String, { description: 'ID пользователя' })
  userId!: string;

  @Field(() => Boolean, { description: 'Статус прочтения уведомления' })
  isRead!: boolean;

  @Field(() => String, { description: 'Текст уведомления' })
  text!: string;

  @Field(() => NotificationType, { description: 'Тип уведомления' })
  type!: NotificationType;
}
