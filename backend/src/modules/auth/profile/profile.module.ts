import { Module } from '@nestjs/common';

import { StorageModule } from '@/modules/libs/storage/storage.module';

import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [StorageModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
