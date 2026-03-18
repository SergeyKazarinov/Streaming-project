import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenerateStreamTokenModel {
  @Field(() => String, { description: 'Токен для стрима' })
  token!: string;
}
