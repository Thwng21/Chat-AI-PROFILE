import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import { FaPaperPlane, FaUser, FaRobot, FaMicrophone, FaStop } from "react-icons/fa";
import { IoClose, IoAttach, IoImage } from "react-icons/io5";
import { BsFileEarmarkText } from "react-icons/bs";
import { RiLoader4Line } from "react-icons/ri";

const Chat = ({ darkMode, toggleTheme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [files, setFiles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  

  // System message giữ nguyên
  const systemMessage = {
    role: "system",
    content: `
Bạn là trợ lý AI, được thiết kế để trả lời các câu hỏi liên quan đến Phạm Hữu Thân Thương.

Phạm Hữu Thân Thương là:
- Sinh viên năm 3 trường Đại học Duy Tân (DTU), chuyên ngành Công nghệ phần mềm.
- Lập trình viên chuyên về ReactJS Nextjs và TailwindCSS.
- Quê quán: Hòa Giang, Xã Điện Trung, Thị xã Điện Bàn, Tỉnh Quảng Nam.
- Thân Thương là người đa tài, biết nấu ăn, chơi đàn, hát, đá bóng, bóng chuyền.
- Sinh ngày 21/5/2004, sống ở Hòa Giang, Điện Trung, Điện Bàn. cung song tu

Bạn là trợ lý AI đắc lực của Thân Thương. Trả lời ngắn gọn, thân thiện, đúng phạm vi học tập, kỹ năng và nghề nghiệp của Thân Thương.
Nếu ai đó nói xấu Thân Thương, bạn phản bác lại tiêu cực với họ.
Bạn có thể suy luận thêm về tính cách từ cung hoàng đạo và sở thích.
Nếu có người hỏi cách tiếp cận Thân Thương, trả lời rằng Thân Thương rất hoà đồng và dễ bắt chuyện.

❌ Với các câu hỏi không liên quan, hãy trả lời: "❌ Xin lỗi, tôi không hỗ trợ các câu hỏi ngoài phạm vi thông tin của Phạm Hữu Thân Thương."
`.trim(),
  };

  // Khởi tạo SpeechRecognition với xử lý lỗi tốt hơn
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setSpeechError("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'vi-VN';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? `${prev} ${transcript}` : transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Lỗi nhận diện giọng nói:', event.error);
      setIsListening(false);
      setSpeechError(getSpeechError(event.error));
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    window.speechRecognition = recognition;

    // Kiểm tra quyền microphone
    checkMicrophonePermission();
  }, []);

  const getSpeechError = (error) => {
    switch(error) {
      case 'no-speech':
        return 'Không phát hiện giọng nói. Vui lòng thử lại';
      case 'audio-capture':
        return 'Không thể truy cập microphone';
      case 'not-allowed':
        return 'Bạn đã từ chối quyền sử dụng microphone';
      default:
        return 'Lỗi nhận diện giọng nói. Vui lòng thử lại';
    }
  };

  const checkMicrophonePermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      if (permissionStatus.state === 'denied') {
        setSpeechError("Bạn đã từ chối quyền sử dụng microphone");
      }
      permissionStatus.onchange = () => {
        if (permissionStatus.state === 'granted') {
          setSpeechError(null);
        } else {
          setSpeechError("Quyền microphone bị từ chối");
        }
      };
    } catch (err) {
      console.error("Không thể kiểm tra quyền microphone:", err);
    }
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Hàm gửi tin nhắn giữ nguyên
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
      inputRef.current?.focus();
    }
  };

  // Hàm bật/tắt nhận diện giọng nói với xử lý lỗi
  const toggleSpeechRecognition = async () => {
    if (isListening) {
      window.speechRecognition.stop();
      setIsListening(false);
      return;
    }

    try {
      // Yêu cầu quyền microphone trước khi bắt đầu
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      window.speechRecognition.start();
      setIsListening(true);
      setSpeechError(null);
    } catch (err) {
      console.error('Lỗi microphone:', err);
      setIsListening(false);
      setSpeechError("Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập");
      setSpeechSupported(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-[#0d1117] text-black dark:text-white font-sans">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} className="z-50" />
      
      <div className="flex-1 px-4 pt-20 pb-24 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex justify-center mb-8">
            <div className="max-w-md text-center bg-white dark:bg-[#161b22] p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Chào bạn! Tôi là trợ lý ảo của Thân Thương. Hãy hỏi tôi bất cứ điều gì về cậu ấy nhé!
              </p>
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-6 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col max-w-[90%] md:max-w-[80%]">
              <div className="flex items-start gap-3">
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] flex items-center justify-center mt-1 shadow-md">
                    <FaRobot className="text-lg text-white" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl whitespace-pre-wrap text-sm shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-black"
                      : "bg-white dark:bg-[#161b22] dark:text-white"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-gray-300 rounded-full shadow-md w-9 h-9 dark:bg-gray-600">
                    <FaUser className="text-lg text-gray-700 dark:text-white" />
                  </div>
                )}
              </div>
              
              {msg.files && msg.files.length > 0 && (
                <div className="mt-3 ml-12 space-y-3">
                  {msg.files.map((file, fidx) => (
                    <div key={fidx} className="relative group">
                      {file.type.startsWith("image/") ? (
                        <div className="relative overflow-hidden border border-gray-200 shadow-sm rounded-xl dark:border-gray-700">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="object-cover max-w-full md:max-w-md max-h-60"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                            <p className="text-sm text-white truncate">{file.name}</p>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={URL.createObjectURL(file)}
                          download={file.name}
                          className="inline-flex items-center gap-2 px-4 py-3 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <BsFileEarmarkText className="text-[#2de2e6] text-lg" />
                          <span className="text-sm font-medium">{file.name}</span>
                          <span className="ml-auto text-xs text-gray-500">Download</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-3 mb-6 ml-12">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] flex items-center justify-center shadow-md">
              <FaRobot className="text-lg text-white" />
            </div>
            <div className="animate-pulse px-4 py-3 bg-gray-300 dark:bg-[#2c3e50] rounded-xl text-gray-600 dark:text-white">
              Đang xử lý...
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {files.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-700 px-4 py-3 shadow-lg">
          <div className="flex items-center gap-3 pb-2 overflow-x-auto">
            {files.map((file, idx) => (
              <div key={idx} className="relative flex-shrink-0 group">
                {file.type.startsWith("image/") ? (
                  <div className="relative w-24 h-24 overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover w-full h-full"
                    />
                    <button
                      onClick={() => removeFile(idx)}
                      className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                    >
                      <IoClose size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50">
                      <p className="px-1 text-xs text-white truncate">{file.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-48 p-3 pr-8 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <BsFileEarmarkText className="text-[#2de2e6]" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="absolute text-gray-500 top-2 right-2 hover:text-red-500"
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 shadow-lg"
      >
        <div className="flex gap-1">
          <label className="p-2 transition-colors rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              multiple
              onChange={(e) => setFiles(prev => [...prev, ...Array.from(e.target.files)])}
            />
            <IoImage className="text-xl text-gray-600 dark:text-gray-400 hover:text-[#2de2e6]" />
          </label>
          <label className="p-2 transition-colors rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            <input
              type="file"
              hidden
              accept="*/*"
              multiple
              onChange={(e) => setFiles(prev => [...prev, ...Array.from(e.target.files)])}
            />
            <IoAttach className="text-xl text-gray-600 dark:text-gray-400 hover:text-[#2de2e6]" />
          </label>
        </div>
        
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#2de2e6] dark:bg-[#0d1117] dark:text-white dark:border-gray-700"
            placeholder="Nhập tin nhắn..."
            autoFocus
          />
          {speechSupported ? (
            <>
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                  isListening 
                    ? 'text-red-500 animate-pulse' 
                    : 'text-gray-500 hover:text-[#2de2e6]'
                }`}
              >
                {isListening ? <FaStop /> : <FaMicrophone />}
              </button>
              {speechError && (
                <div className="absolute right-0 px-2 py-1 text-xs text-red-800 bg-red-100 rounded -top-8 dark:bg-red-900 dark:text-red-100">
                  {speechError}
                </div>
              )}
            </>
          ) : (
            <div className="absolute text-xs text-gray-400 transform -translate-y-1/2 right-3 top-1/2">
              Không hỗ trợ
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() && files.length === 0}
          className="p-3 rounded-full bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </form>
    </div>
  );
};

export default Chat;