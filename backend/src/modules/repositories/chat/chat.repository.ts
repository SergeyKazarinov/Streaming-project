import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';
import { ChatMessageModel } from 'prisma/generated/prisma/models';

import { ChatMessageInput } from '@/modules/chat-message/inputs/chat-message.input';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMessagesByStreamId(streamId: string): Promise<ChatMessageModel[]> {
    const messages = await this.prismaService.chatMessage.findMany({
      where: {
        streamId,
      },
      include: {
        user: true,
        stream: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return messages;
  }

  async createMessage(user: User, streamId: string, input: ChatMessageInput): Promise<ChatMessageModel> {
    const message = await this.prismaService.chatMessage.create({
      data: {
        text: input.text,
        stream: {
          connect: {
            id: streamId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return message;
  }
}
