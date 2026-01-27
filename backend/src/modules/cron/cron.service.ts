import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { prisma } from '@/shared/lib/prisma';

import { MailService } from '../mail/mail.service';

@Injectable()
export class CronService {
  constructor(private readonly mailService: MailService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDeletedAccounts() {
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDay() - 7);

    const deletedUsers = await prisma.user.findMany({
      where: {
        deactivatedAt: { lte: sevenDaysAgo },
        isDeactivated: true,
      },
    });

    for (const user of deletedUsers) {
      await this.mailService.sendDeletedAccount(user.email);
    }

    await prisma.user.deleteMany({
      where: {
        deactivatedAt: { lte: sevenDaysAgo },
        isDeactivated: true,
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleWarnDeleteAccount() {
    const sixDaysAgo = new Date();

    sixDaysAgo.setDate(sixDaysAgo.getDay() - 6);

    const deletedUsers = await prisma.user.findMany({
      where: {
        deactivatedAt: { lte: sixDaysAgo },
        isDeactivated: true,
      },
    });

    for (const user of deletedUsers) {
      await this.mailService.sendWarnDeletedAccount(user.email);
    }
  }
}
