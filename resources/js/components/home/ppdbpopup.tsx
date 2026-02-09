import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ppdb from '@/assets/ppdb-poster.png';

const PpdbPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPpdbPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPpdbPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#0F5F58]/40 backdrop-blur-md">
          {/* Backdrop Click to Close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-[440px] bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl border border-white/20"
          >
            {/* Tombol Close di pojok kartu utama */}
            <button 
              onClick={closePopup}
              className="absolute -top-3 -right-3 z-20 p-2 bg-white text-[#0F5F58] shadow-lg rounded-full hover:scale-110 transition-transform border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. INNER CARD (Untuk Poster) */}
            <div className="relative group overflow-hidden rounded-[1.5rem] bg-gray-100 aspect-[4/5] shadow-inner border border-black/5">
              <img 
                src={ppdb}
                alt="PPDB Poster"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Tipis agar poster terlihat lebih eksklusif */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* 2. TEXT & BUTTON AREA (Di luar poster) */}
            <div className="mt-6 text-center space-y-4">
              <div>
                <h3 className="text-2xl font-black text-[#0F5F58] tracking-tight">PPDB 2026/2027</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  Join the excellence. register now for Metland School's 2026/2027 academic year and embark on a journey of growth and success.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Link 
                  to="/ppdb" 
                  onClick={closePopup}
                  className="group relative flex items-center justify-center gap-2 bg-[#0F5F58] text-white py-4 rounded-2xl font-bold overflow-hidden transition-all hover:bg-[#12606A] hover:shadow-lg active:scale-95"
                >
                  <span className="relative z-10">Daftar Sekarang</span>
                  <ExternalLink className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>

            {/* Aksesoris Dekoratif */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#0F5F58]/10 rounded-full blur-xl -z-10" />
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#0F5F58]/5 rounded-full blur-xl -z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PpdbPopup;