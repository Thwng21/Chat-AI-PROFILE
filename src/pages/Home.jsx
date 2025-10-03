import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ActivitySection from "../components/ActivitySection";
import ProductSection from "../components/ProductSection";
import ParticleSystem from "../components/ParticleSystem";
import SoundSystem from "../components/SoundSystem";
import EasterEggSystem from "../components/EasterEggSystem";
import MobileTouchSystem from "../components/MobileTouchSystem";
import MobileEasterEggs from "../components/MobileEasterEggs";

const Home = ({ darkMode, toggleTheme }) => {
  return (
    <MobileTouchSystem>
      <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white transition-colors duration-300 font-sans overflow-x-hidden relative">
        {/* Particle System Background */}
        <ParticleSystem theme={darkMode ? 'dark' : 'light'} />
        
        {/* Sound System */}
        <SoundSystem darkMode={darkMode} />
        
        {/* Easter Egg Systems */}
        <EasterEggSystem />
        <MobileEasterEggs />
        
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="mt-24 relative z-10">
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
    </MobileTouchSystem>
  );
};

export default Home;
