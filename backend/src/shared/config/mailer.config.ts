import type { ConfigService } from '@nestjs/config';
import type { MailerOptions } from '@nestjs-modules/mailer';

export const getMailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<number>('MAIL_PORT'),
    secure: false,
    auth: {
      user: configService.getOrThrow<string>('MAIL_USER'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
    default: {
      from: {
        name: 'STREAMING',
        address: configService.getOrThrow<string>('MAIL_FROM'),
      },
    },
  },
});
