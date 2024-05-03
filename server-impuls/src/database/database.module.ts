import { Module } from '@nestjs/common';
import { databaseProviders } from '#/database/database.providers';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ...databaseProviders,
  ],
})
export class databaseModule {}