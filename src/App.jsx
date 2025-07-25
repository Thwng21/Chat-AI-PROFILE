import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Aboutme from "./pages/Aboutme";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={`font-sans ${darkMode ? "dark" : ""}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<Aboutme />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
