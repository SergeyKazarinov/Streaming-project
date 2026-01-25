import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType({ description: 'Форма для деактивации аккаунта' })
export class DeactivateInput {
  @Field(() => String, { description: 'Email пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    isEmail: true,
  })
  email!: string;

  @Field(() => String, { description: 'Пароль пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  password!: string;

  @Field(() => String, { nullable: true, description: 'Код деактивации пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    isOptional: true,
    length: {
      min: 6,
      max: 6,
    },
  })
  deactivateToken?: string;
}
