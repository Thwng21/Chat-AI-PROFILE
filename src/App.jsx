import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Aboutme from "./pages/Aboutme";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home darkMode={darkMode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/chat"
            element={<Chat darkMode={darkMode} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/about"
            element={<Aboutme darkMode={darkMode} toggleTheme={toggleTheme} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;