import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { NotificationSetting } from 'prisma/generated/prisma/client';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class NotificationSettingModel extends MetaModel implements NotificationSetting {
  @Field(() => ID, { description: 'ID настройки уведомлений' })
  id!: string;

  @Field(() => String, { description: 'ID пользователя' })
  userId!: string;

  @Field(() => Boolean, { description: 'Статус включения уведомлений на сайте' })
  siteNotificationEnabled!: boolean;
}
