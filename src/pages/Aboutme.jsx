import { useState } from "react";
import Header from "../components/Header";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Aboutme = ({ darkMode, toggleTheme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "Nhận xét mới từ trang cá nhân"
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Gửi nhận xét thất bại, vui lòng thử lại sau");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white font-sans transition duration-300">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div className="pt-24 px-4 md:px-8 max-w-6xl mx-auto pb-12">
        {/* Phần giới thiệu */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] mb-6">
            Phạm Hữu Thân Thương
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Sinh viên Công nghệ Phần mềm | Lập trình viên Full-stack | Đam mê thiết kế UI/UX
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Thông tin cá nhân */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-[#161b22] p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#2de2e6] dark:text-[#00f5d4] mb-6">Thông tin cá nhân</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="text-[#2de2e6] dark:text-[#00f5d4] text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Địa chỉ</h4>
                  <p className="text-gray-600 dark:text-gray-400">Hòa Giang, Điện Trung, Điện Bàn, Quảng Nam</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaEnvelope className="text-[#2de2e6] dark:text-[#00f5d4] text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:thanthuong21504@gmail.com" className="text-gray-600 dark:text-gray-400 hover:underline">
                    thanthuong21504@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaPhone className="text-[#2de2e6] dark:text-[#00f5d4] text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Điện thoại</h4>
                  <p className="text-gray-600 dark:text-gray-400">(+84) 123 456 789</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-3">Liên kết mạng xã hội</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/thanthuong" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-[#2de2e6] dark:hover:text-[#00f5d4] transition">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/thanthuong" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-[#2de2e6] dark:hover:text-[#00f5d4] transition">
                    <FaLinkedin />
                  </a>
                  <a href="https://facebook.com/thanthuong" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-[#2de2e6] dark:hover:text-[#00f5d4] transition">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form liên hệ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-[#161b22] p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#2de2e6] dark:text-[#00f5d4] mb-6">Gửi nhận xét</h3>
            
            {isSubmitted ? (
              <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg mb-6">
                Cảm ơn bạn đã gửi nhận xét! Tôi sẽ liên hệ lại sớm nhất có thể.
              </div>
            ) : (
              <>
                {error && (
                  <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2de2e6] focus:border-transparent dark:bg-[#0d1117] dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2de2e6] focus:border-transparent dark:bg-[#0d1117] dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nhận xét
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2de2e6] focus:border-transparent dark:bg-[#0d1117] dark:border-gray-700"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-black font-medium rounded-lg hover:opacity-90 transition disabled:opacity-70 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang gửi...
                      </>
                    ) : "Gửi nhận xét"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Giới thiệu thêm */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-white dark:bg-[#161b22] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[#2de2e6] dark:text-[#00f5d4] mb-6">Về tôi</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Xin chào! Tôi là Thân Thương, sinh viên năm 3 ngành Công nghệ Phần mềm tại Đại học Duy Tân. 
              Với niềm đam mê lập trình và thiết kế, tôi luôn tìm tòi học hỏi những công nghệ mới để phát triển bản thân.
            </p>
            <p>
              Tôi có kinh nghiệm làm việc với các công nghệ web hiện đại như ReactJS, Node.js và có khả năng thiết kế UI/UX. 
              Ngoài lập trình, tôi còn yêu thích âm nhạc, thể thao và nấu ăn.
            </p>
            <p>
              Mục tiêu của tôi là trở thành một lập trình viên full-stack giỏi, có thể tạo ra những sản phẩm chất lượng 
              mang lại trải nghiệm tốt cho người dùng.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Aboutme;