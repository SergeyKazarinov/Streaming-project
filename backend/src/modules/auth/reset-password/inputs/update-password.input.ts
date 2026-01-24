import { Field, InputType } from '@nestjs/graphql';

import { IsPasswordMatchingConstraint } from '@/shared/decorators/is-password-matching-constraint.decorator';
import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  newPassword!: string;

  @Field()
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
    customValidators: [IsPasswordMatchingConstraint],
  })
  confirmPassword!: string;

  @Field(() => String)
  @ValidatorFactory({
    uuidVersion: '4',
    isNotEmpty: true,
  })
  token!: string;
}
