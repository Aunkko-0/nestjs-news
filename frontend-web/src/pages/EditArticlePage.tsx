import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditArticlePage() {
  const { id } = useParams(); // 1. ดึง ID จาก URL (เช่น /edit-post/5)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', body: '' });

  // 2. โหลดข้อมูลเก่ามาใส่ฟอร์ม
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error(error);
        alert("หาข่าวไม่เจอ หรือคุณอาจไม่มีสิทธิ์แก้ไข");
        navigate('/');
      }
    };
    fetchArticle();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 3. ยิง PATCH เพื่อแก้ไข
      await api.patch(`/articles/${id}`, formData);
      alert("แก้ไขเรียบร้อย! ✨");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3>📝 แก้ไขบทความ</h3>

      <div className="card mb-4 shadow-sm">
        <img 
          src={`https://picsum.photos/seed/${id}/800/400`} 
          className="card-img-top" 
          alt="Article Cover"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-footer text-muted text-center small">
           🖼️ รูปภาพหน้าปกปัจจุบัน (อิงตาม ID ข่าว)
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">หัวข้อ</label>
          <input 
            type="text" className="form-control" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">คำโปรย</label>
          <input 
            type="text" className="form-control" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">เนื้อหา</label>
          <textarea 
            className="form-control" rows={6}
            value={formData.body}
            onChange={(e) => setFormData({...formData, body: e.target.value})}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-warning">บันทึกการแก้ไข</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>ยกเลิก</button>
      </form>
    </div>
  );
}