import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressAudioOptions,
  IngressInput,
  IngressVideoEncodingPreset,
  IngressVideoOptions,
  TrackSource,
} from 'livekit-server-sdk';
import { User } from 'prisma/generated/prisma/client';

import { LivekitService } from '@/modules/libs/livekit/livekit.service';
import { StreamRepository } from '@/modules/repositories/stream/stream.repository';

@Injectable()
export class IngressService {
  constructor(
    private readonly livekitService: LivekitService,
    private readonly streamRepository: StreamRepository,
  ) {}

  async createRoom(user: User, ingressType: IngressInput) {
    await this.resetIngresses(user);

    const options: CreateIngressOptions = {
      name: user.username,
      roomName: user.id,
      participantName: user.username,
      participantIdentity: user.id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.enableTranscoding = true;
    } else {
      const videoOptions = new IngressVideoOptions({
        source: TrackSource.CAMERA,
        encodingOptions: {
          case: 'preset',
          value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        },
      });

      const audioOptions = new IngressAudioOptions({
        source: TrackSource.MICROPHONE,
        encodingOptions: {
          case: 'preset',
          value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        },
      });

      options.video = videoOptions;
      options.audio = audioOptions;
    }

    const ingress = await this.livekitService.ingress.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new BadRequestException('Не удалось создать входной поток');
    }

    await this.streamRepository.updateStream(user.id, {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    });

    return true;
  }

  private async resetIngresses(user: User) {
    const ingresses = await this.livekitService.ingress.listIngress({
      roomName: user.id,
    });

    const rooms = await this.livekitService.room.listRooms([user.id]);

    for (const room of rooms) {
      await this.livekitService.room.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
      if (!ingress.ingressId) continue;

      await this.livekitService.ingress.deleteIngress(ingress.ingressId);
    }
  }
}
