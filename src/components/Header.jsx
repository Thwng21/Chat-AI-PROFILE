import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaHome,
  FaComments,
  FaInfoCircle,
} from "react-icons/fa";
import { RiAccountPinBoxFill } from "react-icons/ri";

const Header = ({ darkMode, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("vi-VN", { hour12: false });

  return (
    <header className="bg-white dark:bg-[#161b22] shadow fixed z-[1000] top-0 left-0 w-full px-4 py-3 flex justify-between items-center transition-colors duration-300 font-sans">
      <h1 className="flex items-center gap-2 text-xl font-bold text-blue-600 cursor-pointer dark:text-green-400">
        <Link
          to="/"
          className="flex items-center gap-1 transition hover:text-blue-500 dark:hover:text-green-300"
        >
          <RiAccountPinBoxFill className="text-2xl" /> Gwouth Profile
        </Link>
      </h1>

      <nav className="items-center hidden space-x-6 text-sm font-medium text-gray-700 md:flex dark:text-gray-200">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300">
          <FaHome /> Trang chủ
        </Link>
        <Link to="/chat" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300">
          <FaComments /> Chat
        </Link>
        <Link to="/about" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300">
          <FaInfoCircle /> Thông tin
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-gray-700 sm:text-sm dark:text-gray-300">
          🕒 {formatTime(time)}
        </span>

        <button onClick={toggleTheme} className="text-xl transition-transform hover:scale-110">
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800 dark:text-white" />
          )}
        </button>

        <button onClick={toggleMenu} className="text-xl text-gray-700 dark:text-gray-200 md:hidden">
          <FaBars />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white dark:bg-[#161b22] shadow-lg rounded-lg p-4 space-y-3 md:hidden text-gray-700 dark:text-gray-200 text-sm font-medium w-44">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-green-300" onClick={() => setMenuOpen(false)}>
            <FaHome /> Trang chủ
          </Link>
          <Link to="/chat" className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-green-300" onClick={() => setMenuOpen(false)}>
            <FaComments /> Chat
          </Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-green-300" onClick={() => setMenuOpen(false)}>
            <FaInfoCircle /> Thông tin
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
