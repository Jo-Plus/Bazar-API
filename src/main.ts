import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return server;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  await app.init();
  isInitialized = true;

  return server;
}

module.exports = async (req, res) => {
  await bootstrap();
  return server(req, res);
};
