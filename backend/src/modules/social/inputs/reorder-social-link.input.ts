import { InputType, PickType } from '@nestjs/graphql';

import { BaseSocialInput } from './base-social.input';

@InputType()
export class ReorderSocialLinkInput extends PickType(BaseSocialInput, ['order', 'id']) {}
