import { BadRequestException, Injectable } from '@nestjs/common';
import * as OTPAuth from 'otpauth';
import { User } from 'prisma/generated/prisma/client';
import QRCode from 'qrcode';

import { UserRepository } from '@/modules/user/user.repository';

import { generateTotpObject } from '@/shared/lib/generate-totp-object';

import { EnableTotpInput } from './inputs/enable-totp.input';

@Injectable()
export class TotpService {
  constructor(private readonly userRepository: UserRepository) {}

  async generateSecret(user: User) {
    const secret = new OTPAuth.Secret({ size: 20 }).base32;

    const totp = generateTotpObject(user.email, secret);

    const totpUrl = totp.toString();

    const qrCode = await QRCode.toDataURL(totpUrl);

    return {
      secret,
      qrCode,
    };
  }

  async enableTotp(user: User, input: EnableTotpInput) {
    const { totpToken, secret } = input;

    const totp = generateTotpObject(user.email, secret);

    const delta = totp.validate({ token: totpToken });

    if (delta === null) {
      throw new BadRequestException('Неверный код');
    }

    await this.userRepository.updateUser(user.id, {
      isTotpEnabled: true,
      totpSecret: secret,
    });

    return true;
  }

  async disableTotp(user: User) {
    await this.userRepository.updateUser(user.id, {
      isTotpEnabled: false,
      totpSecret: null,
    });

    return true;
  }
}
