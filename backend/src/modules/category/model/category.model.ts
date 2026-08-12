import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from 'prisma/generated/prisma/browser';

import { StreamModel } from '@/modules/stream/model/stream.model';

import { MetaModel } from '@/shared/models/meta.model';

@ObjectType()
export class CategoryModel extends MetaModel implements Category {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { description: 'Название категории' })
  title!: string;

  @Field(() => String, { nullable: true, description: 'Описание категории' })
  description!: Nullable<string>;

  @Field(() => String, { nullable: true, description: 'URL preview категории' })
  thumbnailUrl!: Nullable<string>;

  @Field(() => String, { description: 'Slug категории' })
  slug!: string;

  @Field(() => [StreamModel], { description: 'Стримы категории' })
  streams?: StreamModel[];
}
