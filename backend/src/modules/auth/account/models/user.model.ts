import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  displayName!: string;

  @Field(() => String, { nullable: true })
  avatar!: string;

  @Field(() => Boolean)
  isVerified!: boolean;

  @Field(() => Boolean)
  isEmailVerified!: boolean;

  @Field(() => String, { nullable: true })
  bio!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
