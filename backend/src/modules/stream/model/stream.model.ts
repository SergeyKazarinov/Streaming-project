import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Stream } from 'prisma/generated/prisma/browser';

import { SecureUserModel } from '@/modules/auth/account/models/user.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class StreamModel extends MetaModel implements Stream {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { description: 'Название стрима' })
  title!: string;

  @Field(() => String, { nullable: true, description: 'URL preview стрима' })
  thumbnailUrl!: Nullable<string>;

  @Field(() => String, { nullable: true })
  ingressId!: Nullable<string>;

  @Field(() => String, { nullable: true })
  serverUrl!: Nullable<string>;

  @Field(() => String, { nullable: true })
  streamKey!: Nullable<string>;

  @Field(() => Boolean, { description: 'Стрим в прямом эфире' })
  isLive!: boolean;

  @Field(() => SecureUserModel, { description: 'Владелец стрима' })
  user!: SecureUserModel;

  @Field(() => String, { description: 'ID владельца стрима' })
  userId!: string;
}
