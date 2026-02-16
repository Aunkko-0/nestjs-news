import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. ตั้งค่า CORS (ครั้งเดียวพอครับ)
  app.enableCors({
    origin: '*', // ช่วง Dev ให้เข้าได้หมด
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. ตั้งค่า Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 3. ตั้งค่า Swagger
  const config = new DocumentBuilder()
    .setTitle('Median News API')
    .setDescription('The Median API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config); // ลบ as any ออกได้ถ้า Version ตรงกัน
  SwaggerModule.setup('api', app, document);

  // 4. กำหนด Port
  const port = process.env.PORT || 3000;

  // 5. Start Server (บรรทัดเดียว จบ!)
  // สำคัญ: ใส่ '0.0.0.0' เพื่อให้ K8s ยิงเข้ามาเจอ (ถ้าไม่ใส่ บางทีมันฟังแค่ localhost ภายใน container)
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();