import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';

import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';
import { SecureUserModel } from './models/user.model';
import { AccountService } from './account.service';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => SecureUserModel, { name: 'findMe' })
  async me(@Authorized('id') id: string) {
    return this.accountService.me(id);
  }

  @Authorization()
  @Mutation(() => SecureUserModel, { name: 'changeEmail' })
  async changeEmail(@Authorized() user: User, @Args('data') input: ChangeEmailInput) {
    return this.accountService.changeEmail(user, input);
  }

  @Authorization()
  @Mutation(() => SecureUserModel, { name: 'changePassword' })
  async changePassword(@Authorized() user: User, @Args('data') input: ChangePasswordInput) {
    return this.accountService.changePassword(user, input);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  async create(@Args('data') input: CreateUserInput) {
    return this.accountService.create(input);
  }
}
