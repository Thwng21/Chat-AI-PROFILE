import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ActivitySection from "../components/ActivitySection";
import ProductSection from "../components/ProductSection";

const Home = ({ darkMode, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white transition-colors duration-300 font-sans overflow-x-hidden">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="mt-24">
        <HeroSection />
        <AboutSection />
        <ActivitySection />
        <ProductSection />

        <Link
          to="/chat"
          className="fixed bottom-5 right-5 z-50 bg-[#2de2e6] hover:bg-[#00f5d4] p-4 rounded-full shadow-lg transition duration-300"
        >
          <FaCommentDots className="text-black text-2xl" />
        </Link>
      </div>
      <Footer />
  
    </div>
  );
};

export default Home;
