import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserAgent } from '@/shared/decorators/userAgent.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';

import { SecureUserModel } from '../account/models/user.model';

import { VerificationInput } from './inputs/verification.input';
import { VerificationService } from './verification.service';

@Resolver('verification')
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}

  @Mutation(() => SecureUserModel, { name: 'verifyAccount' })
  async verify(@Context() { req }: GqlContext, @Args('data') input: VerificationInput, @UserAgent() userAgent: string) {
    return this.verificationService.verify(req, input, userAgent);
  }
}
