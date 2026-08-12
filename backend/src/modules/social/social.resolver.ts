import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';

import { CreateSocialLinkInput } from './inputs/create-social-link.input';
import { RemoveSocialLinkInput } from './inputs/remove-social.input';
import { ReorderSocialLinkInput } from './inputs/reorder-social-link.input';
import { UpdateSocialLinkInput } from './inputs/update-social.input';
import { SocialLinkModel } from './models/social-link.model';
import { SocialService } from './social.service';

@Authorization()
@Resolver('Social')
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Mutation(() => SocialLinkModel, { name: 'createSocialLink' })
  async createSocialLink(@Authorized() user: User, @Args('data') input: CreateSocialLinkInput) {
    return await this.socialService.createSocialLink(user, input);
  }

  @Mutation(() => SocialLinkModel, { name: 'updateSocialLink' })
  async updateSocialLink(@Authorized() user: User, @Args('data') input: UpdateSocialLinkInput) {
    return await this.socialService.updateSocialLink(user, input);
  }

  @Mutation(() => Boolean, { name: 'removeSocialLink' })
  async removeSocialLink(@Authorized() user: User, @Args('data') input: RemoveSocialLinkInput) {
    return await this.socialService.deleteSocialLink(user, input);
  }

  @Query(() => [SocialLinkModel], { name: 'findSocialLinksByUser' })
  async findSocialLinksByUser(@Authorized() user: User) {
    return await this.socialService.findSocialLinksByUser(user);
  }

  @Mutation(() => [SocialLinkModel], { name: 'reorderSocialLinks' })
  async reorderSocialLinks(
    @Authorized() user: User,
    @Args('data', { type: () => [ReorderSocialLinkInput] }) input: ReorderSocialLinkInput[],
  ) {
    return await this.socialService.reorderSocialLinks(user, input);
  }
}
