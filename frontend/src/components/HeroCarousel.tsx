import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPublicHero, HeroData } from '@/services/Hero'; // Import Service API

interface HeroCarouselProps {
  title?: string;       // ➕ Ditambahkan opsi input manual dari luar
  subtitle?: string;    // ➕ Ditambahkan opsi input manual dari luar
  description?: string; // Deskripsi statis tambahan (jika ada)
  height?: string;
}

const HeroCarousel = ({ 
  title: staticTitle,       // ➕ Ambil props title manual jika dikirim
  subtitle: staticSubtitle, // ➕ Ambil props subtitle manual jika dikirim
  description, 
  height = 'min-h-screen' 
}: HeroCarouselProps) => {
  
  // State untuk menyimpan list data hero dari database Laravel
  const [heroSlides, setHeroSlides] = useState<HeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API Laravel saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPublicHero().then((data) => {
      setHeroSlides(data);
      setLoading(false);
    });
  }, []);

  // Timer otomatis pengganti slide carousel (Hanya jalan jika data slide ada lebih dari 1)
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

  // State Loading: Menampilkan skeleton/placeholder halus selagi menunggu response API
  if (loading) {
    return <div className={`${height} bg-slate-900 flex items-center justify-center text-teal-400 font-medium`}>Memuat halaman...</div>;
  }

  // Mengambil item data yang aktif saat ini berdasarkan index slide
  const activeSlide = heroSlides[currentSlide];

  // ➕ Logika Penentuan Teks: Gunakan teks manual dari props halaman, jika kosong gunakan teks dari database
  const displayTitle = staticTitle || (activeSlide ? activeSlide.title : 'SMK Nusantara Jaya');
  const displaySubtitle = staticSubtitle || (activeSlide ? activeSlide.subtitle : '');

  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        {heroSlides.length > 0 && activeSlide ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={activeSlide.image_url}
              alt={activeSlide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback aman jika image url dari server pecah/rusak
                e.currentTarget.src = 'https://placehold.co/1920x1080/0f172a/fff?text=Gambar+Sekolah';
              }}
            />
          </AnimatePresence>
        ) : (
          /* Tampilan background default jika database admin benar-benar kosong */
          <div className="w-full h-full bg-gradient-to-br from-[#0F5F58] to-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-black/20 z-[1]" />
      </div>

      {/* Content */}
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
            {/* SUBJUDUL (MANUAL PROPS / DINAMIS DATABASE) */}
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

            {/* JUDUL UTAMA (MANUAL PROPS / DINAMIS DATABASE) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {displayTitle}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CAROUSEL DOTS INDIKATOR (Hanya muncul jika slide dari database lebih dari 1) */}
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