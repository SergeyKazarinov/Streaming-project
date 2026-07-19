import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { PUB_SUB } from '@/shared/consts/key.cons';

@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PUB_SUB],
})
export class SubscriptionsModule {}
