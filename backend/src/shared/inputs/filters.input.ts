import { Field, InputType } from '@nestjs/graphql';

import { PaginationInput } from '@/shared/inputs/pagination.input';
import { SearchInput } from '@/shared/inputs/search.input';

import { ValidatorFactory } from '../decorators/validator-factory.decorator';

@InputType()
export class FiltersInput extends PaginationInput implements SearchInput {
  @Field(() => String, { nullable: true, description: 'Поле поиска' })
  @ValidatorFactory({
    isString: true,
    isOptional: true,
  })
  searchTerm?: string;
}
