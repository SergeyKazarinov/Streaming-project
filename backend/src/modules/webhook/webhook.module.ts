import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { RawBodyMiddleware } from '@/shared/middlewares/raw-body.middlewares';

import { StreamRepositoryModule } from '../repositories/stream/stream-repository.module';

import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [StreamRepositoryModule],
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
