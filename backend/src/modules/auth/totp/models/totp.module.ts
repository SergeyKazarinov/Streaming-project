import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Модель TOTP для генерации секретного ключа и QR-кода. Используется для включения TOTP' })
export class TotpModel {
  @Field(() => String, { description: 'Секретный ключ TOTP' })
  secret!: string;

  @Field(() => String, { description: 'QR-код TOTP' })
  qrCode!: string;
}
