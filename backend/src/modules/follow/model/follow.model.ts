import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Follow } from 'prisma/generated/prisma/client';

import { SecureUserModel } from '@/modules/auth/account/models/user.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class FollowModel extends MetaModel implements Follow {
  @Field(() => ID)
  id!: string;

  @Field(() => SecureUserModel, { description: 'Подписчик' })
  follower!: SecureUserModel;

  @Field(() => String, { description: 'id подписчика' })
  followerId!: string;

  @Field(() => SecureUserModel, { description: 'Пользователь, на которого подписан' })
  following!: SecureUserModel;

  @Field(() => String, { description: 'id пользователя, на которого подписан' })
  followingId!: string;
}
