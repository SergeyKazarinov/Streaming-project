import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserAgent } from '@/shared/decorators/userAgent.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';

import { ResetPasswordInput } from './inputs/reset-password.input';
import { UpdatePasswordInput } from './inputs/update-password.input';
import { ResetPasswordService } from './reset-password.service';

@Resolver('resetPassword')
export class ResetPasswordResolver {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Mutation(() => Boolean, { name: 'resetPassword' })
  async resetPassword(
    @Context() { req }: GqlContext,
    @Args('data') input: ResetPasswordInput,
    @UserAgent() userAgent: string,
  ) {
    return this.resetPasswordService.resetPassword(req, input, userAgent);
  }

  @Mutation(() => Boolean, { name: 'updatePassword' })
  async updatePassword(@Args('data') input: UpdatePasswordInput) {
    return this.resetPasswordService.updatePassword(input);
  }
}
