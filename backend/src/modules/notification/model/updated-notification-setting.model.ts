import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatedNotificationSettingModel {
  @Field(() => Boolean, { description: 'Статус обновления настройки уведомлений' })
  updated!: boolean;

  @Field(() => String, { description: 'Токен для верификации в телеграмме' })
  telegramToken!: Nullable<string>;
}
