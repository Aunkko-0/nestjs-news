import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom' // 👈 ตัวจัดการเปลี่ยนหน้า
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ครอบ App ด้วย BrowserRouter เพื่อให้เปลี่ยนหน้าได้ */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)