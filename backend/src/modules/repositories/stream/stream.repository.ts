import { Injectable } from '@nestjs/common';
import { StreamWhereInput } from 'prisma/generated/prisma/models';

import { ChangeStreamInfoInput } from '@/modules/stream/inputs/change-stream-info.input';
import { StreamModel } from '@/modules/stream/model/stream.model';

import { FiltersInput } from '@/shared/inputs/filters.input';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class StreamRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private findBySearchTerm(searchTerm: string): StreamWhereInput {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          user: {
            username: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
  }

  async findAll(input: FiltersInput = {}): Promise<StreamModel[]> {
    const { offset = 0, limit = 12, searchTerm } = input;

    const whereClause = searchTerm ? this.findBySearchTerm(searchTerm) : undefined;

    const streams = await this.prismaService.stream.findMany({
      where: {
        user: {
          isDeactivated: false,
        },
        ...whereClause,
      },
      include: {
        user: true,
      },
      skip: offset,
      take: limit,
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    return streams;
  }

  async getTotalCountStream(): Promise<number> {
    return await this.prismaService.stream.count({
      where: {
        user: {
          isDeactivated: false,
        },
      },
    });
  }

  async updateStream(userId: string, input: ChangeStreamInfoInput) {
    const { title } = input;

    return await this.prismaService.stream.update({
      where: {
        userId,
      },
      data: {
        title,
      },
    });
  }
}
