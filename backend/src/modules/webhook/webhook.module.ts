import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { NotificationModule } from '@/modules/notification/notification.module';
import { ChatRepositoryModule } from '@/modules/repositories/chat/chat-repository.module';
import { FollowRepositoryModule } from '@/modules/repositories/follow/follow-repository.module';
import { StreamRepositoryModule } from '@/modules/repositories/stream/stream-repository.module';

import { RawBodyMiddleware } from '@/shared/middlewares/raw-body.middlewares';

import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [StreamRepositoryModule, NotificationModule, FollowRepositoryModule, ChatRepositoryModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes({
      path: 'webhook/livekit',
      method: RequestMethod.POST,
    });
  }
}
