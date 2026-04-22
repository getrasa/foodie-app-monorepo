import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';

class CamelCaseNamingStrategy extends UnderscoreNamingStrategy {
  classToTableName(entityName: string): string {
    return entityName.charAt(0).toLowerCase() + entityName.slice(1);
  }

  propertyToColumnName(propertyName: string): string {
    return propertyName;
  }
}

const config = defineConfig({
  dbName: process.env.DATABASE_NAME ?? 'feedbackbite',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 5432),
  user: process.env.DATABASE_USER ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  debug: process.env.NODE_ENV === 'development',
  allowGlobalContext: true,
  namingStrategy: CamelCaseNamingStrategy,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
  pool: {
    min: 2,
    max: 20,
    acquireTimeoutMillis: 30000,
  },
});

export default config;
