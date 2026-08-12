import { Module } from '@nestjs/common';

import { ChatRepository } from './chat.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChatRepository],
  exports: [ChatRepository],
})
export class ChatRepositoryModule {}
