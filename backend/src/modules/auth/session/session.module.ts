import { Module } from '@nestjs/common';

import { TokenModule } from '@/modules/repositories/token/token.module';

import { VerificationModule } from '../verification/verification.module';

import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';

@Module({
  imports: [VerificationModule, TokenModule],
  providers: [SessionResolver, SessionService],
})
export class SessionModule {}
