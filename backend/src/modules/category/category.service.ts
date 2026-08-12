import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../repositories/category/category.repository';

@Injectable()
export class CategoryService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<ReturnType<CategoryRepository['findAll']>> {
    return await this.categoryRepository.findAll();
  }

  async findRandomStream(): Promise<ReturnType<CategoryRepository['findAll']>> {
    const totalCategory = await this.categoryRepository.getTotalCount();

    const randomIndexes = new Set<number>();

    while (randomIndexes.size < 7) {
      const randomIndex = Math.floor(Math.random() * totalCategory);
      randomIndexes.add(randomIndex);
    }

    const allCategories = await this.categoryRepository.findAll({
      offset: 0,
      limit: totalCategory,
    });

    const randomCategories = allCategories.filter((category, index) => randomIndexes.has(index));

    return randomCategories;
  }

  public async findBySlug(slug: string): Promise<ReturnType<CategoryRepository['findBySlug']>> {
    return await this.categoryRepository.findBySlug(slug);
  }
}
