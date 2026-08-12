import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';

import { EnableTotpInput } from './inputs/enable-totp.input';
import { TotpModel } from './models/totp.module';
import { TotpService } from './totp.service';

@Resolver('TOTP')
export class TotpResolver {
  constructor(private readonly totpService: TotpService) {}

  @Authorization()
  @Query(() => TotpModel, { name: 'generateSecret' })
  generateSecret(@Authorized() user: User) {
    return this.totpService.generateSecret(user);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'enableTotp' })
  enableTotp(@Authorized() user: User, @Args('input') input: EnableTotpInput) {
    return this.totpService.enableTotp(user, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'disableTotp' })
  disableTotp(@Authorized() user: User) {
    return this.totpService.disableTotp(user);
  }
}
