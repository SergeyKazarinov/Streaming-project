import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { isDev } from '../lib/is-dev';

export const getGraphQLConfig = (configService: ConfigService): ApolloDriverConfig => ({
  playground: isDev(configService),
  path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
  autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
  sortSchema: true,
  context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res }),
});
