import { InputType, OmitType } from '@nestjs/graphql';

import { BaseSocialInput } from './base-social.input';

@InputType()
export class CreateSocialLinkInput extends OmitType(BaseSocialInput, ['order', 'id']) {}
