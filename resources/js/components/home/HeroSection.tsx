import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import heroBg2 from '@/assets/hero-bg-2.jpg';
import heroBg3 from '@/assets/hero-bg-3.jpg';
import heroBg4 from '@/assets/hero-bg-4.jpg';
import heroBg from '@/assets/hero-bg.jpg';
import metland from '@/assets/metland.png';

const heroImages = [
    { src: heroBg, alt: 'Students learning together' },
    { src: heroBg2, alt: 'Vocational training' },
    { src: heroBg3, alt: 'Practical learning' },
    { src: heroBg4, alt: 'Student activities' },
];

const HeroSection = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimatingIntro, setIsAnimatingIntro] = useState(
        () => !sessionStorage.getItem('introShown'),
    );

    useEffect(() => {
        if (isAnimatingIntro) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isAnimatingIntro]);

    useEffect(() => {
        if (isAnimatingIntro) {
            document.body.style.overflow = 'hidden';
            const timeout = setTimeout(() => {
                setIsAnimatingIntro(false);
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('introShown', 'true');
            }, 3500); 
            return () => {
                document.body.style.overflow = 'auto';
                clearTimeout(timeout);
            };
        }
    }, [isAnimatingIntro]);

    const goToSlide = (index: number) => setCurrentSlide(index);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* CSS ANIMATION INJECTOR */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes expandLine {
                    0% { transform: scaleX(0); opacity: 0; }
                    100% { transform: scaleX(1); opacity: 1; }
                }
                .animate-expand {
                    animation: expandLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 1s;
                    transform-origin: center;
                }
            `}} />

            {/* ELEGANT INTRO OVERLAY */}
            <AnimatePresence>
                {isAnimatingIntro && (
                    <motion.div
                        key="intro-overlay"
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#051C1F] overflow-hidden"
                        exit={{ 
                            opacity: 0,
                            transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 } 
                        }}
                    >
                        {/* DEBU CAHAYA */}
                        {typeof window !== 'undefined' && window.innerWidth > 768 && (
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: "100vh" }}
                                        animate={{ 
                                            opacity: [0, 0.3, 0],
                                            y: "-10vh",
                                            x: `${Math.random() * 100}vw`
                                        }}
                                        transition={{ 
                                            duration: Math.random() * 5 + 7, 
                                            repeat: Infinity,
                                            ease: "linear" 
                                        }}
                                        className="absolute w-1 h-1 bg-teal-200/40 rounded-full blur-[1px]"
                                    />
                                ))}
                            </div>
                        )}

                        {/* LOGO PORTAL ZOOM OUT */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center"
                            exit={{ 
                                scale: 12,
                                opacity: 0,
                                filter: "blur(5px)",
                                transition: { duration: 1.5, ease: [0.7, 0, 0.2, 1] } 
                            }}
                            style={{ willChange: "transform, opacity" }}
                        >
                            <motion.img
                                src={metland}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="h-32 w-32 object-contain md:h-44 md:w-44"
                            />

                            <motion.div className="mt-8 text-center">
                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl font-light uppercase tracking-[0.6em] text-white md:text-2xl"
                                >
                                    Metland School
                                </motion.h2>
                                <div className="animate-expand mx-auto mt-6 h-[1px] w-32 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CINEMATIC BACKGROUND CAROUSEL */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
                        className="relative h-full w-full"
                    >
                        <img
                            src={heroImages[currentSlide].src}
                            alt={heroImages[currentSlide].alt}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* DECORATIVE GEOMETRIC LINES */}
            <div className="pointer-events-none absolute inset-0 z-10 opacity-20">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d="M0 20 L100 20 M80 0 L80 100"
                        stroke="white"
                        strokeWidth="0.05"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={!isAnimatingIntro ? { pathLength: 1 } : {}}
                        transition={{ duration: 2, delay: 0.5 }}
                    />
                </svg>
            </div>

            {/* MAIN CONTENT (Desain Tetap Sama) */}
            <div className="container relative z-20 mx-auto flex h-full items-center px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <div className="mb-4 overflow-hidden">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={!isAnimatingIntro ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-[1px] w-8 bg-teal-400" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-400 md:text-sm">
                                {t('hero.tagline')}
                            </span>
                        </motion.div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-5xl font-black leading-none tracking-tighter text-white md:text-7xl lg:text-8xl">
                            <div className="overflow-hidden py-1">
                                <motion.span
                                    initial={{ y: '100%' }}
                                    animate={!isAnimatingIntro ? { y: 0 } : {}}
                                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="block"
                                >
                                    {t('hero.title_part1')}
                                </motion.span>
                            </div>
                            <div className="overflow-hidden py-1">
                                <motion.span
                                    initial={{ y: '100%' }}
                                    animate={!isAnimatingIntro ? { y: 0 } : {}}
                                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="block bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-400 bg-clip-text text-transparent"
                                >
                                    {t('hero.title_part2')}
                                </motion.span>
                            </div>
                        </h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={!isAnimatingIntro ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mb-12 max-w-2xl border-l border-teal-500/30 pl-6 text-base leading-relaxed text-slate-300 md:text-xl"
                    >
                        {t('hero.description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={!isAnimatingIntro ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <Link
                            to="/about"
                            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-4 font-bold text-white transition-all duration-500 hover:border-teal-400"
                        >
                            <div className="absolute inset-0 translate-y-[101%] bg-teal-500 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-y-0" />
                            <span className="relative z-10 flex items-center gap-3">
                                {t('hero.learn_more')}
                                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* CAROUSEL DOTS */}
            <div className="absolute bottom-10 left-12 z-30 hidden md:block">
                <div className="flex items-center gap-4">
                    {heroImages.map((_, index) => (
                        <button key={index} onClick={() => goToSlide(index)} className="group relative">
                            <div className={`mb-2 text-[10px] font-bold transition-colors ${index === currentSlide ? 'text-teal-400' : 'text-white/40'}`}>
                                0{index + 1}
                            </div>
                            <div className={`h-[3px] rounded-full transition-all duration-500 ${index === currentSlide ? 'w-12 bg-teal-400' : 'w-6 bg-white/20 group-hover:bg-white/40'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;