import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileTouchSystem = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchEffects, setTouchEffects] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [pinchScale, setPinchScale] = useState(1);
  const [longPressActive, setLongPressActive] = useState(false);
  
  const touchStartRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const lastTouchRef = useRef({ x: 0, y: 0, time: 0 });

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

  // Create touch effect
  const createTouchEffect = useCallback((x, y, type = 'tap') => {
    const id = Math.random().toString(36).substr(2, 9);
    const effect = {
      id,
      x,
      y,
      type,
      timestamp: Date.now()
    };
    
    setTouchEffects(prev => [...prev, effect]);
    
    // Auto remove after animation
    setTimeout(() => {
      setTouchEffects(prev => prev.filter(e => e.id !== id));
    }, 1000);
    
    // Haptic feedback
    if (navigator.vibrate) {
      const vibrationPatterns = {
        tap: [10],
        swipe: [20, 10, 20],
        longpress: [50],
        pinch: [30, 20, 30]
      };
      navigator.vibrate(vibrationPatterns[type] || [10]);
    }
  }, []);

  // Touch start handler
  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    
    // Start long press timer
    longPressTimerRef.current = setTimeout(() => {
      setLongPressActive(true);
      createTouchEffect(touch.clientX, touch.clientY, 'longpress');
    }, 500);
    
    // Multi-touch detection for pinch
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchStartRef.current.pinchDistance = distance;
    }
  }, [isMobile, createTouchEffect]);

  // Touch move handler
  const handleTouchMove = useCallback((e) => {
    if (!isMobile || !touchStartRef.current) return;
    
    // Clear long press if moved
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    const touch = e.touches[0];
    if (!touch) return;
    
    // Handle pinch gesture
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      if (touchStartRef.current.pinchDistance) {
        const scale = distance / touchStartRef.current.pinchDistance;
        setPinchScale(scale);
        
        if (Math.abs(scale - 1) > 0.1) {
          createTouchEffect(
            (touch1.clientX + touch2.clientX) / 2,
            (touch1.clientY + touch2.clientY) / 2,
            'pinch'
          );
        }
      }
    }
  }, [isMobile, createTouchEffect]);

  // Touch end handler
  const handleTouchEnd = useCallback((e) => {
    if (!isMobile || !touchStartRef.current) return;
    
    // Clear timers
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    setLongPressActive(false);
    setPinchScale(1);
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    const distance = Math.hypot(deltaX, deltaY);
    
    // Detect tap
    if (distance < 10 && deltaTime < 300) {
      createTouchEffect(touch.clientX, touch.clientY, 'tap');
    }
    
    // Detect swipe
    else if (distance > 50 && deltaTime < 500) {
      let direction = '';
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }
      
      setSwipeDirection(direction);
      createTouchEffect(touch.clientX, touch.clientY, 'swipe');
      
      // Clear swipe direction after animation
      setTimeout(() => setSwipeDirection(null), 500);
    }
    
    touchStartRef.current = null;
  }, [isMobile, createTouchEffect]);

  // Setup touch events
  useEffect(() => {
    if (!isMobile) return;
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Touch effect components
  const TouchEffect = ({ effect }) => {
    const getEffectConfig = () => {
      switch (effect.type) {
        case 'tap':
          return {
            initial: { scale: 0, opacity: 1 },
            animate: { scale: 2, opacity: 0 },
            className: 'w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400'
          };
        case 'swipe':
          return {
            initial: { scale: 0, opacity: 1, rotate: 0 },
            animate: { scale: 1.5, opacity: 0, rotate: 360 },
            className: 'w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400'
          };
        case 'longpress':
          return {
            initial: { scale: 0, opacity: 1 },
            animate: { scale: 3, opacity: 0 },
            className: 'w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400'
          };
        case 'pinch':
          return {
            initial: { scale: 0, opacity: 1 },
            animate: { scale: 2, opacity: 0 },
            className: 'w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400'
          };
        default:
          return {
            initial: { scale: 0, opacity: 1 },
            animate: { scale: 1, opacity: 0 },
            className: 'w-6 h-6 rounded-full bg-gray-400'
          };
      }
    };
    
    const config = getEffectConfig();
    
    return (
      <motion.div
        key={effect.id}
        initial={config.initial}
        animate={config.animate}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed pointer-events-none z-50 ${config.className}`}
        style={{
          left: effect.x - (config.className.includes('w-20') ? 40 : config.className.includes('w-16') ? 32 : config.className.includes('w-12') ? 24 : 16),
          top: effect.y - (config.className.includes('w-20') ? 40 : config.className.includes('w-16') ? 32 : config.className.includes('w-12') ? 24 : 16),
        }}
      />
    );
  };

  return (
    <div className={`relative ${longPressActive ? 'animate-pulse' : ''}`}>
      {/* Touch Effects */}
      <AnimatePresence>
        {touchEffects.map(effect => (
          <TouchEffect key={effect.id} effect={effect} />
        ))}
      </AnimatePresence>
      
      {/* Swipe Direction Indicator */}
      <AnimatePresence>
        {swipeDirection && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
              <div className="text-4xl">
                {swipeDirection === 'up' && '⬆️'}
                {swipeDirection === 'down' && '⬇️'}
                {swipeDirection === 'left' && '⬅️'}
                {swipeDirection === 'right' && '➡️'}
              </div>
              <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-300">
                Swipe {swipeDirection}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pinch Scale Indicator */}
      {isMobile && Math.abs(pinchScale - 1) > 0.05 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-lg">🤏</span>
              <span className="text-gray-600 dark:text-gray-300">
                {pinchScale > 1 ? 'Zoom In' : 'Zoom Out'} {Math.round(pinchScale * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Mobile Touch Guide */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-4 right-4 z-40 max-w-xs"
        >
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📱 Mobile Touch Guide
            </h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <p>👆 Tap: Tạo hiệu ứng</p>
              <p>👈 Swipe: Di chuyển nhanh</p>
              <p>👇 Long press: Giữ 0.5s</p>
              <p>🤏 Pinch: Zoom với 2 ngón</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {children}
    </div>
  );
};

export default MobileTouchSystem;