import { Module } from '@nestjs/common';

import { LivekitModule } from '@/modules/libs/livekit/livekit.module';
import { StreamRepositoryModule } from '@/modules/repositories/stream/stream-repository.module';

import { IngressResolver } from './ingress.resolver';
import { IngressService } from './ingress.service';

@Module({
  imports: [LivekitModule, StreamRepositoryModule],
  providers: [IngressResolver, IngressService],
})
export class IngressModule {}
