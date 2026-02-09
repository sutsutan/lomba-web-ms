import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

import logo from '@/assets/logo-metland.png';
import programItImg from '@/assets/program-it.webp';
import programCulinaryImg from '@/assets/program-culinary.webp';
import Itec from '@/assets/Logo_ITEC.png';
import Mpk from '@/assets/mpk-logo.png';
import Msp from '@/assets/msp.jpeg';
import Mahes from '@/assets/mahes.png';
import Kkr from '@/assets/kkr.jpeg';
import LogoOsis from '@/assets/logo-osis.png';
import programDkv from '@/assets/dkv.webp';
import programPerhotelan from '@/assets/aph.webp';
import programAkuntansi from '@/assets/akuntansi.webp';
import extracurricularFutsal from '@/assets/extracurricular-futsal.jpg';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularBadminton from '@/assets/extracurricular-badminton.jpg';
import extracurricularModelling from '@/assets/extracurricular-modelling.jpeg';

interface TabContent {
  title: string;
  description: string;
  images: string[];
}

const tabData: Record<string, TabContent> = {
  extracurricular: {
    title: 'Extracurricular',
    description: 'Our extracurricular programs allow students to discover their passions while developing confidence, responsibility, and collaboration in a supportive school environment.',
    images: [extracurricularFutsal, extracurricularBasket, extracurricularBadminton, extracurricularModelling],
  },
  organization: {
    title: 'Organization',
    description: 'Develop leadership skills and make a difference through our student-led organizations.',
    images: [Itec, LogoOsis, Kkr, Mahes, Msp, Mpk],
  },
  major: {
    title: 'Major',
    description: 'Choose from our industry-focused majors designed to prepare you for professional success.',
    images: [programCulinaryImg, programItImg, programDkv, programPerhotelan, programAkuntansi],
  },
};

const ProgramTabs = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof tabData>('extracurricular');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  const isCompactLayout = activeTab === 'organization' || activeTab === 'major';

  const handleTabChange = (tab: keyof typeof tabData) => {
    setActiveTab(tab);
    setActiveImageIndex(0);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImageIndex((prev) => 
      prev === tabData[activeTab].images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImageIndex((prev) => 
      prev === 0 ? tabData[activeTab].images.length - 1 : prev - 1
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
      scale: 1 - (position * 0.1),
      opacity: position > (windowWidth < 640 ? 2 : 4) ? 0 : 1,
    };
  };

  return (
    <section className="section-padding bg-background py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8">
              Learning That Makes a Difference
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 mb-8 sm:mb-10 md:mb-12 border-b border-border overflow-x-auto pb-2">
            {Object.keys(tabData).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as keyof typeof tabData)}
                className={`pb-2 sm:pb-3 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 relative whitespace-nowrap ${
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
            <div className="flex items-start gap-3 sm:gap-4 max-w-full lg:max-w-3xl">
              <img src={logo} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg pt-1 sm:pt-2">
                {tabData[activeTab].description}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className={`relative flex-shrink-0 overflow-visible ${
                isCompactLayout 
                  ? 'w-full sm:w-[550px] md:w-[700px] lg:w-[850px] xl:w-[1000px] h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px]'
                  : 'w-full sm:w-[600px] md:w-[750px] lg:w-[900px] xl:w-[1050px] h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px]'
              }`}>
                {tabData[activeTab].images.map((image, index) => {
                  const position = getImagePosition(index);
                  return (
                    <motion.div
                      key={`${activeTab}-${index}`}
                      className={`absolute top-0 overflow-hidden shadow-2xl cursor-pointer ${
                        isCompactLayout
                          ? 'w-[100px] sm:w-[170px] md:w-[200px] lg:w-[230px] xl:w-[250px] h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px]'
                          : 'w-[122px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[330px] h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px]'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        left: position.left,
                        zIndex: position.zIndex,
                        scale: position.scale,
                        opacity: position.opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        mass: 0.8,
                      }}
                      whileHover={{ 
                        scale: position.zIndex === tabData[activeTab].images.length ? 1.02 : position.scale,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${tabData[activeTab].title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="relative flex items-center justify-center lg:justify-start h-16 w-24 sm:h-20 sm:w-32 flex-shrink-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 sm:h-24 w-[2px] bg-primary/30 rotate-[45deg] z-10" />

                <button
                  onClick={handlePrev}
                  type="button"
                  className="absolute left-1 sm:left-2 -top-1 w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary/40 flex items-center justify-center rotate-45 hover:bg-primary hover:text-white transition-all group"
                >
                  <ChevronLeft className="-rotate-45 w-5 h-5 sm:w-6 sm:h-6 group-active:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleNext}
                  type="button"
                  className="absolute right-1 sm:right-2 -bottom-1 w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary/40 flex items-center justify-center rotate-45 hover:bg-primary hover:text-white transition-all group"
                >
                  <ChevronRight className="-rotate-45 w-5 h-5 sm:w-6 sm:h-6 group-active:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProgramTabs;