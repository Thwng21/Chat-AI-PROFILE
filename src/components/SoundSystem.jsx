import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute, FaMusic, FaCog } from 'react-icons/fa';

const SoundSystem = ({ darkMode }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showSettings, setShowSettings] = useState(false);
  
  // Audio contexts and nodes
  const audioContextRef = useRef(null);
  const backgroundMusicRef = useRef(null);
  const soundEffectsRef = useRef({});
  
  // Background music configuration
  const backgroundTracks = {
    ambient: {
      name: "Ambient Space",
      frequencies: [220, 330, 440, 660], // Soft ambient tones
      type: 'ambient'
    },
    focus: {
      name: "Focus Mode",
      frequencies: [174, 285, 396, 528], // Healing frequencies
      type: 'binaural'
    },
    creative: {
      name: "Creative Flow",
      frequencies: [639, 741, 852, 963], // Creativity frequencies
      type: 'harmonic'
    }
  };
  
  const [currentTrack, setCurrentTrack] = useState('ambient');

  // Initialize Web Audio API
  const initializeAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Generate procedural background music
  const createBackgroundMusic = useCallback((trackConfig) => {
    const audioContext = initializeAudio();
    if (!audioContext) return null;

    const mainGain = audioContext.createGain();
    mainGain.connect(audioContext.destination);
    mainGain.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);

    const oscillators = [];
    const gains = [];

    trackConfig.frequencies.forEach((freq, index) => {
      // Create oscillator for each frequency
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      // Configure oscillator
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = trackConfig.type === 'ambient' ? 'sine' : 
                        trackConfig.type === 'binaural' ? 'triangle' : 'sawtooth';
      
      // Configure filter for warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 2, audioContext.currentTime);
      filter.Q.setValueAtTime(0.5, audioContext.currentTime);
      
      // Configure gain with subtle modulation
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.015 / trackConfig.frequencies.length, audioContext.currentTime + 2);
      
      // Create LFO for subtle modulation
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.frequency.setValueAtTime(0.1 + (index * 0.05), audioContext.currentTime);
      lfo.type = 'sine';
      lfoGain.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      // Connect nodes
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(mainGain);
      
      // Start oscillators
      oscillator.start(audioContext.currentTime);
      lfo.start(audioContext.currentTime);
      
      oscillators.push(oscillator);
      gains.push(gain);
    });

    return {
      oscillators,
      gains,
      mainGain,
      stop: () => {
        oscillators.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });
      }
    };
  }, [initializeAudio, volume]);

  // Sound effects generator
  const createSoundEffect = useCallback((type, options = {}) => {
    const audioContext = initializeAudio();
    if (!audioContext || isMuted) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    switch (type) {
      case 'hover':
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        oscillator.type = 'sine';
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume * 0.1, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        filter.frequency.setValueAtTime(2000, now);
        break;
        
      case 'click':
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        oscillator.type = 'square';
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume * 0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        break;
        
      case 'success':
        // Create chord progression
        [523, 659, 784].forEach((freq, i) => {
          const chordOsc = audioContext.createOscillator();
          const chordGain = audioContext.createGain();
          chordOsc.connect(chordGain);
          chordGain.connect(audioContext.destination);
          
          chordOsc.frequency.setValueAtTime(freq, now + i * 0.1);
          chordOsc.type = 'sine';
          chordGain.gain.setValueAtTime(0, now + i * 0.1);
          chordGain.gain.linearRampToValueAtTime(volume * 0.15, now + i * 0.1 + 0.05);
          chordGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
          
          chordOsc.start(now + i * 0.1);
          chordOsc.stop(now + i * 0.1 + 0.5);
        });
        return;
        
      case 'notification':
        oscillator.frequency.setValueAtTime(880, now);
        oscillator.frequency.setValueAtTime(1108, now + 0.1);
        oscillator.frequency.setValueAtTime(880, now + 0.2);
        oscillator.type = 'sine';
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume * 0.12, now + 0.05);
        gain.gain.setValueAtTime(volume * 0.12, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        break;
        
      case 'particle':
        oscillator.frequency.setValueAtTime(
          300 + Math.random() * 800, 
          now
        );
        oscillator.type = 'sine';
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume * 0.05, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        break;
        
      default:
        return;
    }
    
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  }, [initializeAudio, isMuted, volume]);

  // Start/stop background music
  const toggleBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop();
      backgroundMusicRef.current = null;
    }
    
    if (isEnabled && !isMuted) {
      backgroundMusicRef.current = createBackgroundMusic(backgroundTracks[currentTrack]);
    }
  }, [isEnabled, isMuted, currentTrack, createBackgroundMusic]);

  // Global sound effect trigger
  const playSound = useCallback((type, options = {}) => {
    if (isEnabled) {
      createSoundEffect(type, options);
    }
  }, [isEnabled, createSoundEffect]);

  // Auto-attach sound effects to interactive elements
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseover = (e) => {
      if (e.target.matches('button, a, [role="button"], .sound-hover')) {
        playSound('hover');
      }
    };

    const handleClick = (e) => {
      if (e.target.matches('button, a, [role="button"], .sound-click')) {
        playSound('click');
      }
    };

    const handleParticleInteraction = () => {
      if (Math.random() < 0.1) { // 10% chance
        playSound('particle');
      }
    };

    document.addEventListener('mouseover', handleMouseover);
    document.addEventListener('click', handleClick);
    document.addEventListener('particle-interaction', handleParticleInteraction);

    return () => {
      document.removeEventListener('mouseover', handleMouseover);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('particle-interaction', handleParticleInteraction);
    };
  }, [isEnabled, playSound]);

  // Update background music when settings change
  useEffect(() => {
    if (isEnabled) {
      toggleBackgroundMusic();
    }
  }, [isEnabled, isMuted, currentTrack, volume, toggleBackgroundMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Expose global sound function
  useEffect(() => {
    window.playUISound = playSound;
    return () => {
      delete window.playUISound;
    };
  }, [playSound]);

  return (
    <>
      {/* Main Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        className="fixed top-4 right-32 z-50 flex items-center space-x-2"
      >
        {/* Power Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsEnabled(!isEnabled);
            if (!isEnabled) {
              playSound('success');
            }
          }}
          className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            isEnabled 
              ? 'bg-green-500/20 border-green-400 text-green-400' 
              : 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-gray-700 text-gray-400'
          }`}
          title={isEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
        >
          <FaMusic className="text-sm" />
        </motion.button>
        
        {/* Mute Button */}
        {isEnabled && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isMuted 
                ? 'bg-red-500/20 border-red-400 text-red-400' 
                : 'bg-blue-500/20 border-blue-400 text-blue-400'
            }`}
            title={isMuted ? 'Bỏ tắt tiếng' : 'Tắt tiếng'}
          >
            {isMuted ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
          </motion.button>
        )}
        
        {/* Settings Button */}
        {isEnabled && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
            title="Cài đặt âm thanh"
          >
            <FaCog className="text-sm" />
          </motion.button>
        )}
      </motion.div>

      {/* Settings Panel */}
      {showSettings && isEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 right-32 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 p-4 w-64"
        >
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
            🎵 Cài Đặt Âm Thanh
          </h3>
          
          {/* Volume Control */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Âm lượng: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Track Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Nhạc nền
            </label>
            <select
              value={currentTrack}
              onChange={(e) => setCurrentTrack(e.target.value)}
              className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
            >
              {Object.entries(backgroundTracks).map(([key, track]) => (
                <option key={key} value={key}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Test Sounds */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Thử âm thanh
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => playSound('hover')}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
              >
                Hover
              </button>
              <button
                onClick={() => playSound('click')}
                className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded"
              >
                Click
              </button>
              <button
                onClick={() => playSound('success')}
                className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded"
              >
                Success
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Indicator */}
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-30 text-xs text-gray-500 dark:text-gray-400"
        >
          🎵 {backgroundTracks[currentTrack].name} {isMuted ? '(Muted)' : ''}
        </motion.div>
      )}
    </>
  );
};

export default SoundSystem;