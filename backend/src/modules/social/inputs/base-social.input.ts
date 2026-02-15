import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType()
export class BaseSocialInput {
  @Field(() => String, { description: 'id социальной ссылки' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  id!: string;

  @Field(() => String, { description: 'Название ссылки' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  title!: string;

  @Field(() => String, { description: 'URL ссылки' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    isUrl: true,
  })
  url!: string;

  @Field(() => Number, { description: 'Порядковый номер' })
  @ValidatorFactory({
    isNumber: true,
    isNotEmpty: true,
  })
  order!: number;
}
