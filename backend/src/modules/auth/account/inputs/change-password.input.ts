import { Field, InputType } from '@nestjs/graphql';

import { IsPasswordMatchingConstraint } from '@/shared/decorators/is-password-matching-constraint.decorator';
import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType({ description: 'Изменение пароля пользователя' })
export class ChangePasswordInput {
  @Field(() => String, { description: 'Текущий пароль пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  oldPassword!: string;

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
