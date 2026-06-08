# ระบบยืม-คืนอุปกรณ์คอมพิวเตอร์

ระบบ React + Vite สำหรับจัดการการยืมและคืนอุปกรณ์คอมพิวเตอร์

## วิธีใช้งานสำหรับผู้พัฒนา

1. ติดตั้ง dependencies
   ```bash
   npm install
   ```
2. เปิดเซิร์ฟเวอร์สำหรับพัฒนา
   ```bash
   npm run dev
   ```
3. เปิดเว็บเบราว์เซอร์ที่
   ```
   http://localhost:5173
   ```

## วิธีสร้างไฟล์สำหรับใช้งานจริง

```bash
npm run build
```

ไฟล์ที่ใช้งานจริงจะถูกสร้างในโฟลเดอร์ `dist/`.

> วิธีนี้ทำให้ระบบใช้งานบนเว็บได้โดยไม่ต้องรัน `npm run dev`.

## ใช้งานข้อมูลออนไลน์ด้วย Firebase

ถ้าต้องการเก็บข้อมูลให้ใช้งานร่วมกันได้จากหลายเครื่อง ต้องเชื่อม Firebase Firestore ดังนี้:

1. สร้าง Firebase project ที่ https://console.firebase.google.com
2. เปิด Firestore Database
3. สร้างไฟล์ `.env` ใน root ของ project โดยคัดลอกจาก `.env.example`
4. ใส่ค่าคอนฟิกจาก Firebase ใน `.env`

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. ตั้งกฎ Firestore ให้อนุญาตเขียน/อ่านสำหรับโปรเจคนี้ (สำหรับการทดสอบ)

เมื่อมีค่า Firebase แล้ว แอปจะพยายามเก็บข้อมูลใน Firestore พร้อม fallback ไปที่ `localStorage` หากไม่สามารถเชื่อมต่อได้

## การ deploy ออนไลน์

### ตัวเลือกโฮสต์
- **Netlify**: ใช้ `netlify.toml` แล้ว deploy แบบ static site
- **Vercel**: ใช้ `vercel.json` สำหรับ deploy React static site
- **Cloudflare Pages**: เชื่อม GitHub แล้วตั้งค่า build เป็น `npm run build` และ publish เป็น `dist`
- **GitHub Pages**: ใช้ `gh-pages` หรือ drag-and-drop ไฟล์ใน `dist`
- **Surge**: deploy แบบง่ายด้วยคำสั่งเดียว

### ตัวอย่างการ deploy ด้วย GitHub Pages

1. สร้าง repository ชื่อ `Borrow-IT-equipment` บน GitHub แล้ว push โค้ดขึ้น
2. ติดตั้ง dependencies ถ้ายังไม่เคยติดตั้ง
   ```bash
   npm install
   ```
3. ใช้คำสั่ง deploy
   ```bash
   npm run deploy
   ```
4. GitHub Pages จะสร้าง branch `gh-pages` และเผยแพร่ไฟล์จาก `dist`
5. เว็บจะเปิดที่
   `https://sittichokmanupibul-collab.github.io/Borrow-IT-equipment`

> ถ้า repo ชื่อหรือ URL ต่างออกไป ให้แก้ค่า `homepage` ใน `package.json` ตาม URL จริงด้วย

### ตัวอย่างการ deploy ด้วย Netlify

1. สร้าง repository บน GitHub และ push โค้ดขึ้น GitHub
2. เข้า [Netlify](https://app.netlify.com) แล้วเลือก "New site from Git"
3. เชื่อม GitHub account และเลือก repository นี้
4. Netlify จะใช้ค่าอัตโนมัติจาก `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. กด deploy แล้วระบบจะออนไลน์ให้เอง

## หมายเหตุสำคัญ

- ระบบใช้งานเก็บข้อมูลบนเบราว์เซอร์ด้วย `localStorage` (fallback) ดังนั้นข้อมูลจะอยู่ในเครื่องเดียวกัน
- การคืนอุปกรณ์ต้องกรอกรหัสผ่านฝ่ายไอที (`2938`) เท่านั้น
- ผู้ยืมไม่สามารถคืนเองได้โดยไม่ผ่านฝ่ายไอทีมอนุมัติ
