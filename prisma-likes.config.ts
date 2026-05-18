import { definePrismaConfig } from './prisma-utils';

export const prismaLikesConfig = definePrismaConfig({
  schemaPath: './prisma/likes/schema.prisma',
  databaseUrl: process.env.LIKES_DB_URL,
  name: 'likes',
  module: 'likes',
});
