import { DynamicModule, Module } from '@nestjs/common';

import { LIVEKIT_OPTIONS_SYMBOL, TLivekitAsyncOptions, TLiveKitOptions } from '@/shared/types/livekit.types';

import { LivekitService } from './livekit.service';

@Module({})
export class LivekitModule {
  static register(options: TLiveKitOptions): DynamicModule {
    return {
      module: LivekitModule,
      providers: [
        {
          provide: LIVEKIT_OPTIONS_SYMBOL,
          useValue: options,
        },
        LivekitService,
      ],
      exports: [LivekitService],
      global: true,
    };
  }

  static registerAsync(options: TLivekitAsyncOptions): DynamicModule {
    const { imports = [], useFactory, inject = [] } = options;

    return {
      module: LivekitModule,
      imports: imports,
      providers: [
        {
          provide: LIVEKIT_OPTIONS_SYMBOL,
          useFactory,
          inject,
        },
        LivekitService,
      ],
      exports: [LivekitService],
      global: true,
    };
  }
}
