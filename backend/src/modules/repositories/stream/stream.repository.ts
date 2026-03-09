import { Injectable, NotFoundException } from '@nestjs/common';
import { StreamWhereInput } from 'prisma/generated/prisma/models';

import { ChangeStreamInfoInput } from '@/modules/stream/inputs/change-stream-info.input';
import { StreamModel } from '@/modules/stream/model/stream.model';

import { MESSAGE } from '@/shared/consts/message.const';
import { FiltersInput } from '@/shared/inputs/filters.input';

import { PrismaService } from '@/core/prisma/prisma.service';

type UpdateThumbnailInput = {
  thumbnailUrl: Nullable<string>;
};

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

  async updateStream(userId: string, input: ChangeStreamInfoInput): Promise<StreamModel>;
  async updateStream(userId: string, input: UpdateThumbnailInput): Promise<StreamModel>;
  async updateStream(userId: string, input: ChangeStreamInfoInput | UpdateThumbnailInput): Promise<StreamModel> {
    return await this.prismaService.stream.update({
      where: {
        userId,
      },
      include: {
        user: true,
      },
      data: {
        ...input,
      },
    });
  }

  async findStreamByUserId(userId: string): Promise<StreamModel> {
    const stream = await this.prismaService.stream.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });

    if (!stream) {
      throw new NotFoundException(MESSAGE.ERROR.STREAM_NOT_FOUND);
    }

    return stream;
  }
}
