import type { TelegrafModuleOptions } from 'nestjs-telegraf';
import type { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService): TelegrafModuleOptions => {
  return {
    token: configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
  };
};
