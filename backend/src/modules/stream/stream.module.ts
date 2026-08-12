import { Module } from '@nestjs/common';

import { StorageModule } from '../libs/storage/storage.module';
import { StreamRepositoryModule } from '../repositories/stream/stream-repository.module';
import { UserModule } from '../repositories/user/user.module';

import { StreamResolver } from './stream.resolver';
import { StreamService } from './stream.service';

@Module({
  imports: [StreamRepositoryModule, StorageModule, UserModule],
  providers: [StreamResolver, StreamService],
})
export class StreamModule {}
