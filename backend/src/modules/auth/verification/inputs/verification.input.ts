import { Field, InputType } from '@nestjs/graphql';

import { Validator } from '@/shared/decorators/validator.decorator';

@InputType()
export class VerificationInput {
  @Field(() => String)
  @Validator({
    uuidVersion: '4',
    isNotEmpty: true,
  })
  token!: string;
}
