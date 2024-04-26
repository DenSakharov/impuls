import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database.providers';
import { tSecuserModule } from '#/tSecuser/module/tSecuser.module';




@Module({
  imports: [tSecuserModule],
  controllers: [
    AppController,

  ],
  providers: [
    AppService,    
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders
  ],
})
export class AppModule {}