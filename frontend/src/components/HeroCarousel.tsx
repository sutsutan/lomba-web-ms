//HeroCarousel.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPublicHero, HeroData } from '@/services/Hero'; 

interface HeroCarouselProps {
  category?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  height?: string;
  lang?: 'id' | 'en';
}

const HeroCarousel = ({ 
  category = 'home',
  title: staticTitle,
  subtitle: staticSubtitle,
  description: staticDescription, 
  height = 'min-h-screen',
  lang = 'id'
}: HeroCarouselProps) => {
  
  const [heroSlides, setHeroSlides] = useState<HeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicHero().then((data) => {
      const filteredData = data
        .filter((item) => item.category === category && item.is_active)
        .sort((a, b) => a.order - b.order);
      
      setHeroSlides(filteredData);
      setLoading(false);
    });
  }, [category]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return <div className={`${height} bg-slate-900 flex items-center justify-center text-teal-400 font-medium`}>Memuat halaman...</div>;
  }

  const activeSlide = heroSlides[currentSlide];

  // Logic untuk menampilkan konten berdasarkan lang
  const displayTitle = staticTitle || (activeSlide 
    ? (lang === 'en' ? (activeSlide.title_en || activeSlide.title_id) : activeSlide.title_id) 
    : 'SMK Nusantara Jaya');

  const displaySubtitle = staticSubtitle || (activeSlide 
    ? (lang === 'en' ? (activeSlide.subtitle_en || activeSlide.subtitle_id) : activeSlide.subtitle_id) 
    : '');

  // Logika pengambilan deskripsi dari API atau prop statis
  const displayDescription = staticDescription || (activeSlide 
    ? (lang === 'en' ? (activeSlide.description_en || activeSlide.description_id) : activeSlide.description_id) 
    : '');

  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 z-0 bg-slate-950">
        {heroSlides.length > 0 && activeSlide ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={activeSlide.image_url}
              alt={displayTitle || "Hero Image"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/1920x1080/0f172a/fff?text=Gambar+Sekolah';
              }}
            />
          </AnimatePresence>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0F5F58] to-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-black/20 z-[1]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {displaySubtitle && (
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20"
              >
                {displaySubtitle}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {displayTitle}
            </motion.h1>

            {/* Render dinamis menggunakan displayDescription */}
            {displayDescription && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              >
                {displayDescription}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {heroSlides.length > 1 && (
        <div className="absolute bottom-10 left-12 z-30 hidden md:block">
          <div className="flex items-center gap-4">
            {heroSlides.map((_, index) => (
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
      )}
    </section>
  );
};

export default HeroCarousel;