import { Routes, Route } from 'react-router-dom';
import Navbar from "./layouts/Navbar";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; 
import CreateArticlePage from './pages/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import ArticlePage from './pages/ArticlePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <Routes>
        {/* 👇 เปลี่ยนตรงนี้ */}
        <Route path="/" element={<HomePage/>} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-post" element={<CreateArticlePage />} />
        <Route path="/edit-post/:id" element={<EditArticlePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </div>
  )
}

export default App;