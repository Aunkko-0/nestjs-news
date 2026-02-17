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

  const document = SwaggerModule.createDocument(app, config); // ลบ as any ออก
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  
  // เพิ่มการดักจับ Error เพื่อดูว่าเกิดอะไรขึ้น
  await app.listen(port).catch(err => {
    console.error('Failed to start server:', err);
  });

  console.log(`Application is running on: http://localhost:${port}`);
}


bootstrap();