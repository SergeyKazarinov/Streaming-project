import { Injectable } from '@nestjs/common';

import { prisma } from '@/shared/lib/prisma';

@Injectable()
export class AccountService {
  constructor() {}

  async findAll() {
    const users = await prisma.user.findMany();

    return users;
  }
}
