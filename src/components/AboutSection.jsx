import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { 
  FaUser, 
  FaGraduationCap, 
  FaCode, 
  FaBullseye, 
  FaHeart, 
  FaMapMarkerAlt,
  FaReact,
  FaNodeJs
} from "react-icons/fa";
import { GiSpiderWeb, GiAbstract024, GiBrain } from "react-icons/gi";
import { RiLightbulbFlashLine, RiUserHeartLine } from "react-icons/ri";
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiExpress } from "react-icons/si";

const AboutSection = () => {
  const controls = useAnimation();
  const [activeCard, setActiveCard] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 15px 30px -10px rgba(45, 226, 230, 0.3)",
      transition: {
        duration: 0.4
      }
    }
  };

  const cardTapVariants = {
    tap: {
      scale: 0.98
    }
  };

  const highlightVariants = {
    initial: { width: 0 },
    hover: { 
      width: "100%",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0d12] dark:to-[#161b22]"
    >
      {/* Các phần tử nền động */}
      <motion.div 
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 0.05, rotate: 0 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="absolute top-0 right-0 -mr-48 -mt-8 text-[#2de2e6] dark:text-[#00f5d4]"
      >
        <GiSpiderWeb className="w-96 h-96" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, rotate: 15 }}
        animate={{ opacity: 0.05, rotate: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-0 left-0 -ml-48 -mb-8 text-[#2de2e6] dark:text-[#00f5d4]"
      >
        <GiAbstract024 className="w-96 h-96" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Phần tiêu đề động */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block mb-6"
          >
            <GiBrain className="text-5xl text-[#2de2e6] dark:text-[#00f5d4]" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] dark:from-[#00f5d4] dark:to-[#2de2e6] mb-4"
          >
            Vũ Trụ Sáng Tạo Của Tôi
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Nơi <span className="font-medium text-[#2de2e6] dark:text-[#00f5d4]">code</span> gặp gỡ <span className="font-medium text-[#2de2e6] dark:text-[#00f5d4]">sáng tạo</span>
          </motion.p>
        </motion.div>

        {/* Lưới card tương tác */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Thông Tin Cá Nhân */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            variants={cardHoverVariants}
            onHoverStart={() => setActiveCard('profile')}
            onHoverEnd={() => setActiveCard(null)}
            className={`relative bg-white dark:bg-[#0d1117] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 ${activeCard === 'profile' ? 'z-10' : ''}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === 'profile' ? 0.1 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#2de2e6] to-[#00f5d4]"
              />
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-white shadow-lg">
                  <RiUserHeartLine className="text-2xl" />
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">Thông Tin Cá Nhân</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <motion.div 
                    className="relative inline-block"
                    whileHover="hover"
                  >
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Họ và Tên</h4>
                    <motion.span 
                      variants={highlightVariants}
                      className="absolute bottom-0 left-0 h-0.5 bg-[#2de2e6]"
                    />
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200 ">Phạm Hữu Thân Thương</p>
                  </motion.div>
                </div>
                
                <div>
                  <motion.div 
                    className="relative inline-block"
                    whileHover="hover"
                  >
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Địa Chỉ</h4>
                    <motion.span 
                      variants={highlightVariants}
                      className="absolute bottom-0 left-0 h-0.5 bg-[#2de2e6]"
                    />
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Hoà Giang, Điện Trung, Quảng Nam</p>
                  </motion.div>
                   <motion.div 
                    className="relative inline-block"
                    whileHover="hover"
                  >
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">.........................</h4>
                    <motion.span 
                      variants={highlightVariants}
                      className="absolute bottom-0 left-0 h-0.5 bg-[#2de2e6]"
                    />
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">21/05/2004</p>
                  </motion.div>
                  
                  
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: activeCard === 'profile' ? 1 : 0, y: activeCard === 'profile' ? 0 : 10 }}
                className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "Tôi yêu thích sự sáng tạo và luôn tìm kiếm cái đẹp trong từng dòng code"
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Card Học Vấn */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            variants={cardHoverVariants}
            onHoverStart={() => setActiveCard('education')}
            onHoverEnd={() => setActiveCard(null)}
            className={`relative bg-white dark:bg-[#0d1117] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 ${activeCard === 'education' ? 'z-10' : ''}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === 'education' ? 0.1 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#2de2e6] to-[#00f5d4]"
              />
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-white shadow-lg">
                  <FaGraduationCap className="text-2xl" />
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">Học Vấn</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trường Đại Học</h4>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Đại học Duy Tân (DTU)</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tiến Độ</h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-[#2de2e6] to-[#00f5d4]"
                    />
                  </div>
                  <p className="text-right text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Năm 3/4 (75%)</p>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: activeCard === 'education' ? 1 : 0, y: activeCard === 'education' ? 0 : 10 }}
                className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "Học tập không ngừng để theo đuổi đam mê công nghệ"
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Card Công Nghệ - Đã thêm Next.js, MongoDB, Express.js */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            variants={cardHoverVariants}
            onHoverStart={() => setActiveCard('tech')}
            onHoverEnd={() => setActiveCard(null)}
            className={`relative bg-white dark:bg-[#0d1117] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 ${activeCard === 'tech' ? 'z-10' : ''}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === 'tech' ? 0.1 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#2de2e6] to-[#00f5d4]"
              />
            </div>
            
            <div className="relative p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-white shadow-lg">
                  <FaCode className="text-2xl" />
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">Công Nghệ Sử Dụng</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Kỹ Năng Chính</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <FaReact className="text-3xl text-[#61DAFB]" />
                      <span className="text-xs mt-1">React</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <SiNextdotjs className="text-3xl text-black dark:text-white" />
                      <span className="text-xs mt-1">Next.js</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <SiTailwindcss className="text-3xl text-[#38B2AC]" />
                      <span className="text-xs mt-1">Tailwind</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <SiMongodb className="text-3xl text-[#47A248]" />
                      <span className="text-xs mt-1">MongoDB</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <SiExpress className="text-3xl text-gray-800 dark:text-gray-200" />
                      <span className="text-xs mt-1">Express</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <FaNodeJs className="text-3xl text-[#68A063]" />
                      <span className="text-xs mt-1">Node.js</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <RiLightbulbFlashLine className="text-3xl text-[#FFD700]" />
                      <span className="text-xs mt-1">UI/UX</span>
                    </motion.div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trình Độ</h4>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Trung Cấp</p>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: activeCard === 'tech' ? 1 : 0, y: activeCard === 'tech' ? 0 : 10 }}
                className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "Tập trung vào xây dựng giao diện đẹp và trải nghiệm người dùng mượt mà"
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* [Có thể thêm các card khác tương tự...] */}

        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;