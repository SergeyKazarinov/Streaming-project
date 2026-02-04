import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';
import { FileValidationPipe } from '@/shared/pipes/file-validation.pipe';

import { SecureUserModel } from '../account/models/user.model';

import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Authorization()
  @Mutation(() => SecureUserModel, { name: 'changeAvatar' })
  async changeAvatar(
    @Authorized() user: User,
    @Args('data', { type: () => GraphQLUpload }, FileValidationPipe) file: FileUpload,
  ) {
    return await this.profileService.changeAvatar(user, file);
  }

  @Authorization()
  @Mutation(() => SecureUserModel, { name: 'removeAvatar' })
  async removeAvatar(@Authorized() user: User) {
    return await this.profileService.removeAvatar(user);
  }
}
