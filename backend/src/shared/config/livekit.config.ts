import type { ConfigService } from '@nestjs/config';

import type { TLiveKitOptions } from '../types/livekit.types';

export const getLivekitConfig = (configService: ConfigService): TLiveKitOptions => {
  return {
    apiUrl: configService.getOrThrow<string>('LIVEKIT_API_URL'),
    apiKey: configService.getOrThrow<string>('LIVEKIT_API_KEY'),
    apiSecret: configService.getOrThrow<string>('LIVEKIT_API_SECRET'),
  };
};
