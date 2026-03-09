import { Injectable } from '@nestjs/common';

import { LivekitService } from '../libs/livekit/livekit.service';
import { StreamRepository } from '../repositories/stream/stream.repository';

@Injectable()
export class WebhookService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly streamRepository: StreamRepository,
  ) {}

  async receiveWebhookLivekit(body: string, authorization: string) {
    const event = await this.livekitService.webhook.receive(body, authorization, true);

    if (event.event === 'ingress_started') {
      if (!event.ingressInfo) return;

      await this.streamRepository.updateStream(event.ingressInfo.ingressId, {
        isLive: true,
      });
    }

    if (event.event === 'ingress_ended') {
      if (!event.ingressInfo) return;

      await this.streamRepository.updateStream(event.ingressInfo.ingressId, {
        isLive: false,
      });
    }
  }
}
