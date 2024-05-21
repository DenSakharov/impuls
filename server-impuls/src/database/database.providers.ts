import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { tSecuser } from '#/tSecuser/tSecuser';
<<<<<<< HEAD
import { tDocuments, tObject, tProject } from '#/entities';
=======

>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6

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
<<<<<<< HEAD
      sequelize.addModels([tSecuser, tDocuments, tProject, tObject]);
=======
      sequelize.addModels([
        tSecuser, 
      ]);
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
      await sequelize.sync();
      return sequelize;
    },
  },
<<<<<<< HEAD
];
=======
];
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
