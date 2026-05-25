import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, MessageCircle, UserPlus, Plus } from 'lucide-react';
import marsMetland from '@/assets/mars-metland.mp3';

const ButtonCorner: React.FC = () => {
  // 1. State utama: apakah user mengizinkan musik menyala secara umum?
  const [isUserEnabled, setIsUserEnabled] = useState<boolean>(true);
  
  // 2. State interupsi: apakah ada video yang sedang mem-pause musik kita?
  const [isInterrupted, setIsInterrupted] = useState<boolean>(false);
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Listen ke event dari video testimonial
  useEffect(() => {
    const handleSync = (e: any) => {
      const shouldMusicPlay = e.detail;
      // Jika shouldMusicPlay = false, artinya video sedang main, maka kita set interrupted = true
      setIsInterrupted(!shouldMusicPlay);
    };

    window.addEventListener('sync-metland-music', handleSync);
    return () => window.removeEventListener('sync-metland-music', handleSync);
  }, []);

  // Logika Play/Pause yang sebenarnya
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    // Musik HANYA berbunyi jika: User mengizinkan DAN tidak sedang diinterupsi video
    if (isUserEnabled && !isInterrupted) {
      audio.play().catch(() => {
        console.log("Autoplay dicegah browser");
        setIsUserEnabled(false);
      });
    } else {
      audio.pause();
    }
  }, [isUserEnabled, isInterrupted]);

  // Handler klik tombol music
  const toggleMusic = () => {
    setIsUserEnabled(!isUserEnabled);
  };

  const radius = 90;
  const menuItems = [
    { 
      id: 'music', 
      icon: isUserEnabled ? <Pause size={20} /> : <Play size={20} />, 
      color: isUserEnabled ? 'bg-teal-500' : 'bg-red-500', 
      action: 'music' 
    },
    { id: 'wa', icon: <MessageCircle size={20} />, color: 'bg-green-500', action: 'wa' },
    { id: 'ppdb', icon: <UserPlus size={20} />, color: 'bg-amber-500', action: 'ppdb' },
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[9999] flex items-center justify-center">
      <audio id='mars-metland-audio' ref={audioRef} src={marsMetland} loop />

      <AnimatePresence>
        {isOpen && menuItems.map((item, index) => {
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
                if (item.action === 'music') toggleMusic();
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
        
        {/* Wave effect hanya muncul jika user mengaktifkan musik DAN tidak sedang diinterupsi */}
        {isUserEnabled && !isInterrupted && (
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