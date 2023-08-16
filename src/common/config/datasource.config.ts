import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER_NAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE || 'grab',
  schema: process.env.DATABASE_SCHEMA || 'public',
  synchronize: false,
  migrations: [join(__dirname, '../..', 'database/migrations', '*.{ts,js}')],
  entities: [__dirname + '../../../**/**/*entity{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
    entitiesDir: './src/database/entities',
  },

  logging: true,
  migrationsRun: false,
  migrationsTableName: 'history',
  timezone: 'utc',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepConnectionAlive: true,
} as DataSourceOptions);
