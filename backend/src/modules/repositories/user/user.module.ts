import { Global, Module } from '@nestjs/common';

import { UserRepository } from './user.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
