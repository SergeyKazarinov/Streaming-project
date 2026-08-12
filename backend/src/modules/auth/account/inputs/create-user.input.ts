import { InputType, PickType } from '@nestjs/graphql';

import { BaseUserInput } from '@/shared/inputs/base-user.input';

@InputType({ description: 'Создание пользователя при регистрации' })
export class CreateUserInput extends PickType(BaseUserInput, ['username', 'email', 'password']) {}
