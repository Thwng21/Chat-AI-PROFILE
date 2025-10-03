import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPaperPlane, 
  FaRobot, 
  FaUser, 
  FaMicrophone, 
  FaVolumeUp,
  FaCog,
  FaHeart,
  FaLightbulb,
  FaCode,
  FaGraduationCap
} from 'react-icons/fa';

const SmartChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Chào bạn! 👋 Tôi là AI Assistant của Phạm Hữu Thân Thương. Tôi có thể trò chuyện về cuộc sống, dự án, và chia sẻ những câu chuyện thú vị! Bạn muốn biết gì về tôi không?",
      timestamp: new Date(),
      emotion: 'excited'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatPersonality, setChatPersonality] = useState('friendly');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Personality types và responses
  const personalities = {
    friendly: {
      name: "Thân thiện",
      icon: FaHeart,
      color: "from-pink-400 to-red-400",
      responses: {
        greeting: ["Xin chào! 😊", "Chào bạn nhé! 🌟", "Hi there! 👋"],
        about: "Tôi là Phạm Hữu Thân Thương, hiện đang học năm 4 tại Đại học Duy Tân. Tôi đam mê lập trình web và luôn tìm kiếm những điều mới mẻ trong công nghệ!",
        projects: "Tôi đã làm nhiều dự án thú vị như website portfolio này, ứng dụng chat AI, và các dự án React/Next.js khác. Mỗi dự án đều là một hành trình học hỏi tuyệt vời!",
        skills: "Tôi sử dụng React, Next.js, TailwindCSS, Node.js, MongoDB và Express. Đặc biệt yêu thích tạo ra những giao diện đẹp với animation mượt mà!",
        hobbies: "Ngoài code, tôi thích nghe nhạc, xem phim sci-fi và khám phá những công nghệ mới. Có khi cũng chơi game để thư giãn sau những giờ làm việc căng thẳng!"
      }
    },
    creative: {
      name: "Sáng tạo",
      icon: FaLightbulb,
      color: "from-yellow-400 to-orange-400",
      responses: {
        greeting: ["Chào nghệ sĩ! 🎨", "Xin chào người sáng tạo! ✨", "Hey creator! 🚀"],
        about: "Tôi là một creative developer - kết hợp giữa lập trình và nghệ thuật! Mỗi dòng code của tôi đều mang trong mình linh hồn sáng tạo.",
        projects: "Các dự án của tôi không chỉ là code, mà còn là những tác phẩm nghệ thuật số! Từ particle effects độc đáo đến animations mượt mà như lụa.",
        skills: "Tôi nghiên cứu sâu về UI/UX, motion design, và cách tạo ra những trải nghiệm người dùng không thể quên. Code + Art = Magic! ✨",
        hobbies: "Tôi vẽ concepts cho UI, thử nghiệm với các hiệu ứng visual mới, và luôn tìm cách biến những ý tưởng điên rồ thành hiện thực qua code!"
      }
    },
    technical: {
      name: "Kỹ thuật",
      icon: FaCode,
      color: "from-blue-400 to-purple-400",
      responses: {
        greeting: ["Hello, developer! 💻", "Chào anh em coder! ⚡", "Hey tech enthusiast! 🔧"],
        about: "Tôi là full-stack developer với focus vào modern web technologies. Hiện đang deep-dive vào React ecosystem và cloud technologies.",
        projects: "Portfolio này build với Vite + React 18, sử dụng Framer Motion cho animations, TailwindCSS cho styling. Backend thì MongoDB + Express + Node.js stack.",
        skills: "Frontend: React, Next.js, TypeScript, TailwindCSS. Backend: Node.js, Express, MongoDB. Tools: Git, Docker, Vercel. Đang học thêm về microservices và AWS.",
        hobbies: "Đọc tech blogs, contribute vào open source projects, tham gia hackathons và luôn experiment với các technologies mới nhất trong ecosystem JavaScript."
      }
    },
    student: {
      name: "Sinh viên",
      icon: FaGraduationCap,
      color: "from-green-400 to-blue-400",
      responses: {
        greeting: ["Chào bạn cùng lớp! 📚", "Hi fellow student! 🎓", "Hey học bá! 📖"],
        about: "Tôi đang học năm 3 ngành CNTT tại ĐH Duy Tân. Cuộc sống sinh viên khá vất vả nhưng đầy thú vị với những dự án và deadline liên tục!",
        projects: "Đây là dự án cuối kỳ của tôi! Ngoài ra còn có các bài tập về database, web development, và mobile app. Mỗi project đều học được rất nhiều thứ mới.",
        skills: "Đang trong quá trình học và thực hành các môn: Lập trình web, Database, Software Engineering. Tự học thêm React và các frameworks modern.",
        hobbies: "Balance giữa học tập và giải trí: code project, làm bài tập nhóm, thỉnh thoảng đi cà phê với bạn bè và gaming để relax sau những ngày học căng thẳng!"
      }
    }
  };

  // AI Response Generator
  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    const currentPersonality = personalities[chatPersonality];
    
    // Greeting patterns
    if (lowerInput.match(/^(hi|hello|xin chào|chào|hey)/)) {
      return getRandomResponse(currentPersonality.responses.greeting);
    }
    
    // About patterns
    if (lowerInput.includes('bạn là ai') || lowerInput.includes('giới thiệu') || lowerInput.includes('about you')) {
      return currentPersonality.responses.about;
    }
    
    // Project patterns
    if (lowerInput.includes('dự án') || lowerInput.includes('project') || lowerInput.includes('làm gì')) {
      return currentPersonality.responses.projects;
    }
    
    // Skills patterns
    if (lowerInput.includes('kỹ năng') || lowerInput.includes('skill') || lowerInput.includes('công nghệ') || lowerInput.includes('tech')) {
      return currentPersonality.responses.skills;
    }
    
    // Hobbies patterns
    if (lowerInput.includes('sở thích') || lowerInput.includes('hobby') || lowerInput.includes('thích gì')) {
      return currentPersonality.responses.hobbies;
    }
    
    // Contact patterns
    if (lowerInput.includes('liên hệ') || lowerInput.includes('contact') || lowerInput.includes('email')) {
      return "Bạn có thể liên hệ với tôi qua email hoặc các social media links ở footer nhé! Tôi luôn vui lòng kết nối và trò chuyện với mọi người 😊";
    }
    
    // Location patterns
    if (lowerInput.includes('ở đâu') || lowerInput.includes('địa chỉ') || lowerInput.includes('location')) {
      return "Tôi đang ở Hoà Giang, Điện Trung, Quảng Nam - một vùng đất xinh đẹp với nhiều cảnh đẹp và con người thân thiện! 🏞️";
    }
    
    // Age patterns
    if (lowerInput.includes('tuổi') || lowerInput.includes('age') || lowerInput.includes('sinh năm')) {
      return "Tôi sinh năm 2004, hiện tại 21 tuổi - đang ở tuổi đẹp nhất để học hỏi và khám phá thế giới công nghệ! 🚀";
    }
    
    // Default responses based on personality
    const defaultResponses = {
      friendly: [
        "Câu hỏi thú vị đấy! Tôi sẽ cố gắng trả lời tốt nhất có thể 😊",
        "Hmm, để tôi suy nghĩ một chút... 🤔 Bạn có thể hỏi cụ thể hơn được không?",
        "Tôi hiểu bạn muốn biết điều đó! Có thể bạn thử hỏi về dự án, kỹ năng, hay sở thích của tôi nhé!",
        "Interesting! Tôi có thể chia sẻ về kinh nghiệm học tập và coding của mình nè! 💻"
      ],
      creative: [
        "Wow, câu hỏi sáng tạo đấy! ✨ Tôi thích cách bạn suy nghĩ!",
        "Bạn có tâm hồn nghệ sĩ đấy! 🎨 Hãy cùng tôi khám phá thế giới creative coding nhé!",
        "Tôi cảm nhận được năng lượng sáng tạo từ câu hỏi này! 🚀 Bạn muốn biết về process design của tôi?",
        "Art meets code! Đó là motto của tôi. Bạn có muốn tìm hiểu cách tôi blend creativity vào programming không? 🌈"
      ],
      technical: [
        "Good question! 💻 Bạn muốn dive deep vào technical aspects nào?",
        "Tôi có thể chia sẻ về architecture, performance optimization, hoặc best practices. What's your interest? 🔧",
        "Technical wise, tôi luôn sẵn sàng discuss về code quality, scalability, hay modern web development trends! ⚡",
        "Let's talk tech! Bạn quan tâm về frontend, backend, hay full-stack development? 🛠️"
      ],
      student: [
        "Câu hỏi hay đấy bạn! 📚 Cùng học hỏi nhau nhé!",
        "Ở trường tôi cũng thường gặp những câu hỏi như thế này! 🎓 Hãy cùng tìm hiểu!",
        "Student life luôn đầy thú vị với những discovery mới! 📖 Bạn cũng đang học IT à?",
        "Kinh nghiệm học tập của tôi có thể hữu ích cho bạn đấy! 💡 Cùng share knowledge nhé!"
      ]
    };
    
    return getRandomResponse(defaultResponses[chatPersonality]);
  };
  
  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Speech Recognition (Web Speech API)
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  // Text to Speech
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date(),
        emotion: 'happy'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const PersonalityIcon = personalities[chatPersonality].icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-4 md:inset-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaRobot className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Thân Thương AI</h3>
              <p className="text-sm opacity-90">Personality: {personalities[chatPersonality].name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Personality Selector */}
            <div className="flex space-x-1">
              {Object.entries(personalities).map(([key, personality]) => {
                const Icon = personality.icon;
                return (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setChatPersonality(key)}
                    className={`p-2 rounded-lg transition-all ${
                      chatPersonality === key 
                        ? 'bg-white/30 text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                    title={personality.name}
                  >
                    <Icon className="text-sm" />
                  </motion.button>
                );
              })}
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : `bg-gradient-to-r ${personalities[chatPersonality].color}`
                }`}>
                  {message.type === 'user' ? (
                    <FaUser className="text-white text-sm" />
                  ) : (
                    <PersonalityIcon className="text-white text-sm" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.type === 'bot' && (
                      <button
                        onClick={() => speak(message.content)}
                        className="ml-2 p-1 hover:bg-white/20 rounded"
                        title="Đọc to"
                      >
                        <FaVolumeUp className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${personalities[chatPersonality].color} flex items-center justify-center`}>
                <PersonalityIcon className="text-white text-sm" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-2">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Nói để nhập văn bản"
          >
            <FaMicrophone />
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2de2e6]"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </motion.button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {['Giới thiệu bản thân', 'Dự án nổi bật', 'Kỹ năng lập trình', 'Sở thích'].map((action) => (
            <motion.button
              key={action}
              whileHover={{ scale: 1.05 }}
              onClick={() => setInputValue(action)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {action}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SmartChatbot;