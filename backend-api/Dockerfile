# --- Stage 1: Build (ตัวก่อสร้าง) ---
# ใช้ Node Image รุ่นเล็ก (Alpine) เพื่อความเบา
FROM node:18-alpine AS builder

# สร้างโฟลเดอร์ทำงาน
WORKDIR /app

# ก๊อปปี้ไฟล์รายการแพ็คเกจเข้าไปก่อน (เพื่อใช้ Cache)
COPY package*.json ./
# ก๊อปปี้โฟลเดอร์ prisma เข้าไป (จำเป็นสำหรับการ generate client)
COPY prisma ./prisma/

# ลงโปรแกรมทั้งหมด (รวม DevDependencies เพื่อใช้ Build)
RUN npm install

# สร้าง Prisma Client
RUN npx prisma generate

# ก๊อปปี้โค้ดทั้งหมดที่เหลือเข้าไป
COPY . .

# สั่ง Build (แปลง TypeScript -> JavaScript)
RUN npm run build

# --- Stage 2: Production (ตัวใช้งานจริง) ---
FROM node:18-alpine

WORKDIR /app

# ก๊อปปี้เฉพาะของที่จำเป็นจาก Stage 1 มาใช้
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# ลงโปรแกรมที่จำเป็นสำหรับรันเท่านั้น (ไม่เอา DevDependencies)
RUN npm install --only=production

# ต้อง Generate Prisma Client อีกรอบสำหรับ Stage นี้
# (เพราะเราลง node_modules ใหม่ ตัว Client ที่สร้างใน Stage 1 จะหายไป)
RUN npx prisma generate

# ก๊อปปี้โค้ดที่ Build เสร็จแล้วจาก Stage 1 มาใช้
COPY --from=builder /app/dist ./dist

# เปิด Port 3000
EXPOSE 3000

# คำสั่งรัน Server เมื่อเริ่มทำงาน
CMD ["npm", "run", "start:prod"]