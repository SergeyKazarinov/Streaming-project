import { Field, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

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
  avatar!: string | null;

  @Field(() => Boolean, { description: 'Статус верификации пользователя' })
  isVerified!: boolean;

  @Field(() => Boolean, { description: 'Статус включения TOTP пользователя (двухфакторная аутентификация)' })
  isTotpEnabled!: boolean;

  @Field(() => String, { nullable: true, description: 'Секретный ключ TOTP пользователя' })
  totpSecret!: string | null;

  @Field(() => Boolean, { description: 'Статус верификации пользователя по почте' })
  isEmailVerified!: boolean;

  @Field(() => String, { nullable: true, description: 'Биография пользователя' })
  bio!: string | null;
}

@ObjectType()
export class SecureUserModel extends OmitType(UserModel, ['password']) {}
