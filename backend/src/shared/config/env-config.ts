import 'dotenv/config';

interface EnvConfig {
  port: string;
  database: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    databaseUrl: string;
  };
  isDev: boolean;
}

export const envConfig = (): EnvConfig => ({
  port: process.env.PORT || '3000',
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    databaseUrl: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
  },
  isDev: process.env.NODE_ENV === 'development',
});
