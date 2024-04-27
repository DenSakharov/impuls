import { Module } from '@nestjs/common';
import { databaseProviders } from '#/database/provider/database.providers';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ...databaseProviders,
  ],
})
export class databaseModule {}