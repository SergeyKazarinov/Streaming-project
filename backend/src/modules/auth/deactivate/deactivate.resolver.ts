import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { UserAgent } from '@/shared/decorators/userAgent.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';

import { AuthModel } from '../account/models/auth.model';

import { DeactivateInput } from './inputs/deactivate.input';
import { DeactivateService } from './deactivate.service';

@Resolver('deactivate')
export class DeactivateResolver {
  constructor(private readonly deactivateService: DeactivateService) {}

  @Authorization()
  @Mutation(() => AuthModel, { name: 'deactivateAccount' })
  async deactivateAccount(
    @Context() { req }: GqlContext,
    @Args('data') input: DeactivateInput,
    @UserAgent() userAgent: string,
  ) {
    return this.deactivateService.deactivate(req, input, userAgent);
  }
}
