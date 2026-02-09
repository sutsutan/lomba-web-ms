import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ppdb from '@/assets/ppdb-poster.png';

const PpdbPopup = () => {
  const { t } = useLanguage();
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F5F58]/40 p-6 backdrop-blur-md">
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
            className="relative w-full max-w-[440px] rounded-[2.5rem] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={closePopup}
              className="absolute -right-3 -top-3 z-20 rounded-full border border-gray-100 bg-white p-2 text-[#0F5F58] shadow-lg transition-transform hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-black/5 bg-gray-100 shadow-inner">
              <img
                src={ppdb}
                alt="PPDB Poster"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* TEXT & BUTTON AREA */}
            <div className="mt-6 text-center space-y-4">
              <div>
                <h3 className="text-2xl font-black text-[#0F5F58] tracking-tight">{t('ppdb.popup.title')}</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  {t('ppdb.popup.desc')}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Link 
                  to="/ppdb" 
                  onClick={closePopup}
                  className="group relative flex items-center justify-center gap-2 bg-[#0F5F58] text-white py-4 rounded-2xl font-bold overflow-hidden transition-all hover:bg-[#12606A] hover:shadow-lg active:scale-95"
                >
                  <span className="relative z-10">{t('ppdb.popup.btn')}</span>
                  <ExternalLink className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>

            {/* decorative */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#0F5F58]/10 rounded-full blur-xl -z-10" />
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#0F5F58]/5 rounded-full blur-xl -z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PpdbPopup;