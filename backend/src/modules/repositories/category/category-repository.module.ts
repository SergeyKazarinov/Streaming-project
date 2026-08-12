import { Module } from '@nestjs/common';

import { CategoryRepository } from './category.repository';

import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryRepositoryModule {}
