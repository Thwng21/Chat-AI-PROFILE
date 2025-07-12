import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/Header";

const Home = ({ darkMode, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white transition-colors duration-300 font-sans">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <div className="relative mt-24 px-6 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[#2de2e6] dark:text-[#00f5d4] text-center"
        >
          👋 Chào mừng đến với Portfolio của Phạm Hữu Thân Thương
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center mb-10"
        >
          Tôi là sinh viên năm 3 trường Đại học Duy Tân (DTU), chuyên ngành Công nghệ phần mềm. Tôi đam mê phát triển web với ReactJS và luôn mong muốn xây dựng các ứng dụng mang lại giá trị thực tiễn cho cộng đồng.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className=" dark:bg-[#161b22] shadow-lg rounded-xl p-6 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-[#2de2e6] dark:text-[#00f5d4] mb-4 text-left">
            🧑‍💻 Về tôi
          </h2>
          <ul className="text-left space-y-2 text-gray-800 dark:text-gray-300">
            <li>👤 Tên: <strong>Phạm Hữu Thân Thương</strong></li>
            <li>🎓 Sinh viên năm 3 - Đại học Duy Tân (DTU)</li>
            <li>💻 Lập trình viên: ReactJS, TailwindCSS</li>
            <li>🎨 Đam mê UI/UX, yêu thích sáng tạo & công nghệ</li>
            <li>📍 Quê quán: Điện Trung, Quảng Nam</li>
          </ul>
        </motion.div>

        <Link
          to="/chat"
          className="fixed bottom-5 right-5 z-50 bg-[#2de2e6] hover:bg-[#00f5d4] p-4 rounded-full shadow-lg transition duration-300"
        >
          <FaCommentDots className="text-black text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Home;