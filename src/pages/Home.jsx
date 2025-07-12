// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative bg-gradient-to-b mt-16 from-green-100 to-white min-h-screen p-6 text-center">
      {/* Nội dung giới thiệu */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-green-700"
      >
        Chào mừng đến với Portfolio của Phạm Hữu Thân Thương
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-gray-700 max-w-xl mx-auto mb-10"
      >
        Tôi là sinh viên năm 3 trường Đại học Duy Tân (DTU), chuyên ngành Công nghệ phần mềm. Tôi đam mê phát triển web với ReactJS và luôn mong muốn xây dựng các ứng dụng mang lại giá trị thực tiễn cho cộng đồng.
      </motion.p>

      {/* Phần nội dung chi tiết có thể thêm ở đây */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Về tôi</h2>
        <ul className="text-left space-y-2 text-gray-700">
          <li>👤 Tên: Phạm Hữu Thân Thương</li>
          <li>🎓 Sinh viên năm 3 - Đại học Duy Tân (DTU)</li>
          <li>💻 Lập trình viên - ReactJS, TailwindCSS</li>
          <li>📍 Quê quán: Xã Điện Trung, Thị xã Điện Bàn, Tỉnh Quảng Nam</li>
        </ul>
      </motion.div>

      {/* Nút chuyển sang Chat */}
      <Link
        to="/chat"
        className="fixed bottom-4 right-4 z-50 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
      >
        <FaRobot className="text-green-400 text-xl" />
      </Link>
    </div>
  );
};

export default Home;
