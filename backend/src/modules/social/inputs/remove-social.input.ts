import { InputType, PickType } from '@nestjs/graphql';

import { BaseSocialInput } from './base-social.input';

@InputType()
export class RemoveSocialLinkInput extends PickType(BaseSocialInput, ['id']) {}
