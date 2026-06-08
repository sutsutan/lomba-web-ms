import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import StackedCarousel from '@/components/StackedCarousel';
import { getPublicExtracurriculars, Extracurricular as ExtracurricularType } from '@/services/Extracurricular';

import extracurricularFutsal from '@/assets/extracurricular-futsal.webp';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularModelling from '@/assets/extracurricular-modelling.webp';

const Extracurricular = () => {
  const { t } = useLanguage();
  const [dynamicEkskul, setDynamicEkskul] = useState<ExtracurricularType[]>([]);

  useEffect(() => {
    getPublicExtracurriculars().then(data => {
      if (data && data.length > 0) {
        setDynamicEkskul(data);
      }
    });
  }, []);

  const fallbackStories = [
    { 
      title: t('extra.stories.title'), 
      desc: t('extra.stories.desc1') + t('extra.stories.desc1_plus'), 
      extraDesc: t('extra.stories.extraDesc1'),
      infoBox: t('extra.stories.infoBox1'),
      image: extracurricularModelling, reverse: false, link: "" 
    },
    { 
      title: t('extra.stories.title2'), 
      desc: t('extra.stories.desc2') + t('extra.stories.desc2_plus'), 
      extraDesc: t('extra.stories.extraDesc2'),
      infoBox: t('extra.stories.infoBox2'),
      image: extracurricularFutsal, reverse: true, link: "" 
    },
    { 
      title: t('extra.stories.title3'), 
      desc: t('extra.stories.desc3') + t('extra.stories.desc3_plus'), 
      extraDesc: t('extra.stories.extraDesc3'),
      infoBox: t('extra.stories.infoBox3'),
      image: extracurricularBasket, reverse: false, link: "" 
    }
  ];

  const renderedStories = dynamicEkskul.length > 0 
    ? dynamicEkskul.map((item, index) => ({
        title: index === 0 ? t('extra.stories.title') : `${item.name} (${item.category})`,
        desc: item.description 
          ? item.description 
          : `${item.name}${t('extra.dynamic.desc_part1')}`,
        extraDesc: item.track_record 
          ? `${t('extra.dynamic.track_record_prefix')}${item.track_record}${t('extra.dynamic.track_record_suffix')}` 
          : `${t('extra.dynamic.no_track_record_prefix')}${item.name}${t('extra.dynamic.no_track_record_suffix')}`,
        infoBox: `${t('extra.dynamic.info_coach')}${item.coach_name || t('extra.dynamic.info_coach_default')}\n${t('extra.dynamic.info_schedule')}${item.schedule || t('extra.dynamic.info_schedule_default')}\n${t('extra.dynamic.info_intensity')}${item.intensity || t('extra.dynamic.info_intensity_default')}`,
        image: item.image_url || 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Ekskul',
        reverse: index % 2 !== 0,
        link: item.registration_link || ""
      }))
    : fallbackStories;

  return (
    <MainLayout>
      <HeroCarousel
        title={t('extra.hero.title')}
        subtitle={t('extra.hero.subtitle')}
        description={t('extra.hero.desc')}
        height="h-[50vh] sm:h-[60vh] md:h-[70vh]"
      />

      {/* Kegiatan Utama Ekstrakurikuler */}
      <section className="pt-24 pb-12 lg:pb-16 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-[3px] h-12 bg-[#12606A] flex-shrink-0" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#12606A] tracking-tight">
                {t('extra.main.title')}
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-5 text-lg font-medium">
              {t('extra.main.subtitle')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-20 items-center">
            <ScrollReveal delay={0.1}>
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold text-[#12606A]">
                  {t('extra.cocurricular.title')}
                </h3>
                <div className="space-y-6">
                  <p className="text-[#12606A] font-medium leading-relaxed text-lg text-justify">
                    {t('extra.cocurricular.desc1')}
                  </p>
                  <p className="text-[#12606A] font-medium leading-relaxed text-lg text-justify">
                    {t('extra.cocurricular.desc2')}
                  </p>
                </div>
                <Link to="/eskul" className="group block w-full mt-6">
                  <div className="flex items-center gap-5 p-4 pr-6 rounded-2xl bg-white shadow-md border border-[#12606A]/10 hover:border-[#12606A] hover:bg-[#12606A] transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#12606A]/10 text-[#12606A] flex-shrink-0 group-hover:bg-white group-hover:text-[#12606A] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 shadow-sm transition-transform" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-[#12606A] group-hover:text-white transition-colors">
                        {t('extra.btn.explore_more')}
                      </h4>
                      <p className="text-sm font-medium text-[#12606A]/70 group-hover:text-white/90 transition-colors leading-snug">
                        {t('extra.btn.explore_desc')}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
               <div className="w-full">
                 <StackedCarousel />
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bagian Galeri & Cerita Aktivitas */}
      <section className="pt-12 lg:pt-16 pb-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 space-y-32">
          {renderedStories.map((story, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal className={story.reverse ? "order-1 lg:order-2" : "order-1"}>
                <img
                  src={story.image}
                  alt={story.title || "Aktivitas Ekstrakurikuler"}
                  className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.2} className={story.reverse ? "order-2 lg:order-1 lg:text-right" : "order-2"}>
                <div className="space-y-6">
                  {story.title && (
                    <h3 className="text-3xl lg:text-4xl font-bold text-[#12606A] mb-6">
                      {story.title}
                    </h3>
                  )}
                  
                  <div className="space-y-4">
                    <p className="text-[#12606A]/90 font-medium leading-relaxed text-lg text-justify">
                      {story.desc}
                    </p>
                    {story.extraDesc && (
                      <p className="text-[#12606A]/90 font-medium leading-relaxed text-lg text-justify">
                        {story.extraDesc}
                      </p>
                    )}
                  </div>

                  {story.infoBox && (
                    <div className={`p-5 bg-[#12606A]/5 rounded-xl border border-[#12606A]/10 mt-6 inline-block w-full max-w-sm ${story.reverse ? "lg:text-right lg:ml-auto" : "text-left"}`}>
                      {story.infoBox.split('\n').map((line, lineIdx) => (
                        <p key={lineIdx} className="text-[#12606A] font-semibold text-sm mb-1 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  {story.link && (
                    <div className={`pt-4 ${story.reverse ? "lg:flex lg:justify-end" : ""}`}>
                      <a 
                        href={story.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-8 py-3 bg-[#12606A] text-white font-bold text-sm rounded-full shadow-lg hover:bg-[#0f4d55] hover:shadow-xl transition-all"
                      >
                        {t('extra.btn.join_online')}
                      </a>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Extracurricular;