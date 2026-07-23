import { Module } from '@nestjs/common';

import { NotificationRepositoryModule } from '@/modules/repositories/notification/notification-repository.module';

import { VerificationModule } from '../verification/verification.module';

import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
  imports: [VerificationModule, NotificationRepositoryModule],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
