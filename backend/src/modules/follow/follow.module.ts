import { Module } from '@nestjs/common';

import { FollowRepositoryModule } from '@/modules/repositories/follow/follow-repository.module';

import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [FollowRepositoryModule],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
