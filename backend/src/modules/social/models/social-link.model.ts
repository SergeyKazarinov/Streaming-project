import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'prisma/generated/prisma/models';

import { SecureUserModel } from '@/modules/auth/account/models/user.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class SocialLinkModel extends MetaModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { description: 'Название социальной сети' })
  title!: string;

  @Field(() => String, { description: 'URL социальной сети' })
  url!: string;

  @Field(() => Number, { description: 'Порядковый номер' })
  order!: number;

  @Field(() => SecureUserModel, { description: 'Пользователь' })
  user!: UserModel;
}
