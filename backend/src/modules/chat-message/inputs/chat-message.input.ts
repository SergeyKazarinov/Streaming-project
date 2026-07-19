import { Field, InputType } from '@nestjs/graphql';

import { ValidatorFactory } from '@/shared/decorators/validator-factory.decorator';

@InputType({ description: 'Сообщение в чате' })
export class ChatMessageInput {
  @Field(() => String, { description: 'Текст сообщения' })
  @ValidatorFactory({
    isString: true,
    isNotEmpty: true,
  })
  text!: string;
}
