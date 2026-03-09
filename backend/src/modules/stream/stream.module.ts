import { Module } from '@nestjs/common';

import { StorageModule } from '../libs/storage/storage.module';
import { StreamRepositoryModule } from '../repositories/stream/stream-repository.module';

import { StreamResolver } from './stream.resolver';
import { StreamService } from './stream.service';

@Module({
  imports: [StreamRepositoryModule, StorageModule],
  providers: [StreamResolver, StreamService],
})
export class StreamModule {}
