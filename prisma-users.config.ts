import { definePrismaConfig } from './prisma-utils';

export const prismaUsersConfig = definePrismaConfig({
  schemaPath: './prisma/users/schema.prisma',
  databaseUrl: process.env.USERS_DB_URL,
  name: 'users',
  module: 'users',
});
