import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';
import { FiltersInput } from '@/shared/inputs/filters.input';
import { FileValidationPipe } from '@/shared/pipes/file-validation.pipe';

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';
import { GenerateStreamTokenModel } from './model/generate-stream-token.model';
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

  @Authorization()
  @Mutation(() => StreamModel, { name: 'changeThumbnail' })
  async changeThumbnail(
    @Authorized() user: User,
    @Args('data', { type: () => GraphQLUpload }, FileValidationPipe) file: FileUpload,
  ) {
    return await this.streamService.changeThumbnail(user, file);
  }

  @Authorization()
  @Mutation(() => StreamModel, { name: 'removeThumbnail' })
  async removeThumbnail(@Authorized() user: User) {
    return await this.streamService.removeThumbnail(user);
  }

  @Mutation(() => GenerateStreamTokenModel, { name: 'generateStreamToken' })
  async generateStreamToken(@Args('input') input: GenerateStreamTokenInput) {
    return await this.streamService.generateStreamToken(input);
  }
}
