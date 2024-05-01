import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from '#/database/module/database.module';
import { tSecuserModule } from '#/tSecuser/tSecuser.module';
import { AuthModule } from '#/auth/auth.module';
import { JWTMiddleware } from './middleware/jwt.middleware';



@Module({
  imports: [
    databaseModule, 
    AuthModule, 
    tSecuserModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(JWTMiddleware)
    .forRoutes('users')
  }
}