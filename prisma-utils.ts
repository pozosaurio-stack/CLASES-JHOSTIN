// Utility for defining Prisma configurations
export interface PrismaConfigOptions {
  schemaPath: string;
  databaseUrl: string | undefined;
  name: string;
  module: string;
}

export interface PrismaConfig extends PrismaConfigOptions {
  migrateDir: string;
  generatedDir: string;
}

export function definePrismaConfig(options: PrismaConfigOptions): PrismaConfig {
  return {
    ...options,
    migrateDir: `./prisma/${options.name}/migrations`,
    generatedDir: `./generated/${options.name}`,
  };
}
