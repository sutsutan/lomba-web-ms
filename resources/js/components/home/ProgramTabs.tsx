import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import logo from '@/assets/logo-metland.png';
import programItImg from '@/assets/program-it.webp';
import programCulinaryImg from '@/assets/program-culinary.webp';
import achievementImg from '@/assets/achievement-1.jpg';
import Itec from '@/assets/Logo_ITEC.png';
import Mpk from '@/assets/mpk-logo.png';
import Msp from '@/assets/msp.jpeg';
import Mahes from '@/assets/mahes.png';
import Kkr from '@/assets/kkr.jpeg';
import LogoOsis from '@/assets/logo-osis.png';
import Cims from '@/assets/cims.jpeg';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Learning That Makes a Difference
            </h2>
          </div>
        </ScrollReveal>

        {/* Tabs with Underline */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-8 md:gap-16 mb-12 border-b border-border">
            {Object.keys(tabData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as keyof typeof tabData)}
                className={`pb-3 text-base md:text-lg font-medium transition-all duration-300 relative ${activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {tabData[tab as keyof typeof tabData].title}
                {/* Underline */}
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Description with Logo */}
            <div className="flex items-start gap-4 max-w-3xl">
              <img src={logo} alt="logo" className="w-12 h-12" />
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg pt-2">
                {tabData[activeTab].description}
              </p>
            </div>

            {/* Image Gallery with Navigation */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tabData[activeTab].images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-shrink-0 w-64 md:w-80 h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={image}
                      alt={`${tabData[activeTab].title} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Navigation Buttons */}
              {/* Left Button */}
              <button
                onClick={scrollLeft}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 -rotate-45"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 rotate-45" />
              </button>

              {/* Right Button */}
              <button
                onClick={scrollRight}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rotate-45"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 -rotate-45" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProgramTabs;
