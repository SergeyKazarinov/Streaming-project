import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class ChangeStreamInfoInput {
  @Field(() => String, { description: 'Название стрима' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  title!: string;

  @Field(() => String, { nullable: true, description: 'ID категории' })
  @ValidatorFactory({
    isString: true,
    isOptional: true,
  })
  categoryId!: string;
}
