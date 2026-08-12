import type { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

import { REDIS_KEY } from '@/shared/consts/key.cons';

export const redisProvider: Provider = {
  provide: REDIS_KEY,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const redisClient = createClient({
      url: config.getOrThrow<string>('REDIS_URL'),
    });

    await redisClient
      .connect()
      .then(() => console.log('Redis connected'))
      .catch(console.error);

    return redisClient;
  },
};
