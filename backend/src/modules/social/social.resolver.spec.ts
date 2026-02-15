import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { SocialResolver } from './social.resolver';
import { SocialService } from './social.service';

describe('SocialResolver', () => {
  let resolver: SocialResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialResolver, SocialService],
    }).compile();

    resolver = module.get<SocialResolver>(SocialResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
