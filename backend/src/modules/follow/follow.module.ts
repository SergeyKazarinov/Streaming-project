import { Module } from '@nestjs/common';

import { FollowRepositoryModule } from '@/modules/repositories/follow/follow-repository.module';

import { NotificationModule } from '../notification/notification.module';

import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [FollowRepositoryModule, NotificationModule],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
