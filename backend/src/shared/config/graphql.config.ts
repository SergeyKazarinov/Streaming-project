import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { join } from 'path';

import { isDev } from '../lib/is-dev';

export const getGraphQLConfig = (configService: ConfigService): ApolloDriverConfig => ({
  graphiql: isDev(configService),
  path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
  autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
  sortSchema: true,
  context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  installSubscriptionHandlers: true,
  introspection: true,
});
