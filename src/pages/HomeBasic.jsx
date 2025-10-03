import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeBasic = ({ darkMode, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white transition-colors duration-300 font-sans overflow-x-hidden relative">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div className="mt-24 relative z-10">
        {/* Hero Section Basic */}
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-6">Gwouth InFo</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Welcome to my profile website
          </p>
        </div>

        {/* About Section Basic */}
        <div className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/src/assets/avt.png" 
                  alt="Avatar" 
                  className="w-64 h-64 rounded-full mx-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Hello, I'm Gwouth</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm a passionate developer working on various projects.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  This is my personal profile website showcasing my work and interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          to="/chat"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          <FaCommentDots className="text-black text-2xl" />
        </Link>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomeBasic;