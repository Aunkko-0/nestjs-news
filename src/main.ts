import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Median News API')
    .setDescription('The Median API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app as any , config);
  SwaggerModule.setup('api', app as any, document);

  await app.listen(3000);
}
bootstrap();
