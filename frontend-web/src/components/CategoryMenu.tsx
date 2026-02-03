interface CategoryMenuProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryMenu({ activeCategory, onSelectCategory }: CategoryMenuProps) {
  
  // ข้อมูลหมวดหมู่ (พร้อมไอคอน)
  const categories = [
    { id: 'All', name: 'ทั้งหมด', icon: '📰' },
    { id: 'Politics', name: 'การเมือง', icon: '🗳️' },
    { id: 'Economy', name: 'เศรษฐกิจ', icon: '💰' },
    { id: 'Technology', name: 'เทคโนโลยี', icon: '📱' },
    { id: 'Sports', name: 'กีฬา', icon: '⚽' },
    { id: 'Entertainment', name: 'บันเทิง', icon: '🎭' },
    { id: 'General', name: 'ข่าวทั่วไป', icon: '📢' },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom-0 pt-3">
        <h5 className="fw-bold mb-0">📂 หมวดหมู่ข่าว</h5>
      </div>
      <div className="card-body p-2">
        <div className="list-group list-group-flush">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-bs-dismiss="offcanvas"
              
              className={`list-group-item list-group-item-action d-flex align-items-center border-0 rounded mb-1 px-3 ${
                activeCategory === cat.id 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-secondary bg-transparent'
              }`}
              onClick={() => onSelectCategory(cat.id)}
              style={{ transition: 'all 0.2s' }}
            >
              <span className="me-3 fs-5">{cat.icon}</span>
              <span className="fw-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}