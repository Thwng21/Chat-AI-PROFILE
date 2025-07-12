// src/pages/Chat.jsx
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import {
  FaPaperPlane,
  FaUser,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";

const Chat = ({ darkMode, toggleTheme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [files, setFiles] = useState([]);
  const bottomRef = useRef(null);

  const systemMessage = {
    role: "system",
    content: `Bạn là trợ lý AI của Phạm Hữu Thân Thương...`,
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && files.length === 0) return;

    let content = input;
    if (files.length > 0) {
      const fileDescriptions = files.map((file) => {
        if (file.type.startsWith("image/")) {
          return `🖼️ Ảnh: ${file.name}`;
        } else {
          return `📎 Tệp: ${file.name}`;
        }
      }).join("\n");
      content += `\n\n${fileDescriptions}`;
    }

    const newUserMsg = { role: "user", content, files };
    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);
    setInput("");
    setFiles([]);
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
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Lỗi khi gọi API Claude." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white font-sans">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="mt-24 px-4 pb-36 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col max-w-[80%]">
              <div
                className={`p-3 rounded-lg whitespace-pre-line text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-[#2de2e6] text-black"
                    : "bg-white dark:bg-[#161b22] dark:text-white"
                }`}
              >
                {msg.content}
              </div>
              {msg.files &&
                msg.files.map((file, fidx) => (
                  file.type.startsWith("image/") ? (
                    <img
                      key={fidx}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="mt-2 max-w-xs rounded-lg border"
                    />
                  ) : (
                    <a
                      key={fidx}
                      href={URL.createObjectURL(file)}
                      download={file.name}
                      className="mt-2 text-blue-500 underline text-sm"
                    >
                      📎 {file.name}
                    </a>
                  )
                ))}
            </div>
            {msg.role === "user" && (
              <FaUser className="ml-2 text-[#2de2e6] text-lg" />
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              alt="AI Avatar"
              className="w-7 h-7 rounded-full"
            />
            <div className="animate-pulse px-4 py-2 bg-gray-300 dark:bg-[#2c3e50] rounded-xl text-gray-600 dark:text-white">
              ...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {files.length > 0 && (
        <div className="px-4 pb-2 text-sm text-gray-700 dark:text-gray-300">
          <p className="mb-1 font-semibold">📁 File sẽ gửi:</p>
          <ul className="list-disc list-inside space-y-1">
            {files.map((file, idx) => (
              <li key={idx}>
                {file.type.startsWith("image/") ? (
                  <div className="flex items-center gap-2">
                    🖼️ <span>{file.name}</span>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  </div>
                ) : (
                  <>📎 {file.name}</>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-700 flex items-center gap-2"
      >
        <label className="cursor-pointer">
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
          <FaImage className="text-xl text-gray-500 hover:text-[#2de2e6]" />
        </label>
        <label className="cursor-pointer">
          <input
            type="file"
            hidden
            accept="*/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
          <FaFileAlt className="text-xl text-gray-500 hover:text-[#2de2e6]" />
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none dark:bg-[#0d1117] dark:text-white"
          placeholder="Nhập tin nhắn..."
        />
        <button
          type="submit"
          className="bg-[#2de2e6] hover:bg-[#00f5d4] text-black p-2 rounded-full"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chat;