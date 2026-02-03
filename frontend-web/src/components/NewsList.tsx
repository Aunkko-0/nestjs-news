import { Link } from 'react-router-dom';

// Export interface เพื่อให้ HomePage เอาไปใช้ได้ด้วย
export interface Article {
  id: number;
  title: string;
  description?: string;
  body: string;
  createdAt: string;
  category?: string;
}

interface NewsListProps {
  articles: Article[];
  onDelete: (id: number) => void;
}

export default function NewsList({ articles, onDelete }: NewsListProps) {
  if (articles.length === 0) {
    return <p className="text-center text-muted mt-5">ยังไม่มีข่าวในหมวดหมู่นี้...</p>;
  }

  return (
    <div className="row">
      {articles.map((article) => (
        <div key={article.id} className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow">

            {/* Badge หมวดหมู่ */}
            {article.category && (
              <span className="position-absolute top-0 end-0 badge bg-primary m-2 shadow-sm">
                {article.category}
              </span>
            )}

            {/* รูปภาพ */}
            <img 
              src={`https://picsum.photos/seed/${article.id}/400/250`} 
              className="card-img-top" 
              alt="thumbnail"
              style={{ height: '200px', objectFit: 'cover' }} 
            />

            <div className="card-body d-flex flex-column">
              {/* หัวข้อข่าว */}
              <h5 className="card-title text-primary fw-bold text-truncate">{article.title}</h5>
              
              {/* คำโปรย (ถ้ามี) */}
              {article.description && (
                <h6 className="card-subtitle mb-2 text-muted small text-truncate">{article.description}</h6>
              )}
              
              {/* เนื้อหาข่าวแบบย่อ */}
              <p className="card-text text-secondary small flex-grow-1">
                {article.body.length > 100 ? article.body.substring(0, 100) + '...' : article.body}
              </p>

              {/* ส่วนล่างของการ์ด */}
              <div className="mt-auto">
                
                {/* ✅ 1. ปุ่มอ่านต่อ (ทุกคนเห็นได้) */}
                <Link to={`/article/${article.id}`} className="btn btn-outline-dark w-100 mb-3">
                    อ่านต่อ &rarr;
                </Link>

                {/* แถวแสดงวันที่ และ ปุ่มแอดมิน */}
                <div className="d-flex justify-content-between align-items-center border-top pt-2">
                    <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                        🕒 {new Date(article.createdAt).toLocaleDateString('th-TH')}
                    </small>

                    {/* ✅ 2. ปุ่มแก้ไข/ลบ (เห็นเฉพาะตอน Login) */}
                    {localStorage.getItem('token') && (
                        <div>
                            <Link to={`/edit-post/${article.id}`} className="btn btn-sm btn-outline-warning me-1">✏️</Link>
                            <button onClick={() => onDelete(article.id)} className="btn btn-sm btn-outline-danger">🗑️</button>
                        </div>
                    )}
                </div>

              </div>
            </div> 
          </div>
        </div>
      ))}
    </div>
  );
}