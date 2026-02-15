import { Field, InputType, PartialType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

import { BaseSocialInput } from './base-social.input';

@InputType()
export class UpdateSocialLinkInput extends PartialType(BaseSocialInput) {
  @Field(() => String, { description: 'id социальной ссылки' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  id!: string;
}
