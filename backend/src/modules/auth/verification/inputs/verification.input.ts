import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class VerificationInput {
  @Field(() => String)
  @ValidatorFactory({
    uuidVersion: '4',
    isNotEmpty: true,
  })
  token!: string;
}
