export default function HeroSlider() {
  const heroSlides = [
    { 
      id: 1, 
      title: "ยินดีต้อนรับสู่เว็บไซต์ News Portal", 
      image: "https://picsum.photos/id/6/1200/500", 
      category: "Announcement" 
    },
    { 
      id: 2, 
      title: "ประกาศปิดปรับปรุงระบบ วันเสาร์นี้", 
      image: "https://picsum.photos/id/20/1200/500", 
      category: "Maintenance" 
    },
    { 
      id: 3, 
      title: "ร่วมกิจกรรมลุ้นรางวัลพิเศษประจำเดือน", 
      image: "https://picsum.photos/id/26/1200/500", 
      category: "Activity" 
    },
  ];

  return (
    <div id="newsCarousel" className="carousel slide mb-5 shadow rounded overflow-hidden" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {heroSlides.map((_, index) => (
          <button 
            key={index} 
            type="button" 
            data-bs-target="#newsCarousel" 
            data-bs-slide-to={index} 
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="4000">
            <img 
              src={slide.image} 
              className="d-block w-100" 
              alt={slide.title} 
              style={{ height: '350px', objectFit: 'cover', filter: 'brightness(0.65)' }} 
            />
            <div className="carousel-caption d-none d-md-block text-start">
              <span className="badge bg-danger mb-2">{slide.category}</span>
              <h2 className="fw-bold">{slide.title}</h2>
              <p className="lead">เกาะติดทุกสถานการณ์ อัปเดตข่าวด่วนก่อนใครได้ที่นี่</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}