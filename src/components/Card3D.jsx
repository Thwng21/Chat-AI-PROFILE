import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Card3D = ({ 
  children, 
  className = '', 
  rotationIntensity = 15,
  glowIntensity = 0.5,
  scaleIntensity = 1.05,
  shadowIntensity = 30,
  perspective = 1000,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configurations for smooth motion
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse coordinates to rotation values
  const rotateX = useTransform(y, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]);

  // Transform for glow effect
  const glowX = useTransform(x, [-0.5, 0.5], [-glowIntensity * 100, glowIntensity * 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [-glowIntensity * 100, glowIntensity * 100]);

  // Handle mouse move
  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseXValue = (event.clientX - centerX) / (rect.width / 2);
    const mouseYValue = (event.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    // Play sound effect if available
    if (window.playUISound) {
      window.playUISound('hover');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{
        perspective: `${perspective}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: scaleIntensity,
        transition: { duration: 0.3 }
      }}
      {...props}
    >
      <motion.div
        className="relative w-full h-full transform-gpu"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main card content */}
        <motion.div
          className="relative w-full h-full overflow-hidden rounded-2xl"
          style={{
            transform: 'translateZ(0)',
          }}
        >
          {children}
          
          {/* Dynamic glow overlay */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, 
                rgba(45, 226, 230, 0.15) 0%, 
                rgba(0, 245, 212, 0.08) 25%, 
                transparent 50%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          
          {/* Reflective shine effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.1) 45%, 
                rgba(255, 255, 255, 0.2) 50%, 
                rgba(255, 255, 255, 0.1) 55%, 
                transparent 100%)`,
              transform: `translateX(${glowX * 2}%) translateY(${glowY * 2}%)`,
              opacity: isHovered ? 0.6 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </motion.div>
        
        {/* 3D depth layers */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
          style={{
            transform: 'translateZ(-10px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-black/5 to-transparent pointer-events-none"
          style={{
            transform: 'translateZ(-20px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>
      
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'transparent',
          filter: `drop-shadow(${shadowIntensity * (mouseX.get() || 0)}px ${shadowIntensity * (mouseY.get() || 0)}px ${shadowIntensity}px rgba(0,0,0,0.3))`,
          zIndex: -1,
        }}
      />
    </motion.div>
  );
};

// Enhanced card with built-in 3D content
const Enhanced3DCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  children,
  className = '',
  onClick,
  ...props 
}) => {
  return (
    <Card3D 
      className={`cursor-pointer group ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className={`relative h-full p-6 bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-sm`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )`
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon with 3D effect */}
          {Icon && (
            <motion.div
              className="mb-4"
              style={{
                transform: 'translateZ(20px)',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Icon className="text-2xl text-white drop-shadow-lg" />
              </div>
            </motion.div>
          )}
          
          {/* Title with depth */}
          {title && (
            <motion.h3
              className="text-xl font-bold text-white mb-2 drop-shadow-lg"
              style={{
                transform: 'translateZ(15px)',
              }}
            >
              {title}
            </motion.h3>
          )}
          
          {/* Description */}
          {description && (
            <motion.p
              className="text-white/80 text-sm leading-relaxed flex-1"
              style={{
                transform: 'translateZ(10px)',
              }}
            >
              {description}
            </motion.p>
          )}
          
          {/* Custom children content */}
          {children && (
            <motion.div
              style={{
                transform: 'translateZ(5px)',
              }}
            >
              {children}
            </motion.div>
          )}
          
          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              transform: 'translateZ(25px)',
            }}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements for extra depth */}
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0,
          }}
          style={{
            transform: 'translateZ(30px)',
          }}
        />
        
        <motion.div
          className="absolute top-6 right-6 w-0.5 h-0.5 bg-white/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
          style={{
            transform: 'translateZ(25px)',
          }}
        />
      </div>
    </Card3D>
  );
};

// Floating 3D element
const Floating3DElement = ({ children, intensity = 1, ...props }) => {
  return (
    <motion.div
      animate={{
        y: [-intensity * 10, intensity * 10, -intensity * 10],
        rotateY: [-intensity * 5, intensity * 5, -intensity * 5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { Card3D, Enhanced3DCard, Floating3DElement };