import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { ChatRepository } from '@/modules/repositories/chat/chat.repository';
import { StreamRepository } from '@/modules/repositories/stream/stream.repository';

import { MESSAGE } from '@/shared/consts/message.const';

import { ChatMessageInput } from './inputs/chat-message.input';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatRepository,
    private readonly streamRepository: StreamRepository,
  ) {}

  async findMessagesByStreamId(streamId: string): Promise<ReturnType<ChatRepository['findMessagesByStreamId']>> {
    const stream = await this.streamRepository.findStreamByStreamId(streamId);

    if (!stream.isLive) {
      throw new BadRequestException(MESSAGE.ERROR.STREAM_NOT_LIVE);
    }

    const messages = await this.chatMessageRepository.findMessagesByStreamId(streamId);

    return messages;
  }

  async createMessage(
    user: User,
    streamId: string,
    input: ChatMessageInput,
  ): Promise<ReturnType<ChatRepository['createMessage']>> {
    const message = await this.chatMessageRepository.createMessage(user, streamId, input);

    return message;
  }
}
