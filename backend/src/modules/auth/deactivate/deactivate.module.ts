import { Module } from '@nestjs/common';

import { MailModule } from '@/modules/mail/mail.module';
import { TokenModule } from '@/modules/repositories/token/token.module';

import { DeactivateResolver } from './deactivate.resolver';
import { DeactivateService } from './deactivate.service';

@Module({
  imports: [MailModule, TokenModule],
  providers: [DeactivateResolver, DeactivateService],
})
export class DeactivateModule {}
