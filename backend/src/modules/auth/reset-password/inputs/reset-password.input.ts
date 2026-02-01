import { InputType, PickType } from '@nestjs/graphql';

import { BaseUserInput } from '@/shared/inputs/base-user.input';

@InputType()
export class ResetPasswordInput extends PickType(BaseUserInput, ['email']) {}
