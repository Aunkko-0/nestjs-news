import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // นำเข้าโลโก้ที่ต้องการใช้
export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        {/* โลโก้ */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="News Portal Logo" 
            height="60" // กำหนดความสูงให้พอดี (ปรับเลขได้ตามชอบ)
            className="d-inline-block align-text-top me-2" 
          />
          {/* ถ้าอยากให้มีชื่อเว็บต่อท้ายโลโก้ ก็ใส่ตรงนี้ได้ หรือลบออกก็ได้ */}
          <span className="fw-bold">News Portal</span>
        </Link>

        {/* เมนูขวา */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none text-secondary">หน้าแรก</Link>

          
          
          {isAuthenticated ? (
            <>
              <span className="text-success fw-bold">👤 สมาชิก</span>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-decoration-none text-secondary">เข้าสู่ระบบ</Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}