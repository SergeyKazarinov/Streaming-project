import { Field, InputType } from '@nestjs/graphql';

import { ONLY_LATIN_ALPHABET_REGEX } from '../consts/regex';
import { ValidatorFactory } from '../decorators/validator-factory.decorator';

@InputType()
export class BaseUserInput {
  @Field(() => String, { description: 'Имя пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    matches: {
      regexp: ONLY_LATIN_ALPHABET_REGEX,
      message: ({ property }) => `Поле ${property} должно содержать только латинские буквы, цифры и символы - и _`,
    },
  })
  username!: string;

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

  @Field(() => String, { description: 'Имя пользователя, отображаемое на сайте' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  displayName!: string;

  @Field(() => String, { description: 'Биография пользователя' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
    maxLength: 255,
    isOptional: true,
  })
  bio?: string;
}
