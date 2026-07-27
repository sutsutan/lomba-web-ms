import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import programAkuntansi from '@/assets/akuntansi.webp';
import programPerhotelan from '@/assets/aph.webp';
import programDkv from '@/assets/dkv.webp';
import extracurricularBadminton from '@/assets/extracurricular-badminton.jpg';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularFutsal from '@/assets/extracurricular-futsal.webp';
import extracurricularModelling from '@/assets/extracurricular-modelling.webp';
import Kkr from '@/assets/kkr.jpeg';
import logo from '@/assets/metland.png';
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
    const navigate = useNavigate();

    const tabData: Record<string, TabContent> = {
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
        organization: {
            title: t('program.organization.title'),
            description: t('program.organization.desc'),
            images: [Itec, LogoOsis, Kkr, Mahes, Msp, Mpk],
        },
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
    };

    const [activeTab, setActiveTab] =
        useState<keyof typeof tabData>('major');
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
        const isMajor = activeTab === 'major';

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
                            <div className="flex w-full flex-col items-center justify-center py-8">
                                <div className="relative flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-16 gap-y-14">

                                    {tabData.organization.images.map((image, index) => (
                                        <motion.div
                                            key={`org-${index}`}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                                y: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: [0, -8, 0],
                                            }}
                                            transition={{
                                                opacity: {
                                                    duration: 0.4,
                                                    delay: index * 0.08,
                                                },
                                                scale: {
                                                    duration: 0.4,
                                                    delay: index * 0.08,
                                                },
                                                y: {
                                                    duration: 3 + index * 0.4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                },
                                            }}
                                            whileHover={{
                                                scale: 1.12,
                                                rotate: index % 2 === 0 ? 4 : -4,
                                            }}
                                            className="group flex cursor-pointer flex-col items-center"
                                        >
                                            <img
                                                src={image}
                                                alt={`Organization ${index + 1}`}
                                                className="h-20 w-20 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(15,95,88,0.35)] sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
                                            />

                                            <motion.div
                                                className="mt-5 h-[2px] w-0 rounded-full bg-primary"
                                                whileHover={{
                                                    width: 55,
                                                }}
                                                transition={{
                                                    duration: 0.25,
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.96,
                                    }}
                                    onClick={() => navigate('/organization')}
                                    className="mt-16 inline-flex items-center gap-3 text-lg font-semibold text-primary transition-all hover:gap-5"
                                >
                                    Discover All Organizations
                                    <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                        ) : isMajor ? (
                            <div className="w-full">
                                <div className="flex items-center gap-6">
                                    {/* Previous */}
                                    <button
                                        onClick={handlePrev}
                                        type="button"
                                        className="group relative hidden h-12 w-12 rotate-45 items-center justify-center border-2 border-primary/40 transition-all hover:bg-primary hover:text-white lg:flex"
                                    >
                                        <ChevronLeft className="h-6 w-6 -rotate-45 transition-transform group-active:-translate-x-1" />
                                    </button>

                                    {/* Card */}
                                    <div className="flex-1 overflow-hidden rounded-3xl bg-white shadow-2xl">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeImageIndex}
                                                initial={{ opacity: 0, x: 40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -40 }}
                                                transition={{ duration: 0.4 }}
                                                className="grid md:grid-cols-2"
                                            >
                                                {/* IMAGE */}
                                                <div className="h-[260px] md:h-[380px] lg:h-[450px]">
                                                    <img
                                                        src={tabData.major.images[activeImageIndex]}
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                {/* CONTENT */}
                                                <div className="flex flex-col justify-center p-8 lg:p-12">
                                                    <h3 className="mb-5 text-3xl font-bold text-primary">
                                                        {[
                                                            t('category.culinary'),
                                                            t('category.it'),
                                                            t('category.dkv'),
                                                            t('category.hospitality'),
                                                            t('category.accounting'),
                                                        ][activeImageIndex]}
                                                    </h3>

                                                    <p className="mb-8 leading-relaxed text-muted-foreground">
                                                        {[
                                                            t('major.culinary.desc'),
                                                            t('major.pplg.desc'),
                                                            t('major.dkv.desc'),
                                                            t('major.hospitality.desc'),
                                                            t('major.accounting.desc'),
                                                        ][activeImageIndex]}
                                                    </p>

                                                    <button
                                                        onClick={() => navigate('/academics')}
                                                        className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-white transition hover:gap-4"
                                                    >
                                                        Explore Program
                                                        <ArrowRight className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Next */}
                                    <button
                                        onClick={handleNext}
                                        type="button"
                                        className="group relative hidden h-12 w-12 rotate-45 items-center justify-center border-2 border-primary/40 transition-all hover:bg-primary hover:text-white lg:flex"
                                    >
                                        <ChevronRight className="h-6 w-6 -rotate-45 transition-transform group-active:translate-x-1" />
                                    </button>
                                </div>

                                {/* DOTS */}
                                <div className="mt-8 flex justify-center gap-3">
                                    {tabData.major.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`rounded-full transition-all ${
                                                activeImageIndex === index
                                                    ? 'h-3 w-10 bg-primary'
                                                    : 'h-3 w-3 bg-slate-300'
                                            }`}
                                        />
                                    ))}
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
