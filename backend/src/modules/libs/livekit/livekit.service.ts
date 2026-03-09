import { Inject, Injectable } from '@nestjs/common';
import { IngressClient, RoomServiceClient, WebhookReceiver } from 'livekit-server-sdk';

import { LIVEKIT_OPTIONS_SYMBOL, TLiveKitOptions } from '@/shared/types/livekit.types';

@Injectable()
export class LivekitService {
  private roomService: RoomServiceClient;
  private webhookReceiver: WebhookReceiver;
  private ingestService: IngressClient;

  constructor(@Inject(LIVEKIT_OPTIONS_SYMBOL) private readonly options: TLiveKitOptions) {
    this.roomService = new RoomServiceClient(this.options.apiUrl, this.options.apiKey, this.options.apiSecret);
    this.webhookReceiver = new WebhookReceiver(this.options.apiKey, this.options.apiSecret);
    this.ingestService = new IngressClient(this.options.apiUrl, this.options.apiKey, this.options.apiSecret);
  }

  private createProxy<T extends object>(target: T) {
    return new Proxy(target, {
      get(obj, prop) {
        const value = obj[prop as keyof T];
        if (typeof value === 'function') {
          return value.bind(obj) as T[keyof T];
        }
        return value;
      },
    });
  }

  get ingress(): IngressClient {
    return this.createProxy(this.ingestService);
  }

  get room(): RoomServiceClient {
    return this.createProxy(this.roomService);
  }

  get webhook(): WebhookReceiver {
    return this.createProxy(this.webhookReceiver);
  }
}
