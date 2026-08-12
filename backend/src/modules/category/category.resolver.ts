import { Args, Query, Resolver } from '@nestjs/graphql';

import { CategoryModel } from '@/modules/category/model/category.model';

import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryModel], { name: 'findAllCategories' })
  async findAllCategories() {
    return await this.categoryService.findAll();
  }
  @Query(() => [CategoryModel], { name: 'findRandomCategories' })
  async findRandomCategories() {
    return await this.categoryService.findRandomStream();
  }

  @Query(() => CategoryModel, { name: 'findCategoryBySlug' })
  async findCategoryBySlug(@Args('slug') slug: string) {
    return await this.categoryService.findBySlug(slug);
  }
}
