import { Module } from '@nestjs/common';

import { redisProvider } from './redis.provide';

@Module({
  providers: [redisProvider],
})
export class RedisModule {}
