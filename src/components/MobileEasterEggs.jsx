import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMobileAlt, 
  FaHandPaper, 
  FaSync, 
  FaExpand,
  FaCompass,
  FaBolt,
  FaGem,
  FaRocket
} from 'react-icons/fa';

const MobileEasterEggs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [discoveredEggs, setDiscoveredEggs] = useState(new Set());
  const [currentEgg, setCurrentEgg] = useState(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const [multiTouchActive, setMultiTouchActive] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  
  const lastShakeRef = useRef(0);
  const accelerationRef = useRef({ x: 0, y: 0, z: 0 });
  const rotationRef = useRef(0);
  const touchPatternRef = useRef([]);

  // Mobile Easter Eggs Configuration
  const mobileEasterEggs = {
    shakemaster: {
      id: 'shakemaster',
      title: '🚀 Shake Master',
      description: 'Lắc điện thoại 10 lần liên tiếp! Bạn có cơ bắp khỏe!',
      icon: FaBolt,
      condition: () => shakeCount >= 10,
      reward: 'Unlock rocket boost effect',
      rarity: 'epic'
    },
    spinmaster: {
      id: 'spinmaster', 
      title: '🌀 Spin Master',
      description: 'Xoay điện thoại 360 độ 3 lần! Bạn làm tôi chóng mặt!',
      icon: FaSync,
      condition: () => rotationCount >= 3,
      reward: 'Unlock spin animations',
      rarity: 'rare'
    },
    multitouch: {
      id: 'multitouch',
      title: '✋ Multi-Touch Wizard', 
      description: 'Chạm 5 ngón tay cùng lúc! Bạn có nhiều ngón tay thật!',
      icon: FaHandPaper,
      condition: () => multiTouchActive,
      reward: 'Unlock hand gestures',
      rarity: 'uncommon'
    },
    compass: {
      id: 'compass',
      title: '🧭 Digital Compass',
      description: 'Xoay điện thoại theo 4 hướng Bắc-Nam-Đông-Tây!',
      icon: FaCompass,
      condition: () => checkCompassPattern(),
      reward: 'Unlock navigation mode',
      rarity: 'legendary'
    },
    secretknock: {
      id: 'secretknock',
      title: '🚪 Secret Knock',
      description: 'Tap theo nhịp: 3 nhanh - 3 chậm - 3 nhanh!',
      icon: FaGem,
      condition: () => checkKnockPattern(),
      reward: 'Unlock secret portal',
      rarity: 'epic'
    }
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 || 
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check compass pattern (NSEW)
  const checkCompassPattern = useCallback(() => {
    // Simplified compass check - return true for demo
    return Math.abs(deviceOrientation.alpha) > 300;
  }, [deviceOrientation]);

  // Check knock pattern (3-3-3 rhythm)
  const checkKnockPattern = useCallback(() => {
    if (touchPatternRef.current.length < 9) return false;
    
    const pattern = touchPatternRef.current.slice(-9);
    const intervals = [];
    
    for (let i = 1; i < pattern.length; i++) {
      intervals.push(pattern[i] - pattern[i-1]);
    }
    
    // Check for 3 quick - 3 slow - 3 quick pattern
    const quickTaps = intervals.slice(0, 2).every(i => i < 200);
    const slowTaps = intervals.slice(2, 4).every(i => i > 400 && i < 800);
    const quickTaps2 = intervals.slice(4, 6).every(i => i < 200);
    
    return quickTaps && slowTaps && quickTaps2;
  }, []);

  // Unlock Easter Egg
  const unlockEasterEgg = useCallback((eggId) => {
    if (discoveredEggs.has(eggId)) return;
    
    const egg = mobileEasterEggs[eggId];
    setDiscoveredEggs(prev => new Set([...prev, eggId]));
    setCurrentEgg(egg);
    
    // Haptic feedback for success
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
    
    // Apply egg effects
    applyMobileEggEffects(eggId);
    
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('mobileEasterEggs') || '[]');
    localStorage.setItem('mobileEasterEggs', JSON.stringify([...saved, eggId]));
    
    // Hide after 4 seconds
    setTimeout(() => {
      setCurrentEgg(null);
    }, 4000);
  }, [discoveredEggs]);

  // Apply Mobile Easter Egg Effects
  const applyMobileEggEffects = (eggId) => {
    switch (eggId) {
      case 'shakemaster':
        createRocketEffect();
        break;
      case 'spinmaster':
        createSpinEffect();
        break;
      case 'multitouch':
        createHandWaveEffect();
        break;
      case 'compass':
        createCompassEffect();
        break;
      case 'secretknock':
        createPortalEffect();
        break;
    }
  };

  // Rocket boost effect
  const createRocketEffect = () => {
    document.body.style.animation = 'rocket-boost 1s ease-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 1000);
  };

  // Spin effect
  const createSpinEffect = () => {
    document.body.style.animation = 'spin-effect 2s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 2000);
  };

  // Hand wave effect
  const createHandWaveEffect = () => {
    const hands = ['👋', '🖐️', '✋', '👐', '🙌'];
    hands.forEach((hand, index) => {
      setTimeout(() => {
        const element = document.createElement('div');
        element.innerHTML = hand;
        element.style.cssText = `
          position: fixed;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          font-size: 3rem;
          pointer-events: none;
          z-index: 10000;
          animation: fadeInOut 1s ease-out;
        `;
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 1000);
      }, index * 200);
    });
  };

  // Compass effect
  const createCompassEffect = () => {
    const compass = document.createElement('div');
    compass.innerHTML = '🧭';
    compass.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      pointer-events: none;
      z-index: 10000;
      animation: compass-spin 3s linear;
    `;
    document.body.appendChild(compass);
    setTimeout(() => compass.remove(), 3000);
  };

  // Portal effect
  const createPortalEffect = () => {
    const portal = document.createElement('div');
    portal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(circle, transparent 40%, #8B5CF6 70%, #06B6D4 100%);
      pointer-events: none;
      z-index: 10000;
      animation: portal-pulse 2s ease-out;
    `;
    document.body.appendChild(portal);
    setTimeout(() => portal.remove(), 2000);
  };

  // Device Motion Handler
  useEffect(() => {
    if (!isMobile) return;

    const handleDeviceMotion = (event) => {
      if (!event.accelerationIncludingGravity) return;
      
      const { x, y, z } = event.accelerationIncludingGravity;
      const currentTime = Date.now();
      
      // Detect shake
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 15 && currentTime - lastShakeRef.current > 500) {
        lastShakeRef.current = currentTime;
        setShakeCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 10) {
            unlockEasterEgg('shakemaster');
            return 0; // Reset counter
          }
          return newCount;
        });
        
        // Reset shake count after 5 seconds of no shaking
        setTimeout(() => {
          setShakeCount(prev => prev > 0 ? prev - 1 : 0);
        }, 5000);
      }
    };

    const handleDeviceOrientation = (event) => {
      const { alpha, beta, gamma } = event;
      setDeviceOrientation({ alpha: alpha || 0, beta: beta || 0, gamma: gamma || 0 });
      
      // Track rotation for spin detection
      if (alpha !== null) {
        const deltaRotation = Math.abs(alpha - rotationRef.current);
        if (deltaRotation > 350 || deltaRotation < 10) { // Full rotation
          setRotationCount(prev => {
            const newCount = prev + 1;
            if (newCount >= 3) {
              unlockEasterEgg('spinmaster');
              return 0;
            }
            return newCount;
          });
        }
        rotationRef.current = alpha;
      }
    };

    // Request permissions for iOS
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', handleDeviceMotion);
        }
      });
    } else {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [isMobile, unlockEasterEgg]);

  // Touch pattern detection
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (event) => {
      const touches = event.touches;
      
      // Multi-touch detection (5 fingers)
      if (touches.length >= 5) {
        setMultiTouchActive(true);
        unlockEasterEgg('multitouch');
        setTimeout(() => setMultiTouchActive(false), 1000);
      }
      
      // Single touch for knock pattern
      if (touches.length === 1) {
        touchPatternRef.current.push(Date.now());
        // Keep only last 20 touches
        if (touchPatternRef.current.length > 20) {
          touchPatternRef.current = touchPatternRef.current.slice(-20);
        }
        
        // Check for knock pattern
        if (checkKnockPattern()) {
          unlockEasterEgg('secretknock');
          touchPatternRef.current = []; // Reset pattern
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [isMobile, checkKnockPattern, unlockEasterEgg]);

  // Load saved Easter Eggs
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mobileEasterEggs') || '[]');
    setDiscoveredEggs(new Set(saved));
  }, []);

  // CSS Animations
  useEffect(() => {
    if (!isMobile) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes rocket-boost {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.05); }
        100% { transform: translateY(0) scale(1); }
      }
      
      @keyframes spin-effect {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(1080deg); }
      }
      
      @keyframes compass-spin {
        0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); opacity: 0; }
      }
      
      @keyframes portal-pulse {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
      }
      
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, [isMobile]);

  if (!isMobile) return null;

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
      {/* Mobile Easter Egg Notification */}
      <AnimatePresence>
        {currentEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-sm"
          >
            <div className={`bg-gradient-to-r ${getRarityColor(currentEgg.rarity)} p-1 rounded-2xl shadow-2xl`}>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <currentEgg.icon className="text-3xl text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      📱 Mobile Easter Egg!
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

      {/* Mobile Progress Indicators */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-20 left-4 z-40 space-y-2"
      >
        {/* Shake Counter */}
        {shakeCount > 0 && (
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
            <div className="flex items-center space-x-2 text-xs">
              <FaBolt className="text-yellow-500" />
              <span className="text-gray-600 dark:text-gray-300">
                Shakes: {shakeCount}/10
              </span>
            </div>
          </div>
        )}
        
        {/* Rotation Counter */}
        {rotationCount > 0 && (
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
            <div className="flex items-center space-x-2 text-xs">
              <FaSync className="text-blue-500" />
              <span className="text-gray-600 dark:text-gray-300">
                Spins: {rotationCount}/3
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Mobile Easter Egg Counter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-20 right-4 z-30 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-2 shadow-lg"
        title={`Mobile Easter Eggs: ${discoveredEggs.size}/${Object.keys(mobileEasterEggs).length}`}
      >
        <div className="flex items-center space-x-2 text-sm text-white">
          <FaMobileAlt />
          <span>{discoveredEggs.size}/{Object.keys(mobileEasterEggs).length}</span>
        </div>
      </motion.div>

      {/* Compass Indicator */}
      {Math.abs(deviceOrientation.alpha) > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40"
          style={{ transform: `translateY(-50%) rotate(${deviceOrientation.alpha}deg)` }}
        >
          <FaCompass className="text-2xl text-blue-500" />
        </motion.div>
      )}
    </>
  );
};

export default MobileEasterEggs;