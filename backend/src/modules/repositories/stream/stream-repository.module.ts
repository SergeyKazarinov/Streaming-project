import { Module } from '@nestjs/common';

import { StreamRepository } from './stream.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StreamRepository],
  exports: [StreamRepository],
})
export class StreamRepositoryModule {}
