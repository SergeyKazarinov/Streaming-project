import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '../decorators/validator-factory.decorator';

@InputType()
export class PaginationInput {
  @Field(() => Number, { nullable: true, description: 'Количество записей, которые необходимо пропустить' })
  @ValidatorFactory({
    isNumber: true,
    isOptional: true,
  })
  offset?: number;

  @ValidatorFactory({
    isNumber: true,
    isOptional: true,
  })
  @Field(() => Number, { nullable: true, description: 'Количество записей, которые необходимо вернуть' })
  limit?: number;
}
