import { Body, Controller, Headers, Post } from '@nestjs/common';

import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('livekit')
  async receiveWebhookLivekit(@Body() body, @Headers('Authorization') authorization: string) {
    return this.webhookService.receiveWebhookLivekit(body, authorization);
  }
}
