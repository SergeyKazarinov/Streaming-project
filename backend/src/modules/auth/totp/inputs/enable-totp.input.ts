import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class EnableTotpInput {
  @Field(() => String)
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    length: {
      min: 6,
      max: 6,
    },
  })
  totpToken!: string;

  @Field(() => String)
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  secret!: string;
}
