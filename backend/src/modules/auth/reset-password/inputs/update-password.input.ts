import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength, Validate } from 'class-validator';

import { IsPasswordMatchingConstraint } from '@/shared/decorators/is-password-matching-constraint.decorator';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Validate(IsPasswordMatchingConstraint)
  confirmPassword!: string;

  @Field(() => String)
  @IsUUID('4')
  @IsNotEmpty()
  token!: string;
}
