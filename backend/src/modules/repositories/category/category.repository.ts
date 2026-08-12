import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryModel } from 'prisma/generated/prisma/models';

import { MESSAGE } from '@/shared/consts/message.const';
import { PaginationInput } from '@/shared/inputs/pagination.input';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(input: PaginationInput = {}): Promise<Omit<CategoryModel, 'streams'>[]> {
    const { offset = 0, limit } = input;

    const categories = await this.prismaService.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        streams: {
          include: {
            user: true,
            category: true,
          },
        },
      },
      skip: offset,
      take: limit,
    });

    return categories;
  }

  async getTotalCount(): Promise<number> {
    return await this.prismaService.category.count();
  }

  async findBySlug(slug: string): Promise<CategoryModel> {
    const category = await this.prismaService.category.findUnique({
      where: {
        slug,
      },
      include: {
        streams: {
          include: {
            user: true,
            category: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(MESSAGE.ERROR.CATEGORY_NOT_FOUND);
    }

    return category;
  }
}
