import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class UpdateNotificationInput {
  @Field(() => Boolean, { nullable: true, description: 'Включены ли уведомления на сайте' })
  @ValidatorFactory({
    isOptional: true,
  })
  siteNotificationEnabled?: boolean;

  @Field(() => Boolean, { nullable: true, description: 'Включены ли уведомления в телеграмме' })
  @ValidatorFactory({
    isOptional: true,
  })
  telegramNotificationEnabled?: boolean;
}
