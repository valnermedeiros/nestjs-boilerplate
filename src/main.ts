import { AppModule } from '@/app.module';
import { GlobalExceptionFilter } from '@/filters/exception/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
    rawBody: true
  });

  if (process.env.SWAGGER_DOCS === 'true') {
    const openapi = SwaggerModule.createDocument(app, new DocumentBuilder().build());
    SwaggerModule.setup('docs', app, openapi);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(HttpAdapterHost).httpAdapter));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
