import { Module } from '@nestjs/common';

import { NotificationModule } from '@/modules/notification/notification.module';
import { FollowRepositoryModule } from '@/modules/repositories/follow/follow-repository.module';

import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [FollowRepositoryModule, NotificationModule],
  providers: [FollowResolver, FollowService],
  exports: [FollowService],
})
export class FollowModule {}
