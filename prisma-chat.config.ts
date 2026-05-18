import { definePrismaConfig } from './prisma-utils';

export const prismaChatConfig = definePrismaConfig({
  schemaPath: './prisma/chat/schema.prisma',
  databaseUrl: process.env.CHAT_DB_URL,
  name: 'chat',
  module: 'chat',
});
