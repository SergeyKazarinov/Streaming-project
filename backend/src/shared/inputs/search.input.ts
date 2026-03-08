import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '../decorators/validator-factory.decorator';

@InputType()
export class SearchInput {
  @Field(() => String, { nullable: true, description: 'Поле поиска' })
  @ValidatorFactory({
    isString: true,
    isOptional: true,
  })
  searchTerm?: string;
}
