import { Field, InputType } from '@nestjs/graphql';

import { IsPasswordMatchingConstraint } from '@/shared/decorators/is-password-matching-constraint.decorator';
import { Validator } from '@/shared/decorators/validator.decorator';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @Validator({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  newPassword!: string;

  @Field()
  @Validator({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
    customValidators: [IsPasswordMatchingConstraint],
  })
  confirmPassword!: string;

  @Field(() => String)
  @Validator({
    uuidVersion: '4',
    isNotEmpty: true,
  })
  token!: string;
}
