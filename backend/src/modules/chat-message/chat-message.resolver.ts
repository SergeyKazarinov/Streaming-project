import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'prisma/generated/prisma/client';

import { CHAT_MESSAGE_ADDED_KEY, PUB_SUB } from '@/shared/consts/key.cons';
import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';

import { ChatMessageInput } from './inputs/chat-message.input';
import { ChatMessageModel } from './model/chat-message.model';
import { ChatMessageService } from './chat-message.service';

@Resolver('ChatMessage')
export class ChatMessageResolver {
  constructor(
    @Inject(PUB_SUB)
    private readonly pubSub: PubSub,
    private readonly chatMessageService: ChatMessageService,
  ) {}

  @Query(() => [ChatMessageModel], { name: 'findMessagesByStreamId' })
  async findMessagesByStreamId(
    @Args('streamId') streamId: string,
  ): Promise<ReturnType<ChatMessageService['findMessagesByStreamId']>> {
    return await this.chatMessageService.findMessagesByStreamId(streamId);
  }

  @Authorization()
  @Mutation(() => ChatMessageModel, { name: 'sendMessage' })
  async sendMessage(
    @Authorized() user: User,
    @Args('streamId') streamId: string,
    @Args('data') input: ChatMessageInput,
  ) {
    const message = await this.chatMessageService.createMessage(user, streamId, input);

    await this.pubSub.publish(CHAT_MESSAGE_ADDED_KEY, {
      subscribeChat: message,
    });

    return message;
  }

  @Subscription(() => ChatMessageModel, {
    name: 'subscribeChat',
    filter: (payload: { subscribeChat: ChatMessageModel }, variables: { streamId: string }) => {
      return payload.subscribeChat.streamId === variables.streamId;
    },
  })
  subscribeChat(@Args('streamId') _: string) {
    return this.pubSub.asyncIterableIterator(CHAT_MESSAGE_ADDED_KEY);
  }
}
