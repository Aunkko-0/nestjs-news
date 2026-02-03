import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.accessToken);
      alert("ล็อกอินสำเร็จ! 🎉");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("อีเมลหรือรหัสผ่านผิดครับ!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <div className="card shadow">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">🔐 เข้าสู่ระบบ</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">อีเมล</label>
              <input 
                type="email" 
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">รหัสผ่าน</label>
              <input 
                type="password" 
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">ยังไม่มีบัญชี? </small>
            <Link to="/register" className="text-primary text-decoration-none">สมัครสมาชิก</Link>
          </div>
        </div>
      </div>
    </div>
  );
}