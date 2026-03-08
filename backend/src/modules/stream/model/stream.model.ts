import { Field, ID } from '@nestjs/graphql';
import { Stream } from 'prisma/generated/prisma/browser';

import { SecureUserModel } from '@/modules/auth/account/models/user.model';

import { MetaModel } from '@/shared/models/meta.model';

export class StreamModel extends MetaModel implements Stream {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  thumbnailUrl!: Nullable<string>;

  @Field(() => String, { nullable: true })
  ingressId!: Nullable<string>;

  @Field(() => String, { nullable: true })
  serverUrl!: Nullable<string>;

  @Field(() => String, { nullable: true })
  streamKey!: Nullable<string>;

  @Field(() => Boolean)
  isLive!: boolean;

  @Field(() => SecureUserModel)
  user!: SecureUserModel;

  @Field(() => String)
  userId!: string;
}
