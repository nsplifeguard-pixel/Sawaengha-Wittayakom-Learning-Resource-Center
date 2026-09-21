# แนวทาง Deploy

## แบบง่าย
อัปโหลดทั้งโฟลเดอร์ไปยัง Static Hosting เช่น GitHub Pages / Netlify / Vercel

## ใช้งานจริง
1. ตั้ง Backend/API
2. ใช้ฐานข้อมูลตาม database-schema.json หรือ database.sql
3. เปลี่ยน js/store.js เป็น API client
4. เพิ่ม Authentication จริง
5. ตั้ง Storage สำหรับรูปภาพ/เอกสาร
6. เปิด HTTPS
7. สำรองฐานข้อมูลตามรอบ

## Google Sheets/AppSheet
สามารถใช้ database-schema.json เป็นแบบร่างตาราง แล้วสร้าง AppSheet จาก Google Sheets
