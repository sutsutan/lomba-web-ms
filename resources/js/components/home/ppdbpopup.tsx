import ppdb from '@/assets/ppdb-poster.png';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

                        <div className="mt-6 space-y-4 text-center">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-[#0F5F58]">
                                    PPDB 2026/2027
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                                    Join the excellence. Register now for Metland School's academic year.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 pt-2">
                                <Link
                                    to="/ppdb"
                                    onClick={closePopup}
                                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#0F5F58] py-4 font-bold text-white transition-all hover:bg-[#12606A] hover:shadow-lg active:scale-95"
                                >
                                    <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0" />
                                    <span className="relative z-10">Register Now!</span>
                                    <ExternalLink className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PpdbPopup;