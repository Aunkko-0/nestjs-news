import { useState, useEffect } from 'react';
import { api } from '../../services/api'; // ตัวยิง API ที่เราทำไว้
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';


export default function CreateArticlePage() {
  const navigate = useNavigate();
  
  // 1. เช็คก่อนเลยว่ามี Token ไหม? ถ้าไม่มี ดีดกลับไปหน้า Login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนเขียนข่าวนะครับ! 👮‍♂️");
      navigate('/login');
    }
  }, [navigate]);

  // 2. ตัวแปรเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    published: true, // ตั้งค่าให้เผยแพร่เลย
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 3. ยิง API (Token จะถูกแนบไปเองอัตโนมัติจากไฟล์ api.ts)
      await api.post('/articles', formData);
      
      alert("สร้างข่าวเสร็จเรียบร้อย! 🎉");
      navigate('/'); // กลับไปหน้าแรก

    } catch (error) {
      const err = error as AxiosError;
      console.error("Error Detail:", err);
      alert(`Error: ${err.response?.status} - ${JSON.stringify(err.response?.data)}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">✍️ เขียนบทความใหม่</h4>
        </div>

        <div className="alert alert-info d-flex align-items-center mb-4" role="alert">
        <div className="me-3">
            {/* รูปไอคอนกล้องถ่ายรูป */}
           <span style={{ fontSize: '3rem' }}>📸</span>
        </div>
        <div>
          <strong>หมายเหตุเรื่องรูปภาพ:</strong> <br/>
          เนื่องจากเป็นระบบทดสอบ รูปภาพหน้าปกจะถูก <u>สุ่มอัตโนมัติ</u> โดยระบบหลังจากที่คุณกดบันทึกข่าวครับ
        </div>
      </div>
      
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label className="form-label fw-bold">หัวข้อข่าว</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="เช่น วันนี้อากาศดีจัง..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">คำโปรย (สั้นๆ)</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="สรุปใจความสำคัญ..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">เนื้อหาข่าว</label>
              <textarea 
                className="form-control"
                rows={6}
                placeholder="เล่ารายละเอียดตรงนี้เลย..."
                value={formData.body}
                onChange={(e) => setFormData({...formData, body: e.target.value})}
                required
              ></textarea>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-lg">
                🚀 เผยแพร่บทความ
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/')} 
                className="btn btn-outline-secondary"
              >
                ยกเลิก
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}