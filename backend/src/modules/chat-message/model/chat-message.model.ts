import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { ChatMessage } from 'prisma/generated/prisma/client';

import { UserModel } from '@/modules/auth/account/models/user.model';
import { StreamModel } from '@/modules/stream/model/stream.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class ChatMessageModel extends MetaModel implements ChatMessage {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { description: 'Текст сообщения' })
  text!: string;

  @Field(() => UserModel, { description: 'Пользователь' })
  user!: UserModel;

  @Field(() => String, { description: 'id пользователя' })
  userId!: string;

  @Field(() => StreamModel, { description: 'Стрим с чатом' })
  stream!: StreamModel;

  @Field(() => String, { description: 'id стрима' })
  streamId!: string;
}
