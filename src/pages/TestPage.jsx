const TestPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        🧪 Test Page - React is Working!
      </h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#666', marginBottom: '10px' }}>Debug Information:</h2>
        <ul style={{ color: '#555', lineHeight: '1.6' }}>
          <li>✅ React is rendering components</li>
          <li>✅ JavaScript is executing</li>
          <li>✅ Inline styles are working</li>
          <li>✅ Components are mounted</li>
        </ul>
      </div>
      
      <div style={{
        backgroundColor: '#e8f4f8',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #b3d9e6'
      }}>
        <p style={{ color: '#0066cc', margin: 0 }}>
          📱 Nếu bạn thấy trang này, có nghĩa là React hoạt động bình thường. 
          Vấn đề có thể là ở CSS hoặc một component cụ thể.
        </p>
      </div>
      
      <button 
        onClick={() => alert('Button clicked! JavaScript works!')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Button Click
      </button>
    </div>
  );
};

export default TestPage;