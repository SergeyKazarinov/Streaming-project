import { Module } from '@nestjs/common';

import { MailModule } from '@/modules/mail/mail.module';

import { DeactivateResolver } from './deactivate.resolver';
import { DeactivateService } from './deactivate.service';

@Module({
  imports: [MailModule],
  providers: [DeactivateResolver, DeactivateService],
})
export class DeactivateModule {}
