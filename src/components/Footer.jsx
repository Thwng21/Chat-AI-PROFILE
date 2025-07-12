// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaGithub, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0d1117] text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 px-6 py-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Liên hệ</h3>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaPhoneAlt /> <span>0903 129 370 (Zalo)</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope /> <span>thuong215204@gmail.com</span>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Người phát triển</h3>
          <p className="text-sm">Phạm Hữu Thân Thương</p>
          <p className="text-sm mt-1">Front-End Developer</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Liên kết</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="https://github.com/Thwng21" target="_blank" rel="noreferrer" className="hover:text-[#2de2e6]">GitHub</a>
            </li>
            <li>
              <a href="https://www.facebook.com/pham.huu.than.thuong" target="_blank" rel="noreferrer" className="hover:text-[#2de2e6]">Facebook</a>
            </li>
            <li>
              <a href="https://instagram.com/thuong215204" target="_blank" rel="noreferrer" className="hover:text-[#2de2e6]">Instagram</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kết nối mạng xã hội</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://www.facebook.com/pham.huu.than.thuong" target="_blank" rel="noreferrer" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="https://instagram.com/thuong215204" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://github.com/Thwng21" target="_blank" rel="noreferrer" className="hover:text-gray-800 dark:hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Phạm Hữu Thân Thương. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;