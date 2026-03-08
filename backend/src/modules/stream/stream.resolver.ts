import { Args, Query, Resolver } from '@nestjs/graphql';

import { FiltersInput } from '@/shared/inputs/filters.input';

import { StreamModel } from './model/stream.model';
import { StreamService } from './stream.service';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamService) {}

  @Query(() => [StreamModel], { name: 'findAllStreams' })
  async findAllStreams(@Args('input', { type: () => FiltersInput }) input: FiltersInput) {
    return await this.streamService.findAll(input);
  }
}
