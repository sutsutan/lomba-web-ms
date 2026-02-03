import React, { useState, useRef, useEffect } from 'react';
import marsMetland from '@/assets/mars-metland.mp3';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    if (isPlaying) {
      audio.play().catch(() => {
        console.log("Menunggu interaksi user untuk memulai audio...");
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.play().catch(err => console.log("Playback failed:", err));
      }
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      <audio ref={audioRef} src={marsMetland} loop />

      <button
        onClick={toggleMusic}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isPlaying ? 'bg-teal-500' : 'bg-red-500'
        }`}
      >
        {isPlaying ? (
          // Mute
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          // Play
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;