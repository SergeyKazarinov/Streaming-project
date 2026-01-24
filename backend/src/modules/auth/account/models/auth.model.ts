import { Field, ObjectType } from '@nestjs/graphql';

import { SecureUserModel } from './user.model';

@ObjectType({ description: 'Модель авторизации пользователя' })
export class AuthModel {
  @Field(() => String, { nullable: true, description: 'Сообщение об ошибке' })
  message?: string;

  @Field(() => SecureUserModel, { nullable: true, description: 'Авторизованный пользователь' })
  user?: SecureUserModel;
}
