export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase fw-bold text-warning mb-3">News Portal 🇹🇭</h5>
            <p className="small text-white-50">
              เว็บไซต์ข่าวออนไลน์อันดับ 1 ที่นำเสนอข่าวสาร รวดเร็ว ฉับไว 
              ทันทุกเหตุการณ์ ตลอด 24 ชั่วโมง
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase fw-bold text-warning mb-3">หมวดหมู่ข่าว</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">🗳️ การเมือง</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">💰 เศรษฐกิจ</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">📱 เทคโนโลยี</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">⚽ กีฬา</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase fw-bold text-warning mb-3">ติดต่อเรา</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">🏢 123 อาคารนิวส์ทาวเวอร์ กทม.</li>
              <li className="mb-2">📞 โทร: 02-123-4567</li>
              <li className="mb-2">📧 อีเมล: contact@newsportal.com</li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center text-white-50 small">
          &copy; 2024 News Portal. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  );
}