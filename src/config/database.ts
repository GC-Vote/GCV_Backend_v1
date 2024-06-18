import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

import { ChannelEntity, SuggestionEntity, TitleEntity, UserEntity } from 'entities'
import { DbType } from '@/types';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const dbOptions: DataSourceOptions = {
  type: DB_TYPE as DbType,
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT) || 5432,
  database: DB_DATABASE,
  logging: false,
  synchronize: true,
  entities: [UserEntity, ChannelEntity, TitleEntity, SuggestionEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
  };
  