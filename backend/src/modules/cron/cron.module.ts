import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { MailModule } from '../mail/mail.module';

import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), MailModule],
  providers: [CronService],
})
export class CronModule {}
