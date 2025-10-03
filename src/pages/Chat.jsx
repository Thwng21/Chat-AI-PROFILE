import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SmartChatbot from "../components/SmartChatbot";
import ParticleSystem from "../components/ParticleSystem";
import SoundSystem from "../components/SoundSystem";
import EasterEggSystem from "../components/EasterEggSystem";
import MobileTouchSystem from "../components/MobileTouchSystem";
import MobileEasterEggs from "../components/MobileEasterEggs";
import { FaArrowLeft, FaRobot, FaComments, FaBrain, FaHeart } from "react-icons/fa";

const Chat = ({ darkMode, toggleTheme }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <MobileTouchSystem>
      <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
        <ParticleSystem theme={darkMode ? 'dark' : 'light'} />
        <SoundSystem darkMode={darkMode} />
        <EasterEggSystem />
        <MobileEasterEggs />
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div className="pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] rounded-full shadow-2xl shadow-cyan-500/30">
              <FaBrain className="text-4xl text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] mb-6"
          >
            Trò Chuyện Với AI
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Khám phá thế giới của <span className="font-bold text-[#2de2e6]">Thân Thương</span> thông qua cuộc trò chuyện với AI assistant thông minh!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700">
              <FaRobot className="text-3xl text-[#2de2e6] mb-4 mx-auto" />
              <h3 className="font-bold text-lg mb-2">4 Tính Cách AI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Thân thiện, Sáng tạo, Kỹ thuật, Sinh viên
              </p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700">
              <FaComments className="text-3xl text-[#00f5d4] mb-4 mx-auto" />
              <h3 className="font-bold text-lg mb-2">Voice Input</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nói chuyện bằng giọng nói và nghe AI trả lời
              </p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700">
              <FaHeart className="text-3xl text-[#ff6b6b] mb-4 mx-auto" />
              <h3 className="font-bold text-lg mb-2">Cá Nhân Hóa</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI hiểu sâu về Thân Thương và trả lời chính xác
              </p>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChat(true)}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-black font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <FaRobot className="text-xl" />
            <span className="text-lg">Bắt Đầu Trò Chuyện</span>
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="fixed top-20 left-4 z-40"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Về Trang Chủ</span>
          </Link>
        </motion.div>
      </div>
      
      {showChat && <SmartChatbot onClose={() => setShowChat(false)} />}
    </div>
    </MobileTouchSystem>
  );
};

export default Chat;