import { definePrismaConfig } from './prisma-utils';

export const prismaMusicConfig = definePrismaConfig({
  schemaPath: './prisma/music/schema.prisma',
  databaseUrl: process.env.MUSIC_DB_URL,
  name: 'music',
  module: 'music',
});
