import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import programAkuntansi from '@/assets/akuntansi.webp';
import programPerhotelan from '@/assets/aph.webp';
import programDkv from '@/assets/dkv.webp';
import extracurricularBadminton from '@/assets/extracurricular-badminton.jpg';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularFutsal from '@/assets/extracurricular-futsal.webp';
import extracurricularModelling from '@/assets/extracurricular-modelling.webp';
import Kkr from '@/assets/kkr.jpeg';
import logo from '@/assets/logo-metland.png';
import LogoOsis from '@/assets/logo-osis.png';
import Itec from '@/assets/Logo_ITEC.png';
import Mahes from '@/assets/mahes.png';
import Mpk from '@/assets/mpk-logo.png';
import Msp from '@/assets/msp.jpeg';
import programCulinaryImg from '@/assets/program-culinary.webp';
import programItImg from '@/assets/program-it.webp';

interface TabContent {
    title: string;
    description: string;
    images: string[];
}

const ProgramTabs = () => {
    const { t } = useLanguage();

    const tabData: Record<string, TabContent> = {
        extracurricular: {
            title: t('program.extracurricular.title'),
            description: t('program.extracurricular.desc'),
            images: [
                extracurricularFutsal,
                extracurricularBasket,
                extracurricularBadminton,
                extracurricularModelling,
            ],
        },
        organization: {
            title: t('program.organization.title'),
            description: t('program.organization.desc'),
            images: [Itec, LogoOsis, Kkr, Mahes, Msp, Mpk],
        },
        major: {
            title: t('program.major.title'),
            description: t('program.major.desc'),
            images: [
                programCulinaryImg,
                programItImg,
                programDkv,
                programPerhotelan,
                programAkuntansi,
            ],
        },
    };

    const [activeTab, setActiveTab] =
        useState<keyof typeof tabData>('extracurricular');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200,
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isOrganization = activeTab === 'organization';
    const isCompactLayout =
        activeTab === 'organization' || activeTab === 'major';

    const handleTabChange = (tab: keyof typeof tabData) => {
        setActiveTab(tab);
        setActiveImageIndex(0);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveImageIndex((prev) =>
            prev === tabData[activeTab].images.length - 1 ? 0 : prev + 1,
        );
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveImageIndex((prev) =>
            prev === 0 ? tabData[activeTab].images.length - 1 : prev - 1,
        );
    };

    const getImagePosition = (index: number) => {
        const totalImages = tabData[activeTab].images.length;
        const position = (activeImageIndex - index + totalImages) % totalImages;

        let spacing;
        if (windowWidth < 640) {
            spacing = isCompactLayout ? 70 : 90;
        } else if (windowWidth < 1024) {
            spacing = isCompactLayout ? 100 : 160;
        } else {
            spacing = isCompactLayout ? 150 : 240;
        }

        return {
            left: position * spacing,
            zIndex: totalImages - position,
            scale: 1 - position * 0.1,
            opacity: position > (windowWidth < 640 ? 2 : 4) ? 0 : 1,
        };
    };

    return (
        <section className="section-padding overflow-hidden bg-background py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
                <ScrollReveal>
                    <div className="mb-8 text-center sm:mb-10 md:mb-12">
                        <h2 className="mb-6 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl md:text-4xl">
                            {t('program.title')}
                        </h2>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div className="mb-8 flex justify-center gap-4 overflow-x-auto border-b border-border pb-2 sm:mb-10 sm:gap-6 md:mb-12 md:gap-8 lg:gap-16">
                        {Object.keys(tabData).map((tab) => (
                            <button
                                key={tab}
                                onClick={() =>
                                    handleTabChange(tab as keyof typeof tabData)
                                }
                                className={`relative whitespace-nowrap pb-2 text-sm font-medium transition-all duration-300 sm:pb-3 sm:text-base md:text-lg ${
                                    activeTab === tab
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {tabData[tab as keyof typeof tabData].title}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <div className="mx-auto flex max-w-full items-start gap-3 sm:gap-4 lg:mx-0 lg:max-w-3xl">
                            <img
                                src={logo}
                                alt="logo"
                                className="h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12"
                            />
                            <p className="text-muted-foreground pt-1 text-center text-sm leading-relaxed sm:pt-2 sm:text-base md:text-lg lg:text-left">
                                {tabData[activeTab].description}
                            </p>
                        </div>
                        {/* organizations */}
                        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:justify-start lg:gap-12">
                            {isOrganization ? (
                                <div className="flex w-full flex-col items-center gap-12 py-10 lg:items-start">
                                    <div className="flex max-w-5xl flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:justify-start">
                                        {tabData.organization.images.map(
                                            (image, index) => (
                                                <motion.div
                                                    key={`org-${index}`}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.5,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: [0, -15, 0], // Efek melayang vertikal
                                                        rotate: [0, 5, -5, 0], // Efek rotasi halus
                                                    }}
                                                    transition={{
                                                        delay: index * 0.1,
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        repeatType: 'mirror',
                                                        ease: 'easeInOut',
                                                        y: {
                                                            duration: 3 + index, // Variasi kecepatan antar logo
                                                            repeat: Infinity,
                                                            ease: 'easeInOut',
                                                        },
                                                    }}
                                                    whileHover={{
                                                        scale: 1.2,
                                                        rotate: 0,
                                                        zIndex: 10,
                                                        filter: 'drop-shadow(0px 0px 20px rgba(var(--primary), 0.3))',
                                                    }}
                                                    className="perspective-1000 relative flex h-20 w-20 cursor-pointer items-center justify-center sm:h-24 sm:w-24 md:h-28 md:w-28"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Organization ${index + 1}`}
                                                        className="h-full w-full object-contain drop-shadow-lg filter"
                                                    />
                                                </motion.div>
                                            ),
                                        )}

                                     
                                    </div>

                                    <div className="relative pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="btn-outline mt-4 inline-flex items-center gap-2"
                                        >
                                            Discover All Organizations
                                            <ChevronRight className="h-4 w-4" />
                                        </motion.button>

                                        {/* Tooltip kecil di bawah tombol */}
                                        <p className="text-muted-foreground absolute -bottom-6 left-1/2 w-max -translate-x-1/2 text-[11px] italic lg:left-0 lg:translate-x-0"></p>
                                    </div>
                                </div>
                            ) : (
                                // (MAJOR & EXTRACURRICULAR)
                                <>
                                    <div
                                        className={`relative mx-auto flex-shrink-0 overflow-visible lg:mx-0 ${
                                            isCompactLayout
                                                ? 'h-[280px] w-[240px] sm:h-[350px] sm:w-[550px] md:h-[400px] md:w-[700px] lg:h-[450px] lg:w-[850px] xl:w-[1000px]'
                                                : 'h-[280px] w-[300px] sm:h-[350px] sm:w-[600px] md:h-[400px] md:w-[750px] lg:h-[450px] lg:w-[900px] xl:w-[1050px]'
                                        }`}
                                    >
                                        {tabData[activeTab].images.map(
                                            (image, index) => {
                                                const position =
                                                    getImagePosition(index);
                                                return (
                                                    <motion.div
                                                        key={`${activeTab}-${index}`}
                                                        className={`absolute top-0 cursor-pointer overflow-hidden shadow-2xl ${
                                                            isCompactLayout
                                                                ? 'h-[280px] w-[100px] sm:h-[350px] sm:w-[170px] md:h-[400px] md:w-[200px] lg:h-[450px] lg:w-[230px] xl:w-[250px]'
                                                                : 'h-[280px] w-[122px] sm:h-[350px] sm:w-[220px] md:h-[400px] md:w-[260px] lg:h-[450px] lg:w-[300px] xl:w-[330px]'
                                                        }`}
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        animate={{
                                                            left: position.left,
                                                            zIndex: position.zIndex,
                                                            scale: position.scale,
                                                            opacity:
                                                                position.opacity,
                                                        }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 100,
                                                            damping: 20,
                                                            mass: 0.8,
                                                        }}
                                                        whileHover={{
                                                            scale:
                                                                position.zIndex ===
                                                                tabData[
                                                                    activeTab
                                                                ].images.length
                                                                    ? 1.02
                                                                    : position.scale,
                                                            transition: {
                                                                duration: 0.2,
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            setActiveImageIndex(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`${tabData[activeTab].title} ${index + 1}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </motion.div>
                                                );
                                            },
                                        )}
                                    </div>

                                    <div className="relative flex h-16 w-24 flex-shrink-0 items-center justify-center sm:h-20 sm:w-32 lg:justify-start">
                                        <div className="absolute left-1/2 top-1/2 z-10 h-20 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-primary/30 sm:h-24" />

                                        <button
                                            onClick={handlePrev}
                                            type="button"
                                            className="group absolute -top-1 left-1 flex h-10 w-10 rotate-45 items-center justify-center border-2 border-primary/40 transition-all hover:bg-primary hover:text-white sm:left-2 sm:h-12 sm:w-12"
                                        >
                                            <ChevronLeft className="h-5 w-5 -rotate-45 transition-transform group-active:-translate-x-1 sm:h-6 sm:w-6" />
                                        </button>

                                        <button
                                            onClick={handleNext}
                                            type="button"
                                            className="group absolute -bottom-1 right-1 flex h-10 w-10 rotate-45 items-center justify-center border-2 border-primary/40 transition-all hover:bg-primary hover:text-white sm:right-2 sm:h-12 sm:w-12"
                                        >
                                            <ChevronRight className="h-5 w-5 -rotate-45 transition-transform group-active:translate-x-1 sm:h-6 sm:w-6" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProgramTabs;
