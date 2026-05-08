import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //DTO에 없는 값 자동 제거
      forbidNonWhitelisted: true, //이상한 필드 들어올 시 에러 출력
      transform: true, //타입 자동 환환
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('FieldFlow API')
    .setDescription('FieldFlow MVP API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
