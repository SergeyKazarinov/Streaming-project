import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserAgent } from '@/shared/decorators/userAgent.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';

import { UserModel } from '../account/models/user.model';

import { LoginInput } from './inputs/login.input';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel, { name: 'login' })
  async login(@Context() { req }: GqlContext, @Args('data') input: LoginInput, @UserAgent() userAgent: string) {
    return this.sessionService.login(req, input, userAgent);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Context() { req }: GqlContext) {
    return this.sessionService.logout(req);
  }
}
