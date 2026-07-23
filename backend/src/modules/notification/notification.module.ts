import { Module } from '@nestjs/common';

import { NotificationRepositoryModule } from '@/modules/repositories/notification/notification-repository.module';

import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  imports: [NotificationRepositoryModule],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
