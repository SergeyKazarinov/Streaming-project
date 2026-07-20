import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Follow } from 'prisma/generated/prisma/client';

import { UserModel } from '@/modules/auth/account/models/user.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class FollowModel extends MetaModel implements Follow {
  @Field(() => ID)
  id!: string;

  @Field(() => UserModel, { description: 'Подписчик' })
  follower!: UserModel;

  @Field(() => String, { description: 'id подписчика' })
  followerId!: string;

  @Field(() => UserModel, { description: 'Пользователь, на которого подписан' })
  following!: UserModel;

  @Field(() => String, { description: 'id пользователя, на которого подписан' })
  followingId!: string;
}
