import { Module } from '@nestjs/common';

import { SubscriptionsModule } from '@/modules/libs/subscriptions/subscriptions.module';
import { ChatRepositoryModule } from '@/modules/repositories/chat/chat-repository.module';
import { StreamRepositoryModule } from '@/modules/repositories/stream/stream-repository.module';

import { ChatMessageResolver } from './chat-message.resolver';
import { ChatMessageService } from './chat-message.service';

@Module({
  imports: [ChatRepositoryModule, StreamRepositoryModule, SubscriptionsModule],
  providers: [ChatMessageResolver, ChatMessageService],
})
export class ChatMessageModule {}
