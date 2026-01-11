import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { UserAgent } from '@/shared/decorators/userAgent.decorator';
import { GqlContext } from '@/shared/types/gql-context.type';

import { UserModel } from '../account/models/user.model';

import { LoginInput } from './inputs/login.input';
import { SessionModel } from './models/session.model';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Query(() => [SessionModel], { name: 'findSessionsByUser' })
  async findSessionsByUser(@Context() { req }: GqlContext) {
    return this.sessionService.findSessionsByUser(req);
  }

  @Authorization()
  @Query(() => SessionModel, { name: 'findCurrentSession' })
  async findCurrent(@Context() { req }: GqlContext) {
    return this.sessionService.findCurrent(req);
  }

  @Mutation(() => UserModel, { name: 'login' })
  async login(@Context() { req }: GqlContext, @Args('data') input: LoginInput, @UserAgent() userAgent: string) {
    return this.sessionService.login(req, input, userAgent);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Context() { req }: GqlContext) {
    return this.sessionService.logout(req);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'clearSessionCookie' })
  clearSession(@Context() { req }: GqlContext) {
    return this.sessionService.clearSession(req);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeSession' })
  removeSession(@Context() { req }: GqlContext, @Args('id') id: string) {
    return this.sessionService.remove(req, id);
  }
}
