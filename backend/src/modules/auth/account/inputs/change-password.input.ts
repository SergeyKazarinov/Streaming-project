import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';
import { BasePasswordInput } from '@/shared/inputs/base-password.input';

@InputType({ description: 'Изменение пароля пользователя' })
export class ChangePasswordInput extends BasePasswordInput {
  @Field(() => String, { description: 'Текущий пароль пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  oldPassword!: string;
}
