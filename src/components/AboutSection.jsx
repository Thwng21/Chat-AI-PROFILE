import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaCode, FaReact, FaNodeJs } from "react-icons/fa";
import { GiSpiderWeb, GiAbstract024, GiBrain } from "react-icons/gi";
import { RiUserHeartLine } from "react-icons/ri";
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiExpress } from "react-icons/si";
import { Enhanced3DCard, Floating3DElement } from "./Card3D";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
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
      <Floating3DElement 
        intensity={1}
        className="absolute top-0 right-0 -mr-48 -mt-8 text-[#2de2e6] dark:text-[#00f5d4] opacity-5"
      >
        <GiSpiderWeb className="w-96 h-96" />
      </Floating3DElement>
      
      <Floating3DElement 
        intensity={0.8}
        className="absolute bottom-0 left-0 -ml-48 -mb-8 text-[#2de2e6] dark:text-[#00f5d4] opacity-5"
      >
        <GiAbstract024 className="w-96 h-96" />
      </Floating3DElement>

      <div className="relative max-w-6xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-20"
        >
          <Floating3DElement intensity={0.5} className="inline-block mb-6">
            <GiBrain className="text-5xl text-[#2de2e6] dark:text-[#00f5d4]" />
          </Floating3DElement>
          
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

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <Enhanced3DCard
            title="Thông Tin Cá Nhân"
            icon={RiUserHeartLine}
            gradient="from-[#2de2e6] to-[#00f5d4]"
            rotationIntensity={12}
            className="h-80"
            onMouseEnter={() => setActiveCard('profile')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="space-y-3 mt-4">
              <div>
                <p className="text-xs text-white/70 mb-1">Họ và Tên</p>
                <p className="text-sm font-semibold text-white">Phạm Hữu Thân Thương</p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-1">Địa Chỉ</p>
                <p className="text-sm text-white/90">Hoà Giang, Điện Trung, Quảng Nam</p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-1">Sinh Nhật</p>
                <p className="text-sm text-white/90">21/05/2004</p>
              </div>
            </div>
          </Enhanced3DCard>

          <Enhanced3DCard
            title="Học Vấn"
            icon={FaGraduationCap}
            gradient="from-purple-500 to-indigo-600"
            rotationIntensity={10}
            className="h-80"
            onMouseEnter={() => setActiveCard('education')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-xs text-white/70 mb-1">Trường Đại Học</p>
                <p className="text-sm font-semibold text-white">Đại học Duy Tân (DTU)</p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-2">Tiến Độ Học Tập</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full rounded-full bg-white"
                  />
                </div>
                <p className="text-right text-xs text-white/90 mt-1">Năm 3/4 (75%)</p>
              </div>
            </div>
          </Enhanced3DCard>

          <Enhanced3DCard
            title="Công Nghệ"
            icon={FaCode}
            gradient="from-green-500 to-blue-500"
            rotationIntensity={14}
            className="h-80"
            onMouseEnter={() => setActiveCard('tech')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-xs text-white/70 mb-3">Kỹ Năng Chính</p>
                <div className="grid grid-cols-3 gap-2">
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex flex-col items-center p-2 bg-white/10 rounded-lg"
                  >
                    <FaReact className="text-lg text-white mb-1" />
                    <span className="text-xs text-white/80">React</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex flex-col items-center p-2 bg-white/10 rounded-lg"
                  >
                    <SiNextdotjs className="text-lg text-white mb-1" />
                    <span className="text-xs text-white/80">Next.js</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex flex-col items-center p-2 bg-white/10 rounded-lg"
                  >
                    <SiTailwindcss className="text-lg text-white mb-1" />
                    <span className="text-xs text-white/80">Tailwind</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex flex-col items-center p-2 bg-white/10 rounded-lg"
                  >
                    <SiMongodb className="text-lg text-white mb-1" />
                    <span className="text-xs text-white/80">MongoDB</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex flex-col items-center p-2 bg-white/10 rounded-lg"
                  >
                    <SiExpress className="text-lg text-white mb-1" />
                    <span className="text-xs text-white/80">Express</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex flex-col items-center p-2 bg-white/10 rounded-lg"
                  >
                    <FaNodeJs className="text-lg text-white mb-1" />
                    <span className="text-xs text-white/80">Node.js</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </Enhanced3DCard>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;