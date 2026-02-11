# --- Stage 1: Build ---
FROM node:18-alpine AS builder

WORKDIR /app

# 1. ลง Dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# 2. ก๊อปปี้ Source Code ทั้งหมด
COPY . .

# 3. Generate Prisma & Build
RUN npx prisma generate
RUN npm run build

# 🔍 DEBUG: สั่งให้ List ไฟล์ออกมาดูหน่อยว่า main.js อยู่ไหน
# (ดูผลลัพธ์ได้ใน Log ตอน Build ถ้ามันพังอีก)
RUN echo "📂 Checking dist folder structure:" && ls -R dist

# --- Stage 2: Production ---
FROM node:18-alpine

WORKDIR /app

# 1. ก๊อปปี้ package.json และ prisma
COPY package*.json ./
COPY prisma ./prisma/

# 2. ลงเฉพาะ Production Dependencies (เพื่อความเบา)
RUN npm install --only=production

# 3. Generate Prisma Client (สำหรับ Production environment)
RUN npx prisma generate

# 4. ก๊อปปี้ไฟล์ที่ Build เสร็จแล้วจาก Stage 1
# ⚠️ สำคัญ: ต้องแน่ใจว่า path นี้ถูก
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# 5. รัน Server
# แนะนำให้ใช้ node โดยตรงเพื่อลดปัญหา npm script error
CMD ["node", "dist/main"]