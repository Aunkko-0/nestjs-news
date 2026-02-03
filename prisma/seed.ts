// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// เรียกใช้งาน Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding... (กำลังเริ่มเสกข้อมูล)');

  // 1. สร้าง User คนที่ 1: ชื่อ Alice
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' }, // เช็กว่ามี email นี้หรือยัง
    update: {}, // ถ้ามีแล้วไม่ต้องทำอะไร
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: 'password-alice', // รหัสผ่านปลอมๆ
      articles: {
        create: [
          {
            title: 'บทความแรกของ Alice',
            body: 'สวัสดี นี่คือบทความแรกที่สร้างจาก Seed',
            description: 'เขียนโดย Alice เอง',
            published: true,
          },
          {
            title: 'Alice เล่าเรื่องแมว',
            body: 'แมวเป็นสัตว์ที่น่ารักมาก...',
            published: false,
          },
        ],
      },
    },
  });

  // 2. สร้าง User คนที่ 2: ชื่อ Bob
  const user2 = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: 'password-bob',
      articles: {
        create: [
          {
            title: 'Bob ชอบเขียนโค้ด',
            body: 'การเขียนโปรแกรมด้วย NestJS สนุกมาก',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
  console.log('✅ Seeding finished. (เสกข้อมูลเสร็จแล้ว)');
}

// ฟังก์ชันสำหรับรันและจัดการ Error
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });