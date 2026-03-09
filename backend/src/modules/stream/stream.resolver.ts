import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';
import { FiltersInput } from '@/shared/inputs/filters.input';

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { StreamModel } from './model/stream.model';
import { StreamService } from './stream.service';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamService) {}

  @Query(() => [StreamModel], { name: 'findAllStreams' })
  async findAllStreams(@Args('input', { type: () => FiltersInput }) input: FiltersInput) {
    return await this.streamService.findAll(input);
  }

  @Query(() => [StreamModel], { name: 'findRandomStreams' })
  async findRandomStreams() {
    return await this.streamService.findRandomStream();
  }

  @Authorization()
  @Mutation(() => StreamModel, { name: 'changeStreamInfo' })
  async changeStreamInfo(@Authorized() user: User, @Args('data') input: ChangeStreamInfoInput) {
    return await this.streamService.changeStreamInfo(user, input);
  }
}
