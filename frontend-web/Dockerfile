# --- Stage 1: Build (ตัวก่อสร้าง) ---
# ใช้ Node Image รุ่นเล็ก (Alpine) เหมือน Backend
FROM node:18-alpine AS builder

# สร้างโฟลเดอร์ทำงาน
WORKDIR /app

# รับค่า Environment Variable จาก Jenkins (ตอนสั่ง Build)
# เพื่อฝัง URL ของ Backend ลงไปในโค้ด React ตั้งแต่ตอน Build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# ก๊อปปี้ไฟล์รายการแพ็คเกจเข้าไปก่อน (เพื่อใช้ Cache)
COPY package*.json ./

# ลงโปรแกรมทั้งหมด (รวม DevDependencies เพื่อใช้ Build)
RUN npm install

# ก๊อปปี้โค้ดทั้งหมดที่เหลือเข้าไป
COPY . .

# สั่ง Build (แปลง React -> HTML/CSS/JS)
# ผลลัพธ์จะไปอยู่ที่โฟลเดอร์ /app/dist
RUN npm run build

# --- Stage 2: Production (ตัวใช้งานจริง) ---
# เปลี่ยนมาใช้ Nginx Alpine เพราะ Frontend ไม่ต้องใช้ Node รัน (ประหยัดทรัพยากร)
FROM nginx:alpine

# ก๊อปปี้ไฟล์ Config ของ Nginx เข้าไป (เพื่อให้รองรับ Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ลบไฟล์ Default ของ Nginx ทิ้ง (กันเหนียว)
RUN rm -rf /usr/share/nginx/html/*

# ก๊อปปี้ "เฉพาะไฟล์ที่ Build เสร็จแล้ว" จาก Stage 1 มาใช้
# (สังเกตว่าเราไม่เอา node_modules มาเลย เพราะ Nginx ไม่ต้องใช้)
COPY --from=builder /app/dist /usr/share/nginx/html

# เปิด Port 80 (Port มาตรฐานของเว็บ)
EXPOSE 80

# คำสั่งรัน Nginx (ไม่ต้องใช้ npm run start แล้ว)
CMD ["nginx", "-g", "daemon off;"]