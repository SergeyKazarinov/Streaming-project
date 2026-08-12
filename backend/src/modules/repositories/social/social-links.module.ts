import { Module } from '@nestjs/common';

import { SocialLinksRepository } from './social-links.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SocialLinksRepository],
  exports: [SocialLinksRepository],
})
export class SocialLinksModule {}
