import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, 
  FaMagic, 
  FaHeart, 
  FaStar,
  FaGift,
  FaGamepad,
  FaCrown,
  FaBolt,
  FaFire,
  FaGem
} from 'react-icons/fa';

const EasterEggSystem = () => {
  const [discoveredEggs, setDiscoveredEggs] = useState(new Set());
  const [currentEgg, setCurrentEgg] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [clickSequence, setClickSequence] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [isRainbowMode, setIsRainbowMode] = useState(false);
  const [showSecretMenu, setShowSecretMenu] = useState(false);
  
  const clickTimeoutRef = useRef(null);
  const sparkleIntervalRef = useRef(null);
  
  // Konami Code sequence
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Easter Eggs Configuration
  const easterEggs = {
    konami: {
      id: 'konami',
      title: '🎮 Konami Master',
      description: 'Bạn đã nhập đúng Konami Code! Bạn là một gamer thực thụ!',
      icon: FaGamepad,
      reward: 'Mở khóa Rainbow Mode',
      rarity: 'legendary'
    },
    tripleClick: {
      id: 'tripleClick',
      title: '⚡ Speed Clicker',
      description: 'Click 3 lần nhanh như chớp! Bạn có phản xạ tuyệt vời!',
      icon: FaBolt,
      reward: 'Hiệu ứng sét đánh',
      rarity: 'rare'
    },
    secretSequence: {
      id: 'secretSequence',
      title: '🔮 Pattern Master',
      description: 'Bạn đã khám phá ra chuỗi click bí mật!',
      icon: FaMagic,
      reward: 'Sparkle effects',
      rarity: 'epic'
    },
    longHover: {
      id: 'longHover',
      title: '🕰️ Patience Guru',
      description: 'Hover 10 giây trên logo! Bạn thật kiên nhẫn!',
      icon: FaHeart,
      reward: 'Floating hearts',
      rarity: 'common'
    },
    nightOwl: {
      id: 'nightOwl',
      title: '🦉 Night Owl',
      description: 'Truy cập trang web lúc 3AM! Bạn là cú đêm thật sự!',
      icon: FaCrown,
      reward: 'Dark theme bonus',
      rarity: 'rare'
    },
    explorer: {
      id: 'explorer',
      title: '🗺️ Explorer',
      description: 'Đã ghé thăm tất cả các trang! Bạn là nhà thám hiểm!',
      icon: FaRocket,
      reward: 'Navigation boost',
      rarity: 'uncommon'
    },
    developer: {
      id: 'developer',
      title: '👨‍💻 Developer Mode',
      description: 'Mở Developer Tools! Bạn cũng là developer à?',
      icon: FaFire,
      reward: 'Console messages',
      rarity: 'epic'
    }
  };

  // Unlock Easter Egg
  const unlockEasterEgg = useCallback((eggId) => {
    if (discoveredEggs.has(eggId)) return;
    
    const egg = easterEggs[eggId];
    setDiscoveredEggs(prev => new Set([...prev, eggId]));
    setCurrentEgg(egg);
    setShowNotification(true);
    
    // Play success sound
    if (window.playUISound) {
      window.playUISound('success');
    }
    
    // Apply egg effects
    applyEggEffects(eggId);
    
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('easterEggs') || '[]');
    localStorage.setItem('easterEggs', JSON.stringify([...saved, eggId]));
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
      setCurrentEgg(null);
    }, 5000);
  }, [discoveredEggs]);

  // Apply Easter Egg Effects
  const applyEggEffects = (eggId) => {
    switch (eggId) {
      case 'konami':
        setIsRainbowMode(true);
        document.body.style.animation = 'rainbow-bg 2s infinite';
        setTimeout(() => {
          setIsRainbowMode(false);
          document.body.style.animation = '';
        }, 10000);
        break;
        
      case 'tripleClick':
        createLightningEffect();
        break;
        
      case 'secretSequence':
        startSparkleEffect();
        break;
        
      case 'longHover':
        createFloatingHearts();
        break;
        
      case 'developer':
        showConsoleMessage();
        break;
        
      default:
        break;
    }
  };

  // Create Lightning Effect
  const createLightningEffect = () => {
    const lightning = document.createElement('div');
    lightning.className = 'lightning-effect';
    lightning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent, rgba(255,255,0,0.3), transparent);
      pointer-events: none;
      z-index: 10000;
      animation: lightning 0.5s ease-out;
    `;
    
    document.body.appendChild(lightning);
    setTimeout(() => lightning.remove(), 500);
  };

  // Start Sparkle Effect
  const startSparkleEffect = () => {
    const interval = setInterval(() => {
      const sparkle = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 2000 + 1000
      };
      
      setSparkles(prev => [...prev, sparkle]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
      }, sparkle.duration);
    }, 200);
    
    sparkleIntervalRef.current = interval;
    setTimeout(() => {
      clearInterval(interval);
      setSparkles([]);
    }, 5000);
  };

  // Create Floating Hearts
  const createFloatingHearts = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
          position: fixed;
          left: ${Math.random() * window.innerWidth}px;
          top: ${window.innerHeight}px;
          font-size: ${Math.random() * 20 + 20}px;
          pointer-events: none;
          z-index: 10000;
          animation: floatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 200);
    }
  };

  // Show Console Message
  const showConsoleMessage = () => {
    console.log(`
    🎉 EASTER EGG UNLOCKED! 🎉
    ╔══════════════════════════════════════╗
    ║     Welcome, fellow developer!       ║
    ║                                      ║
    ║   Thân Thương's Portfolio v2.0       ║
    ║   Built with React + Framer Motion   ║
    ║   Designed with 💙 and lots of ☕    ║
    ║                                      ║
    ║   GitHub: github.com/thwng21         ║
    ║   Made with passion in Vietnam 🇻🇳   ║
    ╚══════════════════════════════════════╝
    `);
  };

  // Konami Code Handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === konamiCode[konamiIndex]) {
        setKonamiIndex(prev => prev + 1);
        if (konamiIndex + 1 === konamiCode.length) {
          unlockEasterEgg('konami');
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, unlockEasterEgg]);

  // Click Sequence Handler
  useEffect(() => {
    const handleClick = (event) => {
      const newSequence = [...clickSequence, Date.now()];
      setClickSequence(newSequence);
      
      // Clear old clicks (older than 2 seconds)
      const recentClicks = newSequence.filter(time => Date.now() - time < 2000);
      setClickSequence(recentClicks);
      
      // Check for triple click
      if (recentClicks.length >= 3) {
        const timeDiff = recentClicks[recentClicks.length - 1] - recentClicks[recentClicks.length - 3];
        if (timeDiff < 1000) {
          unlockEasterEgg('tripleClick');
          setClickSequence([]);
        }
      }
      
      // Check for secret pattern (Left-Right-Left-Right-Center)
      const clickPositions = recentClicks.map((_, index) => {
        const rect = document.body.getBoundingClientRect();
        return event.clientX < rect.width / 3 ? 'left' : 
               event.clientX > rect.width * 2/3 ? 'right' : 'center';
      });
      
      const pattern = clickPositions.slice(-5).join('-');
      if (pattern === 'left-right-left-right-center') {
        unlockEasterEgg('secretSequence');
        setClickSequence([]);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [clickSequence, unlockEasterEgg]);

  // Long Hover Handler
  useEffect(() => {
    const logo = document.querySelector('.logo, [class*="logo"]');
    if (!logo) return;

    let hoverTimeout;
    
    const handleMouseEnter = () => {
      hoverTimeout = setTimeout(() => {
        unlockEasterEgg('longHover');
      }, 10000);
    };
    
    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout);
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(hoverTimeout);
    };
  }, [unlockEasterEgg]);

  // Night Owl Checker
  useEffect(() => {
    const checkNightOwl = () => {
      const hour = new Date().getHours();
      if (hour === 3) {
        unlockEasterEgg('nightOwl');
      }
    };
    
    checkNightOwl();
    const interval = setInterval(checkNightOwl, 60000);
    return () => clearInterval(interval);
  }, [unlockEasterEgg]);

  // Developer Tools Detector
  useEffect(() => {
    const checkDevTools = () => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        unlockEasterEgg('developer');
      }
    };
    
    window.addEventListener('resize', checkDevTools);
    return () => window.removeEventListener('resize', checkDevTools);
  }, [unlockEasterEgg]);

  // Load saved Easter Eggs
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('easterEggs') || '[]');
    setDiscoveredEggs(new Set(saved));
  }, []);

  // CSS Animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow-bg {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
      
      @keyframes lightning {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
      
      @keyframes floatUp {
        0% { transform: translateY(0) scale(0); opacity: 1; }
        50% { transform: translateY(-50vh) scale(1); opacity: 1; }
        100% { transform: translateY(-100vh) scale(0); opacity: 0; }
      }
      
      @keyframes sparkle {
        0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      case 'uncommon': return 'from-green-400 to-emerald-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  return (
    <>
      {/* Easter Egg Notification */}
      <AnimatePresence>
        {showNotification && currentEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md"
          >
            <div className={`bg-gradient-to-r ${getRarityColor(currentEgg.rarity)} p-1 rounded-2xl shadow-2xl`}>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <currentEgg.icon className="text-2xl text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      🎉 Easter Egg Unlocked!
                    </h3>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      {currentEgg.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {currentEgg.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      🎁 {currentEgg.reward}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0], rotate: 360 }}
            exit={{ scale: 0 }}
            transition={{ duration: sparkle.duration / 1000 }}
            className="fixed pointer-events-none z-40"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              fontSize: sparkle.size
            }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Easter Egg Counter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 right-4 z-30 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20 dark:border-gray-700"
        title={`Đã khám phá ${discoveredEggs.size}/${Object.keys(easterEggs).length} Easter Eggs`}
      >
        <div className="flex items-center space-x-2 text-sm">
          <FaGift className="text-yellow-500" />
          <span className="text-gray-600 dark:text-gray-300">
            {discoveredEggs.size}/{Object.keys(easterEggs).length}
          </span>
        </div>
      </motion.div>

      {/* Secret Menu Button (appears after finding 3+ eggs) */}
      {discoveredEggs.size >= 3 && (
        <motion.button
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSecretMenu(!showSecretMenu)}
          className="fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg"
          title="Secret Menu"
        >
          <FaGem className="text-lg" />
        </motion.button>
      )}

      {/* Secret Menu */}
      <AnimatePresence>
        {showSecretMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-16 left-4 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 p-4 max-w-sm"
          >
            <h3 className="text-lg font-bold mb-4 text-center text-gray-800 dark:text-white">
              🏆 Easter Egg Collection
            </h3>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {Object.entries(easterEggs).map(([key, egg]) => (
                <div
                  key={key}
                  className={`flex items-center space-x-3 p-2 rounded-lg ${
                    discoveredEggs.has(key) 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-gray-100 dark:bg-gray-800/30'
                  }`}
                >
                  <egg.icon 
                    className={`text-lg ${
                      discoveredEggs.has(key) ? 'text-green-600' : 'text-gray-400'
                    }`} 
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      discoveredEggs.has(key) 
                        ? 'text-gray-800 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {discoveredEggs.has(key) ? egg.title : '???'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {discoveredEggs.has(key) ? egg.reward : 'Locked'}
                    </p>
                  </div>
                  {discoveredEggs.has(key) && (
                    <FaStar className="text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Khám phá thêm những bí mật ẩn giấu! 🕵️‍♂️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggSystem;