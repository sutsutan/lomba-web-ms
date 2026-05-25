import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';



const AdmissionSteps = () => {
    const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      image: 'https://i.pinimg.com/1200x/6a/80/35/6a8035f9bcb61800e1884a70948855a5.jpg',
      title: t('admission.step1.title'),
      description: t('admission.step1.desc'),
    },
    {
      image: 'https://smkmetland.pages.dev/_astro/hero-image.GuN_GPl8_199FtU.webp',
      title: t('admission.step2.title'),
      description: t('admission.step2.desc'),
    },
    {
      image: 'https://i.pinimg.com/1200x/93/81/50/938150a75a021683da5f1f96033426e4.jpg',
      title: t('admission.step3.title'),
      description: t('admission.step3.desc'),
    },
    {
      image: 'https://i.pinimg.com/1200x/90/67/eb/9067ebc61b7b972efc65225fd6094892.jpg',
      title: t('admission.step4.title'),
      description: t('admission.step4.desc'),
    },
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Small adjustment: card width (350) + gap (32) = 382
      scrollContainerRef.current.scrollBy({ left: 382, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -382, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-[#D5EAE9] text-[#0F5F58] overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t('admission.title_part1')} <br />{t('admission.title_part2')}
              </h2>
              <p className="text-[#0F5F58]/80 text-base md:text-lg leading-relaxed">
                {t('admission.desc')}
              </p>

              {/* Mobile Navigation Buttons (Visible on Mobile/Tablet only) */}
              <div className="flex lg:hidden items-center gap-2 mt-10 mb-2">
                <div className="relative flex items-center justify-center h-16 w-24">
                  {/* Diagonal Decorative Line */}
                  <div className="absolute h-14 w-[1px] bg-[#0F5F58]/30 rotate-[45deg] z-10" />

                  {/* Prev Button */}
                  <button
                    onClick={scrollLeft}
                    className="absolute left-1 -top-1 w-10 h-10 border-2 border-[#0F5F58]/40 flex items-center justify-center rotate-45 hover:bg-[#0F5F58] hover:text-white transition-all group bg-white/40 backdrop-blur-sm"
                  >
                    <ChevronLeft className="-rotate-45 w-5 h-5 group-active:-translate-x-1 transition-transform" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={scrollRight}
                    className="absolute right-1 -bottom-1 w-10 h-10 border-2 border-[#0F5F58]/40 flex items-center justify-center rotate-45 hover:bg-[#0F5F58] hover:text-white transition-all group bg-white/40 backdrop-blur-sm"
                  >
                    <ChevronRight className="-rotate-45 w-5 h-5 group-active:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Timeline Slider */}
        <div className="relative group/slider px-4 md:px-0">
          {/* Desktop Navigation Buttons (Visible only on Large Screens) */}
          {/* Left Button */}
          <div className="absolute -left-10 lg:-left-16 top-[35%] -translate-y-1/2 z-30 hidden lg:block">
            <button
              onClick={scrollLeft}
              className="w-10 lg:w-12 h-10 lg:h-12 border-2 border-[#0F5F58]/30 flex items-center justify-center rotate-45 hover:bg-[#0F5F58] hover:text-white transition-all group/btn bg-white/80 backdrop-blur-md shadow-lg"
            >
              <ChevronLeft className="-rotate-45 w-5 lg:w-6 group-active/btn:-translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Button */}
          <div className="absolute -right-10 lg:-right-16 top-[35%] -translate-y-1/2 z-30 hidden lg:block">
            <button
              onClick={scrollRight}
              className="w-10 lg:w-12 h-10 lg:h-12 border-2 border-[#0F5F58]/30 flex items-center justify-center rotate-45 hover:bg-[#0F5F58] hover:text-white transition-all group/btn bg-white/80 backdrop-blur-md shadow-lg"
            >
              <ChevronRight className="-rotate-45 w-5 lg:w-6 group-active/btn:translate-x-1 transition-transform" />
            </button>
          </div>
           {/* Main Horizontal Timeline Line */}
           <div className="absolute bottom-16 left-0 right-0 h-0.5 bg-[#0F5F58]/30 w-[200vw] -ml-[50vw]" />

           <div 
             ref={scrollContainerRef}
             className="flex gap-8 overflow-x-auto overflow-y-hidden py-12 px-4 -mx-4 no-scrollbar"
             style={{
               scrollbarWidth: 'none',
               msOverflowStyle: 'none', 
             }}
           >
             <style>{`
               .no-scrollbar::-webkit-scrollbar {
                 display: none !important;
                 width: 0 !important;
                 height: 0 !important;
                 background: transparent;
               }
               .no-scrollbar {
                 -ms-overflow-style: none;
                 scrollbar-width: none;
               }
             `}</style>
             {steps.map((step, index) => (
               <div key={index} className="flex-shrink-0 w-[300px] md:w-[350px] group flex flex-col justify-end">
                 {/* Card */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 mb-8 flex flex-col w-full"
                 >
                   <div className="h-40 overflow-hidden rounded-t-lg">
                     <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   </div>
                   
                   <div className="p-6 flex flex-col">
                     <h3 className="font-bold text-lg mb-4 text-[#0F5F58]">
                       {step.title}
                     </h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       {step.description}
                     </p>
                   </div>
                 </motion.div>

                 {/* Connector to Timeline */}
                 <div className="relative h-16 flex justify-center items-end flex-shrink-0 w-full">
                    {/* Vertical Dashed Line */}
                    <div className="absolute top-[-2rem] bottom-0 w-px border-l-2 border-dashed border-[#0F5F58]/40 h-[calc(100%+2rem)]" />
                    
                    {/* Circle Node on Timeline */}
                    <div className="absolute bottom-0 w-4 h-4 rounded-full border-2 border-[#0F5F58] bg-[#D5EAE9] z-10 box-content p-1">
                      <div className="w-full h-full bg-[#0F5F58] rounded-full" />
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default AdmissionSteps;