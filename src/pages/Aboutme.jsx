import Header from "../components/Header";

const Aboutme = ({ darkMode, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white font-sans transition duration-300">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="pt-24 px-6">
        <h2 className="text-3xl font-bold text-[#2de2e6] dark:text-[#00f5d4] mb-4 text-center">Thông tin</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          Ứng dụng được phát triển bằng ReactJS, TailwindCSS, và tích hợp Gemini AI API.
        </p>
      </div>
    </div>
  );
};

export default Aboutme;