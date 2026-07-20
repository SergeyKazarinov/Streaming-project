import { Module } from '@nestjs/common';

import { FollowRepository } from './follow.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FollowRepository],
  exports: [FollowRepository],
})
export class FollowRepositoryModule {}
