import { Field, InputType } from '@nestjs/graphql';

import { IsPasswordMatchingConstraint } from '../decorators/is-password-matching-constraint.decorator';
import { ValidatorFactory } from '../decorators/validator-factory.decorator';

@InputType()
export class BasePasswordInput {
  @Field(() => String, { description: 'Новый пароль пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  newPassword!: string;

  @Field(() => String, { description: 'Подтверждение нового пароля пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
    customValidators: [IsPasswordMatchingConstraint],
  })
  confirmNewPassword!: string;
}
