import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Follow } from 'src/follow/tables/follow.table';
import { Tweets } from 'src/tweets/tables/tweet.table';
import { Users } from 'src/users/tables/users.table';
config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATA_BASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([Users, Tweets, Follow]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
