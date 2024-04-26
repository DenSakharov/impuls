import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database.providers';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders
  ],
})
export class AppModule {}
console.log(process.env)