import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'express-cors';
import {HttpExceptionFilter} from './exception/http-exception.filter';
import {ResponseInterceptor} from './response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '10MB' }));
  app.use(cors({
    allowedOrigins: ['localhost:3000', 'localhost:4200', 'http://esport.tele2.ru/', 'http://cyberhero.tele2.ru/'],
    headers: ['Origin', 'Content-Type', 'enctype', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));

  // app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());


  await app.listen(3000);
}
bootstrap();
