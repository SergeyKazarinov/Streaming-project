import { Module } from '@nestjs/common';

import { StreamRepositoryModule } from '../repositories/stream/stream-repository.module';

import { StreamResolver } from './stream.resolver';
import { StreamService } from './stream.service';

@Module({
  imports: [StreamRepositoryModule],
  providers: [StreamResolver, StreamService],
})
export class StreamModule {}
