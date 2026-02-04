import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { StorageService } from '../libs/storage/storage.service';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../repositories/user/user.repository';

@Injectable()
export class CronService {
  constructor(
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDeletedAccounts() {
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDay() - 7);

    const deletedUsers = await this.userRepository.findMany({
      deactivatedAt: { lte: sevenDaysAgo },
      isDeactivated: true,
    });

    for (const user of deletedUsers) {
      await this.mailService.sendDeletedAccount(user.email);

      if (user.avatar) {
        await this.storageService.deleteFile(user.avatar);
      }
    }

    await this.userRepository.deleteMany({
      deactivatedAt: { lte: sevenDaysAgo },
      isDeactivated: true,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleWarnDeleteAccount() {
    const sixDaysAgo = new Date();

    sixDaysAgo.setDate(sixDaysAgo.getDay() - 6);

    const deletedUsers = await this.userRepository.findMany({
      deactivatedAt: { lte: sixDaysAgo },
      isDeactivated: true,
    });

    for (const user of deletedUsers) {
      await this.mailService.sendWarnDeletedAccount(user.email);
    }
  }
}
