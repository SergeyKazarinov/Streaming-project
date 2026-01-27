import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType({ description: 'Изменение email пользователя' })
export class ChangeEmailInput {
  @Field(() => String, { description: 'Новый Email пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    isEmail: true,
  })
  email!: string;
}
