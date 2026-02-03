import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ส่งออกไปให้ Module อื่น (เช่น Auth) ใช้ได้
})

export class PrismaModule {}