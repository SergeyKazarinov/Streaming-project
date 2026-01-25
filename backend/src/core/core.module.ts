import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AccountModule } from '@/modules/auth/account/account.module';
import { DeactivateModule } from '@/modules/auth/deactivate/deactivate.module';
import { ResetPasswordModule } from '@/modules/auth/reset-password/reset-password.module';
import { SessionModule } from '@/modules/auth/session/session.module';
import { TotpModule } from '@/modules/auth/totp/totp.module';
import { VerificationModule } from '@/modules/auth/verification/verification.module';
import { MailModule } from '@/modules/mail/mail.module';

import { envConfig } from '@/shared/config/env-config';
import { getGraphQLConfig } from '@/shared/config/graphql.config';
import { IS_DEV_ENV } from '@/shared/lib/is-dev';

import { PrismaService } from './prisma/prisma.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    RedisModule,
    MailModule,
    VerificationModule,
    AccountModule,
    SessionModule,
    ResetPasswordModule,
    TotpModule,
    DeactivateModule,
  ],
  providers: [PrismaService],
})
export class CoreModule {}
