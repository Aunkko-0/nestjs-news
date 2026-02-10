import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*', // ช่วง Dev/Test ให้เข้าได้หมด (Production ค่อยเปลี่ยนเป็น Domain เว็บเรา)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;

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

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);

}
bootstrap();
