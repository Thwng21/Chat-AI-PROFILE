import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Simple test component
const SimpleHome = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#333', 
        fontSize: '48px', 
        textAlign: 'center',
        marginBottom: '20px' 
      }}>
        🎉 Website Đã Hoạt động!
      </h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#666', marginBottom: '20px', fontSize: '24px' }}>
          ✅ Gwouth InFo - Chat AI Profile
        </h2>
        
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #4CAF50'
        }}>
          <p style={{ color: '#2e7d32', fontSize: '18px', margin: 0 }}>
            🚀 React đang chạy bình thường!<br/>
            📱 Website đã sẵn sàng để phát triển!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '30px'
        }}>
          <a href="/basic" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            🏠 Trang Chủ Cơ Bản
          </a>
          
          <a href="/chat" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            💬 Chat AI
          </a>
          
          <a href="/home" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#ffc107',
            color: 'black',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            ✨ Full Features
          </a>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#856404', fontSize: '16px', margin: 0 }}>
          💡 <strong>Lưu ý:</strong> Nếu thấy trang này, có nghĩa là website hoạt động bình thường. 
          Tailwind CSS đã được thay bằng CSS thuần để tránh lỗi compile.
        </p>
      </div>
    </div>
  );
};

function AppSimple() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleHome />} />
      </Routes>
    </Router>
  );
}

export default AppSimple;