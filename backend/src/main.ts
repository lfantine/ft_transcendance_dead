import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'colyseus';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
  const gameServer = new Server();
  gameServer.define("myRoom", gameRoom);
}
bootstrap();
