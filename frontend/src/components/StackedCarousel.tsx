import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import extracurricularFutsal from '@/assets/extracurricular-futsal.webp';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularModelling from '@/assets/extracurricular-modelling.webp';
import extracurricularBadminton from '@/assets/extracurricular-badminton.jpg';

const images = [
  extracurricularFutsal,
  extracurricularBasket,
  extracurricularModelling,
  extracurricularBadminton,
];

const StackedCarousel: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const getSlideStyles = (index: number) => {
    const total = images.length;
    let diff = index - activeImageIndex;
    
    // Handle loop diff
    if (diff > total / 2) diff -= total;
    if (diff <= -total / 2) diff += total;

    const isActive = diff === 0;
    // Jarak antar slide (spacing)
    const spacing = windowWidth < 640 ? 50 : windowWidth < 1024 ? 80 : 110;

    return {
      x: diff * spacing,
      zIndex: total - Math.abs(diff),
      scale: isActive ? 1 : 0.85,
      opacity: Math.abs(diff) > 1 ? 0 : 1,
      filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
    };
  };

  return (
    <div className="relative w-full py-12 flex flex-col items-center overflow-visible">
      {/* Diamond Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 md:-translate-y-4 z-20 flex flex-col items-center">
        <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-[3px] border-[#12606A] rotate-45 bg-background" />
        <div className="w-[2px] h-3 md:h-4 bg-[#12606A]" />
      </div>

      <div className="relative w-full flex justify-center items-center h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-visible">
        {images.map((image, index) => {
          const style = getSlideStyles(index);
          return (
            <motion.div
              key={index}
              className="absolute overflow-hidden shadow-2xl rounded-2xl cursor-pointer bg-white"
              style={{
                width: windowWidth < 640 ? '160px' : windowWidth < 1024 ? '220px' : '280px',
                height: '100%',
              }}
              animate={{
                x: style.x,
                zIndex: style.zIndex,
                scale: style.scale,
                opacity: style.opacity,
                filter: style.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 1,
              }}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`Extracurricular ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          type="button"
          className="absolute left-0 lg:-left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 border-2 border-[#12606A] rotate-45 flex items-center justify-center hover:bg-[#12606A] hover:text-white transition-all group"
        >
          <ChevronLeft className="-rotate-45 w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          type="button"
          className="absolute right-0 lg:-right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 border-2 border-[#12606A] rotate-45 flex items-center justify-center hover:bg-[#12606A] hover:text-white transition-all group"
        >
          <ChevronRight className="-rotate-45 w-6 h-6" />
        </button>
      </div>

      {/* Background Shadow */}
      <div className="w-32 h-4 bg-black/10 blur-2xl rounded-full mt-8"></div>
    </div>
  );
};

export default StackedCarousel;