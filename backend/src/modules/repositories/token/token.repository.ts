import { Injectable } from '@nestjs/common';
import { TokenDeleteArgs, TokenDeleteManyArgs } from 'prisma/generated/prisma/models';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class TokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(where: TokenDeleteArgs['where']): Promise<void> {
    await this.prismaService.token.delete({
      where,
    });
  }
  async deleteMany(where: TokenDeleteManyArgs['where']): Promise<void> {
    await this.prismaService.token.deleteMany({
      where,
    });
  }
}
