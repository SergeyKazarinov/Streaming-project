import { Module } from '@nestjs/common';

import { NotificationRepository } from './notification.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationRepositoryModule {}
