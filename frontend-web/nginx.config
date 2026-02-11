server {
    listen 80;
    
    # โฟลเดอร์ที่เก็บไฟล์ Frontend ที่ Build เสร็จแล้ว
    root /usr/share/nginx/html;
    index index.html;

    # ตั้งค่าให้รองรับ Router ของ React/Vue (แก้ปัญหา Refresh แล้ว 404)
    location / {
        try_files $uri $uri/ /index.html;
    }
}