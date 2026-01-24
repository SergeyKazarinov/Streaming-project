import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    isEmail: true,
  })
  email!: string;
}
