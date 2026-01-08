import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

import { ONLY_LATIN_ALPHABET_REGEX } from '@/shared/consts/regex';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Matches(ONLY_LATIN_ALPHABET_REGEX)
  username!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
