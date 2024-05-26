import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { tSecuser } from '#/tSecuser/tSecuser';
import { tChangehistory, tDocuments, tObject, tPackage, tProject } from '#/entities';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([tSecuser, tDocuments, tProject, tObject, tPackage, tChangehistory]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
