import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import HomeSimple from "./pages/HomeSimple";
import HomeBasic from "./pages/HomeBasic";
import TestPage from "./pages/TestPage";
import Aboutme from "./pages/Aboutme";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`font-sans ${darkMode ? "dark" : ""}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/basic" element={<HomeBasic darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/simple" element={<HomeSimple darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/chat" element={<Chat darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/about" element={<Aboutme darkMode={darkMode} toggleTheme={toggleTheme} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
