import { Module } from '@nestjs/common';

import { TokenRepository } from './token.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TokenRepository],
  exports: [TokenRepository],
})
export class TokenModule {}
