import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import avatar from "../assets/avt.png"; // Placeholder for avatar image

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  // Hình ảnh chim chân thực với hiệu ứng vỗ cánh
  const RealisticBird = ({ size, top, left, delay }) => {
    const wingVariants = {
      flap: {
        rotateY: [0, 60, 0],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }
      }
    };

    return (
      <motion.div
        className={`absolute ${top} ${left} z-0`}
        style={{ 
          width: `${size}px`,
          height: `${size}px`
        }}
        animate={{
          x: ["-100px", "calc(100vw + 100px)"],
          y: ["20px", "-30px", "10px"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 20,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      >
        <svg
          viewBox="0 0 512 512"
          className="w-full h-full drop-shadow-lg"
        >
          <path 
            d="M256 256c0-70.7-57.3-128-128-128S0 185.3 0 256s57.3 128 128 128s128-57.3 128-128z"
            fill="#4f46e5"
            className="dark:fill-[#00b4d8]"
          />
          <path
            d="M0 256c0-20 10-40 30-50s40-10 50 10s10 40-10 50s-40 10-50-10z"
            fill="#4338ca"
            className="dark:fill-[#0088a8]"
            transform="translate(-30,0)"
          />
          <motion.path
            d="M150 200c-20-20-40-30-70-20s-40 30-30 60s40 50 70 40s40-50 30-80z"
            fill="#6366f1"
            className="dark:fill-[#00d5ff]"
            variants={wingVariants}
            animate="flap"
            transform-origin="center"
          />
          <circle cx="200" cy="220" r="10" fill="white" />
          <circle cx="200" cy="220" r="5" fill="black" />
          <path 
            d="M220 230c10-5 20-5 30 0s10 15 0 20s-20 5-30 0s-10-15 0-20z"
            fill="#f59e0b"
          />
        </svg>
      </motion.div>
    );
  };

  // Đám mây chân thực
  const RealisticCloud = ({ size, top, left, delay }) => (
    <motion.div
      className={`absolute ${top} ${left} z-0`}
      style={{ 
        width: `${size}px`, 
        height: `${size * 0.6}px`
      }}
      animate={{
        x: ["-100px", "calc(100vw + 100px)"]
      }}
      transition={{
        duration: 40,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }}
    >
      <svg
        viewBox="0 0 512 512"
        className="w-full h-full"
      >
        <path
          d="M416 128c-25-30-65-40-100-30-10-50-60-80-110-70s-80 50-70 100c-50 0-90 40-90 90s40 90 90 90h300c40 0 80-30 80-80s-30-80-80-80z"
          fill="rgba(255,255,255,0.7)"
          className="dark:fill-gray-600/40"
          filter="url(#cloud-blur)"
        />
        <defs>
          <filter id="cloud-blur" x="0" y="0">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 px-6 md:px-12 bg-gradient-to-br from-sky-100 to-sky-200 dark:from-[#0d1117] dark:to-[#1a1f2e]"
    >
      {/* Background elements - Mây và chim PHÍA SAU */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <RealisticCloud size={200} top="top-10" left="left-10" delay={0} />
        <RealisticCloud size={250} top="top-20" left="right-10" delay={8} />
        <RealisticCloud size={180} top="top-[40%]" left="left-[30%]" delay={16} />
        <RealisticCloud size={150} top="top-[60%]" left="right-[20%]" delay={24} />

        <RealisticBird size={60} top="top-1/4" left="left-0" delay={0} />
        <RealisticBird size={45} top="top-1/3" left="right-0" delay={5} />
        <RealisticBird size={50} top="top-2/3" left="left-0" delay={10} />
      </div>

      {/* Nội dung chính và avatar PHÍA TRƯỚC */}
      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: 50 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10"
      >
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-sky-700 dark:text-[#00f5d4] mb-4 leading-tight">
            Xin chào, tôi là <br /> 
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-[#00f5d4] dark:to-[#00b4d8] bg-clip-text text-transparent">
              Phạm Hữu Thân Thương
            </span> 👋
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Sinh viên ngành Công nghệ Phần mềm tại Đại học Duy Tân. 
            Chuyên về phát triển ứng dụng web với:
          </p>
          
          <ul className="grid grid-cols-2 gap-2 mb-6 text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
              ReactJS/NextJS
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
              TailwindCSS
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
              UI/UX Design
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
              NodeJS
            </li>
          </ul>
          
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full shadow transition flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m18 0l-9-9-9 9m18 0H3" />
              </svg>
              Tải CV
            </button>
            <button className="border border-sky-600 text-sky-600 dark:border-[#00f5d4] dark:text-[#00f5d4] hover:bg-sky-50 dark:hover:bg-sky-900/30 px-6 py-2 rounded-full shadow transition">
              Liên hệ
            </button>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={controls}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          {/* Avatar placeholder - có thể thay bằng ảnh thực */}
          <div className="w-100 h-64 md:w-80 md:h-80 rounded-full shadow-xl bg-gradient-to-br from-sky-400 to-blue-500 dark:from-[#00f5d4] dark:to-[#00b4d8] border-4 border-sky-400 dark:border-[#00f5d4] animate-avatar-float flex items-center justify-center">
            <span className="text-6xl font-bold text-white">
              <img src={avatar} alt="Avatar" className="w-[400px] h-[460px] rounded-full object-cover" />
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md border border-sky-200 dark:border-gray-700 text-sm font-medium text-sky-700 dark:text-[#00f5d4]">
            Developer
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;