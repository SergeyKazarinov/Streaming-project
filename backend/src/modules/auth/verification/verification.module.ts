import { Module } from '@nestjs/common';

import { MailModule } from '@/modules/mail/mail.module';

import { VerificationResolver } from './verification.resolver';
import { VerificationService } from './verification.service';

@Module({
  imports: [MailModule],
  providers: [VerificationResolver, VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
