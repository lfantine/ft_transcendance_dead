import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SocketAdaptater } from './socket/SocketAdaptater';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' })); // limit size
  app.setGlobalPrefix('api');

  app.useWebSocketAdapter(new SocketAdaptater(app));

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
