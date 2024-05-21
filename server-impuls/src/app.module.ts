import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from '#/database/database.module';
import { tSecuserModule } from '#/tSecuser/tSecuser.module';
<<<<<<< HEAD
import { tDocumentsModule } from './tDocuments/tDocuments.module';
import { AuthModule } from '#/auth/auth.module';
import { JWTMiddleware } from './middleware/jwt.middleware';
import { tProjectModule } from './tProject/tProject.module';
import { tObjectModule } from './tObject/tObject.module';

@Module({
  imports: [
    databaseModule,
    AuthModule,
    tSecuserModule,
    tDocumentsModule,
    tProjectModule,
    tObjectModule,
  ],
=======
import { AuthModule } from '#/auth/auth.module';
import { JWTMiddleware } from './middleware/jwt.middleware';



@Module({
  imports: [
    databaseModule, 
    AuthModule, 
    tSecuserModule],
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
<<<<<<< HEAD
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('users');
    /*.apply(JWTMiddleware)
    .forRoutes('documents')*/
  }
}
=======

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(JWTMiddleware)
    .forRoutes('users')
  }
}
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
