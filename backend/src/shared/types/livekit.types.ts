import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export const LIVEKIT_OPTIONS_SYMBOL = Symbol('LivekitOptions');

export type TLiveKitOptions = {
  apiUrl: string;
  apiKey: string;
  apiSecret: string;
};

export type TLivekitAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider, 'useFactory' | 'inject'>;
