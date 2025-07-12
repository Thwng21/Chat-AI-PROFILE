// src/components/Header.jsx
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-[#161b22] shadow fixed z-[1000] top-0 left-0 w-full px-4 py-3 flex justify-between items-center transition-colors duration-300">
      <h1 className="text-xl font-bold text-blue-600 dark:text-green-400">🤖 GoPark AI</h1>
      <nav className="space-x-4 text-gray-700 dark:text-gray-200">
        <Link to="/" className="hover:text-blue-500 dark:hover:text-green-300">Trang chủ</Link>
        <Link to="/chat" className="hover:text-blue-500 dark:hover:text-green-300">Chat</Link>
        <Link to="/about" className="hover:text-blue-500 dark:hover:text-green-300">Thông tin</Link>
      </nav>
      <button onClick={toggleTheme} className="ml-4 text-xl">
        {darkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-gray-800" />
        )}
      </button>
    </header>
  );
};

export default Header;
