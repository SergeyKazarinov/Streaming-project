import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Модель метаданных' })
export class MetaModel {
  @Field(() => Date, { description: 'Дата создания' })
  createdAt!: Date;

  @Field(() => Date, { description: 'Дата обновления' })
  updatedAt!: Date;
}
