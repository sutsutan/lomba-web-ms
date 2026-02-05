import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import heroBg from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-bg-2.jpg';
import heroBg3 from '@/assets/hero-bg-3.jpg';
import heroBg4 from '@/assets/hero-bg-4.jpg';
import metland from '@/assets/metland.png';

const heroImages = [
  { src: heroBg, alt: 'Students learning together' },
  { src: heroBg2, alt: 'Vocational training' },
  { src: heroBg3, alt: 'Practical learning' },
  { src: heroBg4, alt: 'Student activities' },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isAnimatingIntro, setIsAnimatingIntro] = useState(() => {
    return !sessionStorage.getItem('introShown');
  });

  useEffect(() => {
    if (isAnimatingIntro) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAnimatingIntro]);

  useEffect(() => {
    if (isAnimatingIntro) {
      document.body.style.overflow = 'hidden';
      
      const timeout = setTimeout(() => {
        setIsAnimatingIntro(false);
        document.body.style.overflow = 'auto';
        
        sessionStorage.setItem('introShown', 'true');
      }, 2500);

      return () => {
        document.body.style.overflow = 'auto';
        clearTimeout(timeout);
      };
    } else {
    //  scroll aktif
      document.body.style.overflow = 'auto';
    }
  }, [isAnimatingIntro]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-black">
      {/*INTRO OVERLAY - render sekali doang */}
      <AnimatePresence>
        {isAnimatingIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
            className="absolute inset-0 z-[100] bg-teal-900 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center"
            >
              <img src={metland} alt="Metland Logo" className="w-24 h-24 mx-auto mb-4" />
              <h2 className="text-3xl font-bold tracking-widest uppercase mb-2">Metland School</h2>
              <div className="w-12 h-[2px] bg-white mx-auto overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-full h-full bg-teal-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: isAnimatingIntro ? 1.1 : 1 }} // Hindari zoom berlebih jika bukan intro pertama
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            {/* Label */}
            <motion.div
              initial={isAnimatingIntro ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: isAnimatingIntro ? 0.2 : 0 }}
            >
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-teal-500/20 backdrop-blur-md rounded-full text-teal-300 text-[10px] md:text-xs lg:text-sm font-bold mb-4 md:mb-6 border border-teal-500/30 tracking-wider uppercase">
                SMK Metland School — Vocational Excellence
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={isAnimatingIntro ? { y: '100%' } : { y: 0 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: isAnimatingIntro ? 0.4 : 0, ease: [0.33, 1, 0.68, 1] }}
                className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[0.9]"
              >
                From School <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                  to Career
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={isAnimatingIntro ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: isAnimatingIntro ? 0.6 : 0 }}
              className="text-sm md:text-lg lg:text-1xl text-slate-300 mb-10 max-w-xl leading-relaxed"
            >
              We prepare students with industry-ready skills, character development,
              and real-world experience for successful careers.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={isAnimatingIntro ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: isAnimatingIntro ? 0.8 : 0 }}
            >
              <Link 
                to="/about" 
                className="text-sm md:text-base group relative inline-flex items-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/25"
              >
                Learn More
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
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

      {/* Scroll Indicator */}
      <AnimatePresence>
        {!isAnimatingIntro && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 right-12 z-30 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
              Scroll to explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-teal-500 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;