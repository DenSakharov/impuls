import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from '#/database/module/database.module';
import { tSecuserModule } from '#/tSecuser/module/tSecuser.module';




@Module({
  imports: [
    tSecuserModule,
    databaseModule
  ],
  controllers: [
    AppController,

  ],
  providers: [
    AppService,    
  ],
  exports: [
  ],
})
export class AppModule {}