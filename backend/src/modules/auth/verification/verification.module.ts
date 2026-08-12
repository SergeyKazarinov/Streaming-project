import { Module } from '@nestjs/common';

import { MailModule } from '@/modules/mail/mail.module';
import { TokenModule } from '@/modules/repositories/token/token.module';

import { VerificationResolver } from './verification.resolver';
import { VerificationService } from './verification.service';

@Module({
  imports: [MailModule, TokenModule],
  providers: [VerificationResolver, VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
