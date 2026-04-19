import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, MessageCircle, UserPlus, Plus  } from 'lucide-react';
import marsMetland from '@/assets/mars-metland.mp3';

const ButtonCorner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Semi-Circle button
  const radius = 90;
  const menuItems = [
    { id: 'music', icon: isPlaying ? <Pause size={20} /> : <Play size={20} />, color: isPlaying ? 'bg-teal-500' : 'bg-red-500', action: 'music' },
    { id: 'wa', icon: <MessageCircle size={20} />, color: 'bg-green-500', action: 'wa' },
    { id: 'ppdb', icon: <UserPlus size={20} />, color: 'bg-amber-500', action: 'ppdb' },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      isPlaying ? audio.play().catch(() => {}) : audio.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-10 right-10 z-[9999] flex items-center justify-center">
      <audio id='mars-metland-audio' ref={audioRef} src={marsMetland} loop />

      {/* bloom effect */}
      <AnimatePresence>
        {isOpen && menuItems.map((item, index) => {
          // corner calculation: spread from 180 degrees (left) to 270 degrees (up)
          // for full circle, divide 360 by the number of items
          const angle = 180 + (index * 45);
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <motion.button
              key={item.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ x, y, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
              onClick={() => {
                if (item.action === 'music') setIsPlaying(!isPlaying);
                if (item.action === 'wa') window.open('https://wa.me/628xxx', '_blank');
                if (item.action === 'ppdb') window.location.href = '/ppdb';
              }}
              className={`absolute flex items-center justify-center w-12 h-12 rounded-full shadow-xl text-white ${item.color} hover:scale-110 active:scale-90`}
            >
              {item.icon}
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl text-white bg-primary transition-colors overflow-hidden"
        style={{ backgroundColor: 'hsl(var(--primary))' }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus size={30} />
        </motion.div>
        
        {/* Wave Effect */}
        {isPlaying && (
            <motion.span 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-white/30"
            />
        )}
      </motion.button>
    </div>
  );
};

export default ButtonCorner;