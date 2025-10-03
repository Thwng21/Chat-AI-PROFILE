import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";

const HomeSimple = ({ darkMode, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white transition-colors duration-300 font-sans">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-lg mb-4">Đây là trang test để kiểm tra xem website có hiển thị không</p>
        <button 
          onClick={toggleTheme}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Toggle Theme (Current: {darkMode ? 'Dark' : 'Light'})
        </button>
        <div className="mt-4">
          <Link 
            to="/chat" 
            className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <FaCommentDots />
            Go to Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeSimple;