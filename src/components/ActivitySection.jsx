import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { 
  FaBook,
  FaLaptopCode,
  FaPalette,
  FaCalendarAlt,
  FaClock,
  FaUniversity,
  FaRunning,
  FaMusic,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCode
} from "react-icons/fa";
import { GiSoccerBall, GiGuitar, GiBrain } from "react-icons/gi";

// Import hình ảnh (thay bằng đường dẫn thực tế của bạn)
import studyImg from '../assets/bg1.jpg';
import codingImg from '../assets/bg1.jpg';
import designImg from '../assets/bg1.jpg';
import sportImg from '../assets/bg1.jpg';
import musicImg from '../assets/bg1.jpg';


const activities = [
  {
    id: 1,
    icon: <FaUniversity className="text-2xl" />,
    title: "Học tập",
    description: "Sinh viên năm 3 ngành Công nghệ phần mềm tại Đại học Duy Tân. Đang nghiên cứu về các công nghệ web hiện đại và phát triển ứng dụng di động.",
    time: "2021 - Hiện tại",
    hours: "40h/tuần",
    color: "from-blue-500 to-cyan-400",
    images: [studyImg, codingImg, designImg],
    details: [
      { icon: <FaGraduationCap />, text: "Đại học Duy Tân - Công nghệ phần mềm" },
      { icon: <FaBook />, text: "Điểm trung bình: 3.6/4.0" },
      { icon: <FaCode />, text: "Tham gia CLB nghiên cứu khoa học" },
      { icon: <GiBrain />, text: "Đạt học bổng 3 kỳ liên tiếp" }
    ],
    location: "Đà Nẵng, Việt Nam",
    year: "2021"
  },
  {
    id: 2,
    icon: <FaLaptopCode className="text-2xl" />,
    title: "Lập trình",
    description: "Phát triển ứng dụng web với ReactJS, TailwindCSS và các công nghệ hiện đại. Có kinh nghiệm xây dựng các ứng dụng fullstack.",
    time: "2020 - Hiện tại",
    hours: "25h/tuần",
    color: "from-purple-500 to-pink-500",
    images: [codingImg, studyImg, designImg],
    details: [
      { icon: <FaCode />, text: "Thành thạo ReactJS, NextJS" },
      { icon: <FaCode />, text: "Kinh nghiệm với Node.js và Express" },
      { icon: <FaCode />, text: "Xây dựng 5+ dự án cá nhân" },
      { icon: <FaCode />, text: "Tham gia các cuộc thi hackathon" }
    ],
    location: "Remote & Đà Nẵng",
    year: "2020"
  },
  {
    id: 3,
    icon: <FaPalette className="text-2xl" />,
    title: "Thiết kế UI/UX",
    description: "Tạo giao diện người dùng đẹp mắt và trải nghiệm tối ưu. Quan tâm đến psychology trong thiết kế.",
    time: "2021 - Hiện tại",
    hours: "15h/tuần",
    color: "from-amber-500 to-orange-500",
    images: [designImg, codingImg, studyImg],
    details: [
      { icon: <FaPalette />, text: "Thiết kế 10+ giao diện web" },
      { icon: <FaPalette />, text: "Sử dụng Figma, Adobe XD" },
      { icon: <FaPalette />, text: "Nghiên cứu UX Psychology" },
      { icon: <FaPalette />, text: "Thiết kế hệ thống design token" }
    ],
    location: "Figma Community",
    year: "2021"
  },
  {
    id: 4,
    icon: <FaRunning className="text-2xl" />,
    title: "Thể thao",
    description: "Đá bóng, chơi bóng chuyền để rèn luyện sức khỏe và tinh thần đồng đội. Hoạt động thể chất giúp tôi cân bằng cuộc sống.",
    time: "Thứ 3,5,7 hàng tuần",
    hours: "8h/tuần",
    color: "from-emerald-500 to-teal-400",
    images: [sportImg, musicImg, studyImg],
    details: [
      { icon: <GiSoccerBall />, text: "Đội trưởng đội bóng đá phòng" },
      { icon: <GiSoccerBall />, text: "Giải nhì bóng chuyền sinh viên" },
      { icon: <GiSoccerBall />, text: "Chạy bộ 5km mỗi sáng" },
      { icon: <GiSoccerBall />, text: "Yoga để tăng độ dẻo dai" }
    ],
    location: "Sân vận động ĐH Duy Tân",
    year: "2019"
  },
  {
    id: 5,
    icon: <FaMusic className="text-2xl" />,
    title: "Âm nhạc",
    description: "Chơi guitar và hát để thư giãn sau giờ học và làm việc căng thẳng. Âm nhạc là liều thuốc tinh thần của tôi.",
    time: "Cuối tuần",
    hours: "5h/tuần",
    color: "from-rose-500 to-pink-500",
    images: [musicImg, sportImg, codingImg],
    details: [
      { icon: <GiGuitar />, text: "Chơi guitar được 4 năm" },
      { icon: <GiGuitar />, text: "Thành viên CLB âm nhạc" },
      { icon: <GiGuitar />, text: "Biểu diễn tại các sự kiện trường" },
      { icon: <GiGuitar />, text: "Sáng tác 3 bài hát" }
    ],
    location: "CLB Âm nhạc ĐH Duy Tân",
    year: "2018"
  },
  {
    id: 6,
    icon: <FaMusic className="text-2xl" />,
    title: "Âm nhạc",
    description: "Chơi guitar và hát để thư giãn sau giờ học và làm việc căng thẳng. Âm nhạc là liều thuốc tinh thần của tôi.",
    time: "Cuối tuần",
    hours: "5h/tuần",
    color: "from-rose-500 to-pink-500",
    images: [musicImg, sportImg, codingImg],
    details: [
      { icon: <GiGuitar />, text: "Chơi guitar được 4 năm" },
      { icon: <GiGuitar />, text: "Thành viên CLB âm nhạc" },
      { icon: <GiGuitar />, text: "Biểu diễn tại các sự kiện trường" },
      { icon: <GiGuitar />, text: "Sáng tác 3 bài hát" }
    ],
    location: "CLB Âm nhạc ĐH Duy Tân",
    year: "2018"
  }
];

const ActivitySection = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
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

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedActivity(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === selectedActivity.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedActivity.images.length - 1 : prev - 1
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

  const timelineVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      transition: {
        duration: 0.5
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
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
            Hoạt động & Sở thích
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Những điều tạo nên phong cách và cá tính của tôi
          </motion.p>
        </motion.div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              whileHover="hover"
              variants={cardHoverVariants}
              className="relative bg-white dark:bg-[#0d1117] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 group cursor-pointer"
              onClick={() => openModal(activity)}
            >
              {/* Image section */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={activity.images[0]} 
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} opacity-60`}></div>
              </div>

              {/* Icon badge */}
              <div className="absolute top-36 left-6 p-3 rounded-xl bg-white dark:bg-[#0d1117] shadow-lg border border-gray-200 dark:border-gray-700">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${activity.color} text-white`}>
                  {activity.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {activity.description}
                </p>

                {/* Time and hours */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2 text-sm" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-gray-500 dark:text-gray-400 mr-2 text-sm" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{activity.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal chi tiết */}
        {selectedActivity && (
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
                  src={selectedActivity.images[currentImageIndex]} 
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Nút điều hướng ảnh */}
                {selectedActivity.images.length > 1 && (
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
                  {selectedActivity.images.map((_, index) => (
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
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedActivity.color} text-white shadow-md mr-4`}>
                    {selectedActivity.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedActivity.title}
                    </h2>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{selectedActivity.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedActivity.description}
                </p>

                {/* Chi tiết hoạt động */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedActivity.details.map((detail, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-lg mr-3 mt-1 text-gray-600 dark:text-gray-300">
                        {detail.icon}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{detail.text}</span>
                    </div>
                  ))}
                </div>

                {/* Thời gian và giờ */}
                <div className="flex flex-wrap justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedActivity.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{selectedActivity.hours}</span>
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
              Dòng thời gian
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Hành trình phát triển của tôi qua các năm
            </motion.p>
          </motion.div>

          <div className="relative px-4">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-[#2de2e6] to-[#00f5d4] transform -translate-x-1/2"></div>

            {/* Timeline items */}
            {activities.map((activity, index) => (
              <motion.div
                key={`timeline-${index}`}
                variants={itemVariants}
                className={`mb-12 w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 p-0 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden ${index % 2 === 0 ? 'bg-white dark:bg-[#0d1117]' : 'bg-gray-50 dark:bg-[#161b22]'}`}>
                  {/* Timeline image */}
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={activity.images[0]} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${activity.color} opacity-40`}></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${activity.color} text-white shadow-md mr-4`}>
                        {activity.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">{activity.title}</h4>
                        <div className="flex items-center mt-1">
                          <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2 text-sm" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{activity.description}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaClock className="mr-1" />
                      <span>{activity.hours}</span>
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

export default ActivitySection;