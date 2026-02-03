// src/pages/ArticlePage.tsx

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api'; 

interface Article {
  id: number;
  title: string;
  body: string;
  category: string;
  description: string | null;
  createdAt: string;
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center mt-5">⏳ กำลังโหลดเนื้อหา...</div>;
  if (!article) return <div className="text-center mt-5">❌ ไม่พบข่าวนี้</div>;

  return (
    // ✅ ลบ <Navbar /> ออกแล้ว เพื่อไม่ให้ซ้อนกับของ App.tsx
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          {/* ปุ่มย้อนกลับ */}
          <Link to="/" className="btn btn-outline-secondary mb-3">
            &larr; กลับหน้าหลัก
          </Link>

          {/* หมวดหมู่ */}
          <div>
             <span className="badge bg-primary mb-2">{article.category}</span>
          </div>

          {/* หัวข้อข่าว */}
          <h1 className="fw-bold mb-3">{article.title}</h1>
          
          {/* วันที่ */}
          <p className="text-muted small border-bottom pb-3">
            ลงเมื่อ: {new Date(article.createdAt).toLocaleString('th-TH')}
          </p>

          {/* รูปภาพ (เปลี่ยนให้ใช้ picsum เหมือนหน้าแรก จะได้สวยเหมือนกัน) */}
          <img 
            src={`https://picsum.photos/seed/${article.id}/800/400`} 
            className="img-fluid rounded mb-4 w-100 shadow-sm"
            alt={article.title}
            style={{ objectFit: 'cover', maxHeight: '400px' }}
          />

          {/* เนื้อหาข่าว (Body) */}
          <div className="article-content fs-5 lh-lg text-break">
            <p style={{ whiteSpace: 'pre-wrap' }}>{article.body}</p>
          </div>

        </div>
      </div>
    </div>
  );
}