import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ParticleSystem = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);
  
  // Mobile-specific states
  const [isMobile, setIsMobile] = useState(false);
  const [deviceMotion, setDeviceMotion] = useState({ x: 0, y: 0, z: 0 });
  const [touchPoints, setTouchPoints] = useState([]);
  const [lastShake, setLastShake] = useState(0);
  const accelerometerRef = useRef({ x: 0, y: 0, z: 0 });

  // Particle class
  class Particle {
    constructor(canvas, x, y) {
      this.canvas = canvas;
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.life = 1;
      this.decay = Math.random() * 0.01 + 0.005;
      this.size = Math.random() * 3 + 1;
      this.color = this.getColor(theme);
      this.originalSize = this.size;
      this.mouseDistance = 0;
    }

    getColor(theme) {
      const colors = theme === 'dark' 
        ? [
            'rgba(45, 226, 230, ',
            'rgba(0, 245, 212, ',
            'rgba(106, 90, 205, ',
            'rgba(147, 51, 234, '
          ]
        : [
            'rgba(59, 130, 246, ',
            'rgba(16, 185, 129, ',
            'rgba(245, 101, 101, ',
            'rgba(251, 191, 36, '
          ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouse) {
      // Move particle
      this.x += this.vx;
      this.y += this.vy;

      // Calculate distance to mouse
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      this.mouseDistance = Math.sqrt(dx * dx + dy * dy);

      // Mouse interaction
      if (this.mouseDistance < 150) {
        const force = (150 - this.mouseDistance) / 150;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.02;
        this.vy -= Math.sin(angle) * force * 0.02;
        this.size = this.originalSize * (1 + force * 2);
      } else {
        this.size += (this.originalSize - this.size) * 0.1;
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      // Decay
      this.life -= this.decay;

      // Wrap around edges
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;

      return this.life > 0;
    }

    draw(ctx) {
      const alpha = this.life * (this.mouseDistance < 150 ? 0.8 : 0.3);
      
      // Glow effect
      ctx.shadowColor = this.color + '0.5)';
      ctx.shadowBlur = this.size * 2;
      
      // Main particle
      ctx.fillStyle = this.color + alpha + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    }
  }

  // Initialize canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(new Particle(canvas));
    }
  }, [theme]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas with fade effect
    ctx.fillStyle = theme === 'dark' 
      ? 'rgba(13, 17, 23, 0.05)' 
      : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const isAlive = particle.update(mouseRef.current);
      if (isAlive) {
        particle.draw(ctx);
      }
      return isAlive;
    });

    // Add new particles occasionally
    if (Math.random() < 0.02 && particlesRef.current.length < 100) {
      particlesRef.current.push(new Particle(canvas));
    }

    // Draw connections between nearby particles
    drawConnections(ctx);

    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, theme]);

  // Draw connections between particles
  const drawConnections = (ctx) => {
    const particles = particlesRef.current;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const alpha = (1 - distance / 120) * 0.1 * particles[i].life * particles[j].life;
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(45, 226, 230, ${alpha})`
            : `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY
    };

    // Add particle at mouse position occasionally
    if (Math.random() < 0.1) {
      const canvas = canvasRef.current;
      if (canvas) {
        particlesRef.current.push(new Particle(canvas, e.clientX, e.clientY));
      }
    }
  }, []);

  // Mouse click handler - burst effect
  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create burst of particles
    for (let i = 0; i < 10; i++) {
      const particle = new Particle(canvas, e.clientX, e.clientY);
      particle.vx = (Math.random() - 0.5) * 3;
      particle.vy = (Math.random() - 0.5) * 3;
      particle.size *= 1.5;
      particle.life = 1;
      particle.decay = 0.02;
      particlesRef.current.push(particle);
    }
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch Handlers for Mobile
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touches = Array.from(e.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    }));
    
    setTouchPoints(touches);
    
    // Multi-touch particle burst
    touches.forEach(touch => {
      for (let i = 0; i < 5; i++) {
        const particle = new Particle(canvas, touch.x, touch.y);
        particle.vx = (Math.random() - 0.5) * 4;
        particle.vy = (Math.random() - 0.5) * 4;
        particle.size *= 1.2;
        particlesRef.current.push(particle);
      }
    });
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
      
      // Create trail particles on touch move
      if (Math.random() < 0.3) {
        const particle = new Particle(canvas, mouseRef.current.x, mouseRef.current.y);
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        particle.size *= 0.8;
        particle.life = 0.8;
        particlesRef.current.push(particle);
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    setTouchPoints([]);
  }, []);

  // Device Motion Handler
  const handleDeviceMotion = useCallback((event) => {
    if (!event.accelerationIncludingGravity) return;
    
    const { x, y, z } = event.accelerationIncludingGravity;
    const currentTime = Date.now();
    
    // Detect shake
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    if (acceleration > 15 && currentTime - lastShake > 1000) {
      setLastShake(currentTime);
      
      // Shake effect - create explosion of particles
      const canvas = canvasRef.current;
      if (canvas) {
        for (let i = 0; i < 30; i++) {
          const particle = new Particle(canvas);
          particle.vx = (Math.random() - 0.5) * 8;
          particle.vy = (Math.random() - 0.5) * 8;
          particle.size *= 2;
          particle.life = 1;
          particlesRef.current.push(particle);
        }
      }
      
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
    
    // Smooth motion for particle gravity
    accelerometerRef.current.x = x * 0.1;
    accelerometerRef.current.y = y * 0.1;
    accelerometerRef.current.z = z * 0.1;
    
    setDeviceMotion({ x, y, z });
  }, [lastShake]);

  // Setup and cleanup
  useEffect(() => {
    initCanvas();
    animate();

    if (isMobile) {
      // Mobile touch events
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.pointerEvents = 'auto';
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
      }
      
      // Device motion for mobile effects
      if (window.DeviceMotionEvent) {
        // Request permission for iOS 13+
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
          DeviceMotionEvent.requestPermission().then(response => {
            if (response === 'granted') {
              window.addEventListener('devicemotion', handleDeviceMotion);
            }
          });
        } else {
          window.addEventListener('devicemotion', handleDeviceMotion);
        }
      }
      
      return () => {
        if (canvas) {
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
        window.removeEventListener('devicemotion', handleDeviceMotion);
      };
    } else {
      // Desktop mouse events
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      };
    }
  }, [isMobile, initCanvas, animate, handleMouseMove, handleClick, handleTouchStart, handleTouchMove, handleTouchEnd, handleDeviceMotion]);

  // Window resize handler
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Theme change effect
  useEffect(() => {
    particlesRef.current.forEach(particle => {
      particle.color = particle.getColor(theme);
    });
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ 
          background: 'transparent',
          mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
        }}
      />
      
      {/* Control button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsActive(!isActive)}
        className="fixed top-4 right-20 z-50 p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
        title={isActive ? 'Tắt hiệu ứng' : 'Bật hiệu ứng'}
      >
        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] shadow-lg shadow-cyan-500/50' 
            : 'bg-gray-400'
        }`} />
      </motion.button>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-4 left-4 z-40 p-3 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-700"
      >
        {isMobile ? (
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              📱 Chạm và kéo để tương tác với particles
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              🤳 Lắc điện thoại để tạo hiệu ứng đặc biệt
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              ✋ Multi-touch để tạo nhiều burst cùng lúc
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              💫 Di chuyển chuột để tương tác với particles
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              🎆 Click để tạo hiệu ứng burst
            </p>
          </div>
        )}
      </motion.div>

      {/* Mobile-specific controls */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4 }}
          className="fixed bottom-20 right-4 z-50"
        >
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              // Manual shake effect
              const canvas = canvasRef.current;
              if (canvas) {
                for (let i = 0; i < 15; i++) {
                  const particle = new Particle(canvas);
                  particle.vx = (Math.random() - 0.5) * 6;
                  particle.vy = (Math.random() - 0.5) * 6;
                  particle.size *= 1.5;
                  particlesRef.current.push(particle);
                }
              }
            }}
            className="p-3 bg-gradient-to-r from-[#2de2e6] to-[#00f5d4] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            title="Tạo hiệu ứng lắc"
          >
            <span className="text-lg">📳</span>
          </button>
        </motion.div>
      )}

      {/* Mobile motion indicator */}
      {isMobile && Math.abs(deviceMotion.x) + Math.abs(deviceMotion.y) + Math.abs(deviceMotion.z) > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
            <div className="text-2xl animate-pulse">🌊</div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ParticleSystem;