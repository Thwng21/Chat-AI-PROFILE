// src/components/Header.jsx
import { useState } from "react";
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
<RiAccountPinBoxFill className="text-2xl" />

const Header = ({ darkMode, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white dark:bg-[#161b22] shadow fixed z-[1000] top-0 left-0 w-full px-4 py-3 flex justify-between items-center transition-colors duration-300 font-sans">
      <h1 className="text-xl cursor-pointer font-bold text-blue-600 dark:text-green-400 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300 transition">
          <RiAccountPinBoxFill className="text-2xl" />Gwouth Profile
        </Link>
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 items-center text-sm font-medium">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300 transition">
          <FaHome /> Trang chủ
        </Link>
        <Link to="/chat" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300 transition">
          <FaComments /> Chat
        </Link>
        <Link to="/about" className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-green-300 transition">
          <FaInfoCircle /> Thông tin
        </Link>
      </nav>

      {/* Theme Toggle + Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="text-xl hover:scale-110 transition-transform duration-200"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800 dark:text-white" />
          )}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="text-xl text-gray-700 dark:text-gray-200 md:hidden"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white dark:bg-[#161b22] shadow-lg rounded-lg p-4 space-y-3 md:hidden text-gray-700 dark:text-gray-200 text-sm font-medium w-44">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-green-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaHome /> Trang chủ
          </Link>
          <Link
            to="/chat"
            className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-green-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaComments /> Chat
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-green-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaInfoCircle /> Thông tin
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
