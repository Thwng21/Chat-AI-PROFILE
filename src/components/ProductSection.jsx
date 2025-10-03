import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { 
  FaGlobe, 
  FaCode, 
  FaMobileAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaExternalLinkAlt,
  FaServer,
  FaCalendarCheck,
  FaTasks
} from "react-icons/fa";
import { SiTailwindcss, SiReact, SiNextdotjs, SiNodedotjs } from "react-icons/si";

// Import hình ảnh (thay bằng đường dẫn thực tế của bạn)
import portfolioImg from '../assets/bg1.jpg';
import chatAIImg from '../assets/bg1.jpg';
import mobileUIImg from '../assets/bg1.jpg';

import prd1 from "../assets/pra1.png";
import prd2 from "../assets/pra2.png";
import prd3 from "../assets/pra3.png";
import prd4 from "../assets/pra4.png";
import prd5 from "../assets/pra5.png";

const products = [
  {
    id: 1,
    icon: <FaGlobe className="text-2xl" />,
    title: "Trang Web Giới Thiệu",
    description: "Website giới thiệu bản thân & dự án, được xây dựng với ReactJS và TailwindCSS, tích hợp dark mode và hiệu ứng mượt mà.",
    shortDescription: "Portfolio cá nhân với thiết kế hiện đại",
    link: "#",
    github: "#",
    images: [prd1, prd2, prd3, prd4, prd5],
    color: "from-blue-500 to-cyan-400",
    techStack: [
      { icon: <SiReact className="text-xl" />, name: "ReactJS" },
      { icon: <SiTailwindcss className="text-xl" />, name: "TailwindCSS" },
      { icon: <SiNextdotjs className="text-xl" />, name: "Next.js" },
      { icon: <FaServer className="text-xl" />, name: "Vercel" }
    ],
    features: [
      "Dark/Light mode",
      "Responsive design",
      "Hiệu ứng Framer Motion",
      "Tối ưu SEO"
    ],
    year: "2025",
    timeline: [
      {
        phase: "Giai đoạn Thiết kế",
        date: "12/7/2025",
        tasks: [
          "Phác thảo wireframe",
          "Thiết kế UI/UX trên Figma",
          "Lựa chọn màu sắc và typography"
        ]
      },
      {
        phase: "Giai đoạn Phát triển",
        date: "12/7/2025 - 13/7/2025",
        tasks: [
          "Xây dựng base Next.js",
          "Triển khai dark mode",
          "Tích hợp Framer Motion"
        ]
      },
      {
        phase: "Giai đoạn Hoàn thiện",
        date: "14/7/2025",
        tasks: [
          "Tối ưu hiệu suất",
          "Test cross-browser",
          "Deploy lên Vercel"
        ]
      }
    ]
  },
  {
    id: 2,
    icon: <FaCode className="text-2xl" />,
    title: "Ứng dụng Chat AI",
    description: "Trợ lý AI thông minh có thể phản hồi theo dữ liệu cá nhân, tích hợp Claude API thông qua OpenRouter với giao diện chat tương tự ChatGPT.",
    shortDescription: "AI Assistant với Claude API",
    link: "#",
    github: "#",
    images: [chatAIImg, portfolioImg, mobileUIImg],
    color: "from-purple-500 to-pink-500",
    techStack: [
      { icon: <SiReact className="text-xl" />, name: "ReactJS" },
      { icon: <SiNodedotjs className="text-xl" />, name: "Node.js" },
      { icon: <FaServer className="text-xl" />, name: "Express" },
      { icon: <FaGlobe className="text-xl" />, name: "OpenRouter" }
    ],
    features: [
      "Chat streaming",
      "Lưu lịch sử trò chuyện",
      "Tùy chỉnh personality",
      "Markdown support"
    ],
    year: "2024",
    timeline: [
      {
        phase: "Giai đoạn Nghiên cứu",
        date: "11/2023 - 12/2023",
        tasks: [
          "Khảo sát các API AI có sẵn",
          "Đăng ký tài khoản OpenRouter",
          "Thử nghiệm với Claude API"
        ]
      },
      {
        phase: "Giai đoạn MVP",
        date: "01/2024 - 02/2024",
        tasks: [
          "Xây dựng giao diện chat cơ bản",
          "Kết nối API backend",
          "Triển khai chat streaming"
        ]
      },
      {
        phase: "Giai đoạn Mở rộng",
        date: "03/2024 - Hiện tại",
        tasks: [
          "Thêm tính năng lưu lịch sử",
          "Tích hợp Markdown",
          "Tối ưu tốc độ phản hồi"
        ]
      }
    ]
  },
  {
    id: 3,
    icon: <FaMobileAlt className="text-2xl" />,
    title: "Giao diện Mobile App",
    description: "Thiết kế UI mobile đầu tiên tập trung vào trải nghiệm người dười với phong cách tối giản, animation mượt mà và micro-interactions.",
    shortDescription: "Mobile UI Design đầu tay",
    link: "#",
    github: "#",
    images: [mobileUIImg, chatAIImg, portfolioImg],
    color: "from-amber-500 to-orange-500",
    techStack: [
      { icon: <SiReact className="text-xl" />, name: "React Native" },
      { icon: <FaMobileAlt className="text-xl" />, name: "Figma" },
      { icon: <FaGlobe className="text-xl" />, name: "Lottie" },
      { icon: <FaServer className="text-xl" />, name: "Firebase" }
    ],
    features: [
      "Dark mode",
      "Gesture animations",
      "Micro-interactions",
      "60 FPS smooth"
    ],
    year: "2024",
    timeline: [
      {
        phase: "Giai đoạn Ý tưởng",
        date: "09/2023",
        tasks: [
          "Nghiên cứu xu hướng thiết kế",
          "Phác thảo ý tưởng chính",
          "Lên moodboard cảm hứng"
        ]
      },
      {
        phase: "Giai đoạn Thiết kế",
        date: "10/2023 - 11/2023",
        tasks: [
          "Thiết kế wireframe",
          "Xây dựng design system",
          "Tạo animation prototype"
        ]
      },
      {
        phase: "Giai đoạn Triển khai",
        date: "12/2023 - 02/2024",
        tasks: [
          "Code giao diện với React Native",
          "Tích hợp Lottie animations",
          "Test trên nhiều thiết bị"
        ]
      }
    ]
  }
];

const ProductSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.5
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.6
      }
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={containerVariants}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-[#161b22] dark:to-[#0d1117] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2de2e6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00f5d4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16 px-4"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] dark:from-[#00f5d4] dark:to-[#2de2e6] mb-4"
          >
            🚀 Sản phẩm & Dự án cá nhân
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Những dự án tôi đã xây dựng với đam mê và sự sáng tạo
          </motion.p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardHoverVariants}
              whileHover="hover"
              className="relative bg-white dark:bg-[#0d1117] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 group cursor-pointer"
              onClick={() => openModal(product)}
            >
              {/* Image section */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-60`}></div>
              </div>

              {/* Icon badge */}
              <div className="absolute top-36 left-6 p-3 rounded-xl bg-white dark:bg-[#0d1117] shadow-lg border border-gray-200 dark:border-gray-700">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${product.color} text-white`}>
                  {product.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.techStack.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 flex items-center"
                    >
                      {tech.icon}
                      <span className="ml-1">{tech.name}</span>
                    </span>
                  ))}
                  {product.techStack.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">
                      +{product.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal chi tiết */}
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white dark:bg-[#0d1117] rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nút đóng */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition z-10"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Slide ảnh */}
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <img 
                  src={selectedProduct.images[currentImageIndex]} 
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Nút điều hướng ảnh */}
                {selectedProduct.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition z-10"
                    >
                      <FaChevronLeft className="text-xl" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition z-10"
                    >
                      <FaChevronRight className="text-xl" />
                    </button>
                  </>
                )}
                
                {/* Chấm chỉ số ảnh */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                  {selectedProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                      className={`w-3 h-3 rounded-full transition ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Nội dung chi tiết */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedProduct.color} text-white shadow-md mr-4`}>
                    {selectedProduct.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedProduct.title}
                    </h2>
                    <div className="flex items-center mt-2 space-x-4">
                      <a 
                        href={selectedProduct.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-[#2de2e6] dark:hover:text-[#00f5d4] transition"
                      >
                        <FaGithub className="mr-1" /> GitHub
                      </a>
                      <a 
                        href={selectedProduct.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-[#2de2e6] dark:hover:text-[#00f5d4] transition"
                      >
                        <FaExternalLinkAlt className="mr-1" /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProduct.description}
                </p>

                {/* Tech stack và features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Tech stack */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Công nghệ sử dụng</h3>
                    <div className="space-y-2">
                      {selectedProduct.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-lg mr-3 text-gray-600 dark:text-gray-300">
                            {tech.icon}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Tính năng nổi bật</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-[#2de2e6] dark:text-[#00f5d4] mr-2">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline phát triển */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <FaCalendarCheck className="mr-2 text-[#2de2e6] dark:text-[#00f5d4]" />
                    Timeline Phát triển
                  </h3>
                  <div className="space-y-6">
                    {selectedProduct.timeline.map((phase, index) => (
                      <div key={index} className="relative pl-6 pb-6 border-l-2 border-[#2de2e6] dark:border-[#00f5d4]">
                        <div className="absolute w-4 h-4 rounded-full bg-[#2de2e6] dark:bg-[#00f5d4] -left-2 top-0"></div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-gray-800 dark:text-white">{phase.phase}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{phase.date}</p>
                          <ul className="space-y-2 mt-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start">
                                <FaTasks className="text-xs mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Timeline view for larger screens */}
        <div className="hidden lg:block mt-20">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12 px-4"
          >
            <motion.h3 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] dark:from-[#00f5d4] dark:to-[#2de2e6] mb-2"
            >
              Dòng thời gian dự án
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Hành trình phát triển sản phẩm của tôi qua các năm
            </motion.p>
          </motion.div>

          <div className="relative px-4">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-[#2de2e6] to-[#00f5d4] transform -translate-x-1/2"></div>

            {/* Timeline items */}
            {products.map((product, index) => (
              <motion.div
                key={`timeline-${index}`}
                variants={itemVariants}
                className={`mb-12 w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 p-0 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden ${index % 2 === 0 ? 'bg-white dark:bg-[#0d1117]' : 'bg-gray-50 dark:bg-[#161b22]'}`}>
                  {/* Timeline image */}
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-40`}></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${product.color} text-white shadow-md mr-4`}>
                        {product.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">{product.title}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{product.year}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{product.shortDescription}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <a 
                        href={product.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2de2e6] dark:text-[#00f5d4] hover:underline flex items-center"
                      >
                        <FaGithub className="mr-1" /> Code
                      </a>
                      <a 
                        href={product.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2de2e6] dark:text-[#00f5d4] hover:underline flex items-center"
                      >
                        <FaExternalLinkAlt className="mr-1" /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductSection;