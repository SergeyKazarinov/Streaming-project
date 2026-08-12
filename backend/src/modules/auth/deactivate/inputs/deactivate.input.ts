import { Field, InputType, PickType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';
import { BaseUserInput } from '@/shared/inputs/base-user.input';

@InputType({ description: 'Форма для деактивации аккаунта' })
export class DeactivateInput extends PickType(BaseUserInput, ['email', 'password']) {
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
