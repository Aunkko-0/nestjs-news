import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

// Import Components
import HeroSlider from '../components/HeroSlider';
import NewsList, { type Article } from '../components/NewsList';
import Footer from '../layouts/Footer';
import CategoryMenu from '../components/CategoryMenu';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles');
      setArticles(res.data);

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("แน่ใจนะว่าจะลบข่าวนี้? 🗑️")) return;
    try {
      await api.delete(`/articles/${id}`);
      alert("ลบข่าวเรียบร้อย! 🗑️");
      fetchArticles(); 
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("ลบข่าวไม่สำเร็จ!");
    }
  };

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  if (loading) return <div className="text-center mt-5">⏳ กำลังโหลด...</div>;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      
      <div className="container mt-4 flex-grow-1">
        
        {/* ส่วนหัว Slider */}
        <div className="mb-4">
          <HeroSlider />
        </div>

        {/* --- ส่วนแถบควบคุม (ปุ่มเมนู + หัวข้อ + ปุ่มเขียนข่าว) --- */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
          
          <div className="d-flex align-items-center">
            {/* ✅ ปุ่มกดเพื่อเปิด Slide Menu */}
            <button 
              className="btn btn-outline-primary me-3 shadow-sm" 
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#categoryOffcanvas"
            >
              ☰ เลือกหมวดหมู่
            </button>

            <div>
              <h2 className="h4 mb-0 fw-bold d-inline-block align-middle">
                {selectedCategory === 'All' ? '📰 ข่าวล่าสุด' : `หมวดหมู่: ${selectedCategory}`}
              </h2>
              <span className="text-muted small ms-2 d-none d-md-inline">
                (พบ {filteredArticles.length} รายการ)
              </span>
            </div>
          </div>

          {localStorage.getItem('token') && (
            <Link to="/create-post" className="btn btn-dark btn-sm shadow-sm mt-2 mt-md-0">
              ✍️ เขียนข่าว
            </Link>
          )}
        </div>

        {/* --- ✅ ส่วนกล่อง Slide Menu (Offcanvas) --- */}
        {/* ส่วนนี้คือส่วนที่ขาดไปครับ มันคือกล่องที่จะเลื่อนออกมา */}
        <div className="offcanvas offcanvas-start" tabIndex={-1} id="categoryOffcanvas" aria-labelledby="categoryOffcanvasLabel">
          <div className="offcanvas-header bg-dark text-white">
            <h5 className="offcanvas-title fw-bold" id="categoryOffcanvasLabel">📂 หมวดหมู่ข่าวสาร</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <p className="text-muted small mb-3">เลือกหมวดหมู่ที่ต้องการอ่าน:</p>
            {/* เรียกใช้ Component เมนู */}
            <CategoryMenu 
              activeCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
        </div>

        {/* --- รายการข่าว (แสดงเต็มจอ ไม่ต้องมี col-lg-9 แล้ว) --- */}
        <NewsList articles={filteredArticles} onDelete={handleDelete} />

      </div>

      <Footer />
      
      
    </div>
  );
}