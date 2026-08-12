import { Module } from '@nestjs/common';

import { MailModule } from '@/modules/mail/mail.module';
import { TokenModule } from '@/modules/repositories/token/token.module';

import { ResetPasswordResolver } from './reset-password.resolver';
import { ResetPasswordService } from './reset-password.service';

@Module({
  imports: [MailModule, TokenModule],
  providers: [ResetPasswordResolver, ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
