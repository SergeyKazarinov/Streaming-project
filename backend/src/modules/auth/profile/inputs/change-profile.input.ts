import { InputType, PickType } from '@nestjs/graphql';

import { BaseUserInput } from '@/shared/inputs/base-user.input';

@InputType()
export class ChangeProfileInput extends PickType(BaseUserInput, ['username', 'displayName', 'bio']) {}
