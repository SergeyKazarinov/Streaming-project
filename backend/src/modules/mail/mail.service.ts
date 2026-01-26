import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { render } from '@react-email/components';

import DeactivateTemplate from '@/shared/templates/mail/deactivate.template';
import { ResetPasswordTemplate } from '@/shared/templates/mail/reset-password.template';
import { VerificationTemplate } from '@/shared/templates/mail/verification.template';
import { SessionMetadata } from '@/shared/types/session-metadata.types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private sendMail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }

  async sendVerificationToken(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGINS');
    const html = await render(VerificationTemplate({ domain, token }));
    await this.sendMail(email, 'Верификация аккаунта', html);
  }

  async sendResetPasswordToken(email: string, token: string, metadata: SessionMetadata) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGINS');
    const html = await render(ResetPasswordTemplate({ domain, token, metadata }));
    await this.sendMail(email, 'Сброс пароля', html);
  }

  async sendDeactivateToken(email: string, token: string, metadata: SessionMetadata) {
    const html = await render(DeactivateTemplate({ token, metadata }));
    await this.sendMail(email, 'Деактивация аккаунта', html);
  }
}
