import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert("สมัครสำเร็จ! 🎉");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("สมัครไม่ผ่าน!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">📝 สมัครสมาชิก</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ชื่อผู้ใข้งาน</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">อีเมล</label>
              <input 
                type="email" 
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">รหัสผ่าน</label>
              <input 
                type="password" 
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              ยืนยันการสมัคร
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">มีบัญชีแล้ว? </small>
            <Link to="/login" className="text-primary text-decoration-none">เข้าสู่ระบบ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}