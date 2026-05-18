import { definePrismaConfig } from './prisma-utils';

export const prismaMatchesConfig = definePrismaConfig({
  schemaPath: './prisma/matches/schema.prisma',
  databaseUrl: process.env.MATCHES_DB_URL,
  name: 'matches',
  module: 'matches',
});
