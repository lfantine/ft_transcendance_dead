import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Server } from 'colyseus';

import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' })); // limit size
  app.setGlobalPrefix('api');
  // app.enableCors({credentials:true, origin: 'https://localhost:3000',})
  await app.listen(3000);
  // const gameServer = new Server();
  // gameServer.define("myRoom", gameRoom);
}
bootstrap();
