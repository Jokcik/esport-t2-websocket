import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from './exception/http-exception.filter';
import {ResponseInterceptor} from './response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3003);
}
bootstrap();
