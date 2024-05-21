import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors()
=======
  app.enableCors({
    origin: 'http://localhost:3000'
  })
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
  await app.listen(3010);
}
bootstrap();
