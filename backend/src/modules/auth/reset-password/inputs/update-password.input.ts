import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';
import { BasePasswordInput } from '@/shared/inputs/base-password.input';

@InputType()
export class UpdatePasswordInput extends BasePasswordInput {
  @Field(() => String)
  @ValidatorFactory({
    uuidVersion: '4',
    isNotEmpty: true,
  })
  token!: string;
}
