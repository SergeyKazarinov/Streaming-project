import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  login!: string;

  @Field(() => String)
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  password!: string;
}
