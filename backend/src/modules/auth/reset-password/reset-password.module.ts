import { Module } from '@nestjs/common';

import { MailModule } from '@/modules/mail/mail.module';

import { ResetPasswordResolver } from './reset-password.resolver';
import { ResetPasswordService } from './reset-password.service';

@Module({
  imports: [MailModule],
  providers: [ResetPasswordResolver, ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
