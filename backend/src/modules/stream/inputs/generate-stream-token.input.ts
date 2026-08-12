import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class GenerateStreamTokenInput {
  @Field(() => String, { description: 'Идентификатор пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    uuidVersion: '4',
  })
  userId!: string;

  @Field(() => String, { description: 'Идентификатор канала' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    uuidVersion: '4',
  })
  chanelId!: string;
}
