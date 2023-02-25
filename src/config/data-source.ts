import { DataSource } from 'typeorm';
import { env } from 'process';
import * as dotenv from 'dotenv';
import { Category } from '../entity/category.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.MYSQL_HOST,
  port: parseInt(env.MYSQL_PORT + ''),
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  entities: [Category],
  migrations: ['dist/migration/*.js'],
  migrationsTableName: 'migrations',
  synchronize: true,
});

export default AppDataSource;