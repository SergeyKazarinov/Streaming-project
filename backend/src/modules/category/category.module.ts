import { Module } from '@nestjs/common';

import { CategoryRepositoryModule } from '@/modules/repositories/category/category-repository.module';

import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [CategoryRepositoryModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
