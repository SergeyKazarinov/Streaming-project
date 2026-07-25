import { Module } from '@nestjs/common';

import { NotificationModule } from '@/modules/notification/notification.module';

import { TotpResolver } from './totp.resolver';
import { TotpService } from './totp.service';

@Module({
  imports: [NotificationModule],
  providers: [TotpResolver, TotpService],
})
export class TotpModule {}
