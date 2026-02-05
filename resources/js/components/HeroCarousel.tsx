import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-bg-2.jpg';
import heroBg3 from '@/assets/hero-bg-3.jpg';
import heroBg4 from '@/assets/hero-bg-4.jpg';

const heroImages = [
  { src: heroBg, alt: 'Students learning together' },
  { src: heroBg2, alt: 'Vocational training' },
  { src: heroBg3, alt: 'Practical learning' },
  { src: heroBg4, alt: 'Student activities' },
];

interface HeroCarouselProps {
  title: string;
  subtitle?: string;
  description?: string;
  height?: string;
}

const HeroCarousel = ({ title, subtitle, description, height = 'min-h-screen' }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide].src}
            alt={heroImages[currentSlide].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-black/20 z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center">
          {subtitle && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20"
            >
              {subtitle}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

     {/* CAROUSEL DOTS */}
      <div className="absolute bottom-10 left-12 z-30 hidden md:block">
        <div className="flex items-center gap-4">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
            >
              <div className="text-[10px] text-white/40 mb-2 font-bold group-hover:text-white transition-colors">
                0{index + 1}
              </div>
              <div className={`h-[3px] transition-all duration-500 rounded-full ${
                index === currentSlide ? 'w-12 bg-teal-400' : 'w-6 bg-white/20 group-hover:bg-white/40'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
