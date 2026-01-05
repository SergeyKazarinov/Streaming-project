import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfig } from '@/shared/config/env-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
  ],
})
export class CoreModule {}
