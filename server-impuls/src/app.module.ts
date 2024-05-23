import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from '#/database/database.module';
import { tSecuserModule } from '#/tSecuser/tSecuser.module';
import { tDocumentsModule } from './tDocuments/tDocuments.module';
import { AuthModule } from '#/auth/auth.module';
import { JWTMiddleware } from './middleware/jwt.middleware';
import { tProjectModule } from './tProject/tProject.module';
import { tObjectModule } from './tObject/tObject.module';
import { tPackageModule } from './tPackage/tPackage.module';
import { tChangehistoryModule } from './tHistory/tChangehistory.module';

@Module({
  imports: [
    databaseModule,
    AuthModule,
    tSecuserModule,
    tDocumentsModule,
    tProjectModule,
    tObjectModule,
    tPackageModule,
    tChangehistoryModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('users');
    /*.apply(JWTMiddleware)
    .forRoutes('documents')*/
  }
}
