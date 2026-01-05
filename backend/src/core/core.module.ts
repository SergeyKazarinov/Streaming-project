import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { envConfig } from '@/shared/config/env-config';
import { getGraphQLConfig } from '@/shared/config/graphql.config';
import { IS_DEV_ENV } from '@/shared/lib/is-dev';

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
  ],
})
export class CoreModule {}
