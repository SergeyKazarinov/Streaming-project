import { Injectable } from '@nestjs/common';

import { LivekitService } from '@/modules/libs/livekit/livekit.service';
import { NotificationService } from '@/modules/notification/notification.service';
import { ChatRepository } from '@/modules/repositories/chat/chat.repository';
import { FollowRepository } from '@/modules/repositories/follow/follow.repository';
import { StreamRepository } from '@/modules/repositories/stream/stream.repository';

@Injectable()
export class WebhookService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly streamRepository: StreamRepository,
    private readonly notificationService: NotificationService,
    private readonly followRepository: FollowRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  async receiveWebhookLivekit(body: string, authorization: string) {
    const event = await this.livekitService.webhook.receive(body, authorization, true);

    if (event.event === 'ingress_started') {
      if (!event.ingressInfo) return;

      const stream = await this.streamRepository.startStream(event.ingressInfo.ingressId, {
        isLive: true,
      });

      const followers = await this.followRepository.findFollowers(stream.user.id);

      for (const follow of followers) {
        const follower = follow.follower;

        if (follower.notificationSetting?.siteNotificationEnabled) {
          await this.notificationService.createStreamNotification(follower.id, stream);
        }
      }
    }

    if (event.event === 'ingress_ended') {
      if (!event.ingressInfo) return;

      const stream = await this.streamRepository.updateStream(event.ingressInfo.ingressId, {
        isLive: false,
      });

      await this.chatRepository.deleteMessagesByStreamId(stream.id);
    }
  }
}
