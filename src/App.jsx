import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Aboutme from "./pages/Aboutme";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<Aboutme />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
