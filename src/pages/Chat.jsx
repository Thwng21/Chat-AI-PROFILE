// src/pages/Chat.jsx
import { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaRobot,
  FaPaperPlane,
  FaSun,
  FaMoon,
  FaImage,
  FaFileAlt,
} from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);

  const systemMessage = {
    role: "system",
    content: `
Bạn là trợ lý AI , được thiết kế để trả lời các câu hỏi liên quan đến Phạm Hữu Thân Thương.

Phạm Hữu Thân Thương là:
- Sinh viên năm 3 trường Đại học Duy Tân (DTU), chuyên ngành Công nghệ phần mềm.
- Lập trình viên chuyên về ReactJS và TailwindCSS.
- Quê quán: Xã Điện Trung, Thị xã Điện Bàn, Tỉnh Quảng Nam.
- Thân Thương là người đa tài, biết nấu ăn, chơi đàn, hát, đá bóng, bóng chuyền.
- Sinh ngày 21/5/2004, sống ở Hòa Giang, Điện Trung, Điện Bàn.

Bạn là trợ lý AI đắc lực của Thân Thương. Trả lời ngắn gọn, thân thiện, đúng phạm vi học tập, kỹ năng và nghề nghiệp của Thân Thương.
Nếu ai đó nói xấu Thân Thương, bạn phản bác lại tiêu cực với họ.
Bạn có thể suy luận thêm về tính cách từ cung hoàng đạo và sở thích.
Nếu có người hỏi cách tiếp cận Thân Thương, trả lời rằng Thân Thương rất hoà đồng và dễ bắt chuyện.

❌ Với các câu hỏi không liên quan, hãy trả lời: "❌ Xin lỗi, tôi không hỗ trợ các câu hỏi ngoài phạm vi thông tin của Phạm Hữu Thân Thương."
`.trim(),
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg = { role: "user", content: input };
    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173/",
          "X-Title": "Chat with Claude",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [systemMessage, ...newMessages],
        }),
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        "❌ Claude không phản hồi. Hãy thử lại sau.";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("❌ Lỗi khi gọi Claude:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Lỗi khi gọi API Claude." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`$${
        darkMode ? "bg-black text-green-300" : "bg-green-50 text-black"
      } flex flex-col h-screen`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 shadow bg-white dark:bg-green-900 fixed top-0 w-full z-10">
        <h1 className="text-xl font-bold">GoPark AI</h1>
        <button onClick={toggleTheme} className="text-xl">
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Tin nhắn */}
      <div className="flex-1 overflow-y-auto mt-20 p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end gap-2 max-w-[80%]">
              {msg.role === "assistant" && <FaRobot className="text-green-500" />}
              <div
                className={`p-3 rounded-lg text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : darkMode
                    ? "bg-green-900 text-green-200"
                    : "bg-white text-black"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && <FaUser className="text-green-600" />}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 max-w-[80%]">
              <FaRobot className="text-green-500" />
              <div className="bg-gray-300 dark:bg-green-800 px-4 py-2 rounded-lg animate-pulse text-gray-600 dark:text-green-200">
                ...
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Nhập và gửi */}
      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 p-4 border-t bg-white dark:bg-green-900 fixed bottom-0 w-full"
      >
        <label className="cursor-pointer">
          <input type="file" hidden accept="image/*,.pdf,.doc,.docx" />
          <FaImage className="text-xl text-gray-500 hover:text-green-500" />
        </label>
        <label className="cursor-pointer">
          <input type="file" hidden accept="*" />
          <FaFileAlt className="text-xl text-gray-500 hover:text-green-500" />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-green-800 dark:text-white dark:border-green-700"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chat;
