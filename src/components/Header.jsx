import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow fixed z-[1000] top-o left-0 w-full p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">🤖 GoPark AI</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Trang chủ</Link>
        <Link to="/chat" className="hover:text-blue-500">Chat</Link>
        <Link to="/about" className="hover:text-blue-500">Thông tin</Link>
      </nav>
    </header>
  );
};

export default Header;
