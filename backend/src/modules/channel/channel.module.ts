import { Module } from '@nestjs/common';

import { FollowRepositoryModule } from '@/modules/repositories/follow/follow-repository.module';
import { UserModule } from '@/modules/repositories/user/user.module';

import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

@Module({
  imports: [UserModule, FollowRepositoryModule],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
