import { Field, InputType } from '@nestjs/graphql';

import { Validator } from '@/shared/decorators/validator.decorator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @Validator({
    isString: true,
    isNotEmpty: true,
  })
  login!: string;

  @Field(() => String)
  @Validator({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  password!: string;
}
