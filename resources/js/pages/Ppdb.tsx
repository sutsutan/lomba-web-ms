import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoMetland from '@/assets/logo-metland.png';
import achievement1 from '@/assets/achievement-1.jpg';
import studentEnrollment from '@/assets/pepleg.webp';

const Ppdb = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title={t('ppdb.hero.title')}
        subtitle={t('ppdb.hero.subtitle')}
        description={t('ppdb.hero.desc')}
        height="h-[50vh] sm:h-[60vh] md:h-[70vh]"
      />

      {/* Enrollment Journey Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 md:gap-4 mb-8 ml-0 md:ml-6 lg:ml-10">
              <div className="w-[3px] h-8 sm:h-10 md:h-12 bg-[#12606A] flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#12606A] tracking-tight">
                {t('ppdb.journey.title')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 mt-12 md:mt-16 items-center">
            {/* Content Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#E8F0F2] rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#9DB8BF] rounded-full opacity-60" />
                
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12606A] leading-snug">
                    {t('ppdb.journey.open_title')}<br />
                    <span className="text-[#12606A]">{t('ppdb.journey.open_subtitle')}</span>
                  </h3>
                  
                  <p className="text-[#12606A]/80 font-medium leading-relaxed text-sm sm:text-base">
                    {t('ppdb.journey.desc')}
                  </p>
                  
                  <button className="px-8 py-3 rounded-full bg-[#9DB8BF] text-[#12606A] font-bold text-sm hover:bg-[#8AA8AF] transition-all active:scale-95 shadow-md flex items-center gap-2 group">
                    {t('ppdb.journey.learn_more')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal delay={0.2}>
              <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-xl relative">
                <img
                  src={studentEnrollment}
                  alt="Student Enrollment"
                  className="w-full h-full object-cover"
                />
                {/* Overlay decorations */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs font-semibold text-[#12606A]">{t('ppdb.journey.status')}</p>
                  <p className="text-[10px] text-[#12606A]/70">{t('ppdb.journey.tagline')}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Admission Steps Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl">
          {/* Steps */}
          <div className="space-y-0">
            {[
              { 
                step: 1, 
                title: t('ppdb.step1.title'), 
                subtitle: t('ppdb.step1.subtitle'),
                desc: t('ppdb.step1.desc'),
                date: t('ppdb.step1.date')
              },
              { 
                step: 2, 
                title: t('ppdb.step2.title'), 
                subtitle: t('ppdb.step2.subtitle'),
                desc: t('ppdb.step2.desc'),
                date: t('ppdb.step2.date')
              },
              { 
                step: 3, 
                title: t('ppdb.step3.title'), 
                subtitle: t('ppdb.step3.subtitle'),
                desc: t('ppdb.step3.desc'),
                date: t('ppdb.step3.date')
              },
              { 
                step: 4, 
                title: t('ppdb.step4.title'), 
                subtitle: t('ppdb.step4.subtitle'),
                desc: t('ppdb.step4.desc'),
                date: t('ppdb.step4.date')
              },
            ].map((item, index, arr) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <div className="relative">
                  {/* Top Separator with Logo */}
                  <div className="flex items-center justify-center gap-4 py-6">
                    <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                    <img 
                      src={logoMetland} 
                      alt="Metland Logo" 
                      className="w-8 h-8 object-contain"
                    />
                    <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                  </div>

                  {/* Step Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-6">
                    {/* Left Column - Title */}
                    <div className="text-center md:text-left">
                      <p className="text-[#12606A] font-bold text-lg mb-1">{t('ppdb.steps.step')} {item.step}:</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#12606A] mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[#12606A]/70 font-medium text-sm">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right Column - Description */}
                    <div className="space-y-4">
                      <p className="text-[#12606A]/80 leading-relaxed text-sm md:text-base text-justify">
                        {item.desc}
                      </p>
                      <p className="text-[#12606A] font-medium text-sm">
                        {t('ppdb.steps.date_label')}: <span className="text-[#12606A]/70">[{item.date}]</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Separator for last item */}
                  {index === arr.length - 1 && (
                    <div className="flex items-center justify-center gap-4 py-6">
                      <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                      <img 
                        src={logoMetland} 
                        alt="Metland Logo" 
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Apply Section */}
      <section className="mb-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#12606A] mb-4">
                        {t('ppdb.steps.ready')}
                    </h2>
                    <p className="text-[#12606A]/80 text-md md:text-lg font-medium mb-8">
                        {t('ppdb.steps.ready_desc')}
                    </p>
                    <a 
                        href="https://smkmetland.net/ppdb/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-[#CFE0E3] text-[#12606A] font-bold rounded-full hover:bg-[#BED3D7] transition-all active:scale-95 shadow-md"
                    >
                        {t('ppdb.steps.start_now')}
                    </a>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="w-full h-[200px] md:h-[300px] overflow-hidden shadow-2xl">
                    <img 
                        src={achievement1} 
                        alt="Achievement" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
};

export default Ppdb;
