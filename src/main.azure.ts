import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';  // Fastify 어댑터 가져오기
import { CustomHttpExceptionFilter } from './custom-http-exception.filter';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());  // Fastify 어댑터 사용
  app.setGlobalPrefix('api');

  // 커스텀 Exception 필터 등록
  app.useGlobalFilters(new CustomHttpExceptionFilter());

  await app.init();
  return app;
}
