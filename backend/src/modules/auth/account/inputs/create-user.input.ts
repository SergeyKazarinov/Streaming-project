import { Field, InputType } from '@nestjs/graphql';

import { ONLY_LATIN_ALPHABET_REGEX } from '@/shared/consts/regex';
import { Validator } from '@/shared/decorators/validator.decorator';

@InputType({ description: 'Создание пользователя при регистрации' })
export class CreateUserInput {
  @Field(() => String, { description: 'Имя пользователя' })
  @Validator({
    isString: true,
    isNotEmpty: true,
    matches: {
      regexp: ONLY_LATIN_ALPHABET_REGEX,
      message: ({ property }) => `Поле ${property} должно содержать только латинские буквы, цифры и символы - и _`,
    },
  })
  username!: string;

  @Field(() => String, { description: 'Email пользователя' })
  @Validator({
    isString: true,
    isNotEmpty: true,
    isEmail: true,
  })
  email!: string;

  @Field(() => String, { description: 'Пароль пользователя' })
  @Validator({
    isString: true,
    isNotEmpty: true,
    minLength: 8,
  })
  password!: string;
}
