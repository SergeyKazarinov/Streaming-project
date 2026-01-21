import { Field, InputType } from '@nestjs/graphql';

import { Validator } from '@/shared/decorators/validator.decorator';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @Validator({
    isString: true,
    isNotEmpty: true,
    isEmail: true,
  })
  email!: string;
}
