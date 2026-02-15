import { Module } from '@nestjs/common';

import { SocialLinksModule } from '../repositories/social/social-links.module';

import { SocialResolver } from './social.resolver';
import { SocialService } from './social.service';

@Module({
  imports: [SocialLinksModule],
  providers: [SocialResolver, SocialService],
})
export class SocialModule {}
