import { definePrismaConfig } from './prisma-utils';

export const prismaSubscriptionsConfig = definePrismaConfig({
  schemaPath: './prisma/subscriptions/schema.prisma',
  databaseUrl: process.env.SUBSCRIPTIONS_DB_URL,
  name: 'subscriptions',
  module: 'subscriptions',
});
