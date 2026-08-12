import { Global, Module } from '@nestjs/common';

import { REDIS_KEY } from '@/shared/consts/key.cons';

import { redisProvider } from './redis.provide';

@Global()
@Module({
  providers: [redisProvider],
  exports: [REDIS_KEY],
})
export class RedisModule {}
