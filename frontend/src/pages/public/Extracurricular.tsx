import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  { title: t('extra.stories.title'), desc: t('extra.stories.desc1'), image: extracurricularModelling, reverse: false, link: "" },
  { title: "", desc: t('extra.stories.desc2'), image: extracurricularFutsal, reverse: true, link: "" },
  { title: "", desc: t('extra.stories.desc3'), image: extracurricularBasket, reverse: false, link: "" }
];

const renderedStories = dynamicEkskul.length > 0 
  ? dynamicEkskul.map((item, index) => ({
      title: index === 0 ? t('extra.stories.title') : `${item.name} (${item.category})`,
      desc: `${item.description || ''} ${item.track_record ? `Prestasi: ${item.track_record}.` : ''} Diampu oleh ${item.coach_name || '-'}. Jadwal: ${item.schedule || '-'}`,
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
      <section className="py-24 bg-background overflow-hidden px-6">
        <div className="container mx-auto">
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
                  <p className="text-[#12606A] font-medium leading-relaxed text-lg">
                    {t('extra.cocurricular.desc1')}
                  </p>
                  <p className="text-[#12606A] font-medium leading-relaxed text-lg">
                    {t('extra.cocurricular.desc2')}
                  </p>
                </div>
                <Link to="/eskul" className="block w-fit">
                  <button className="px-8 py-3 rounded-full bg-slate-300 text-[#12606A] font-bold text-sm hover:bg-slate-400 transition-all active:scale-95 shadow-sm">
                    Learn More
                  </button>
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
      <section className="py-24 bg-background px-6">
        <div className="container mx-auto space-y-24">
          {renderedStories.map((story, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal className={story.reverse ? "order-1 lg:order-2" : "order-1"}>
                <img
                  src={story.image}
                  alt={story.title || "Aktivitas Ekstrakurikuler"}
                  className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.2} className={story.reverse ? "order-2 lg:order-1 lg:text-right" : "order-2"}>
                <div className="space-y-6">
                  {story.title && (
                    <h3 className="text-3xl lg:text-4xl font-bold text-[#12606A]">
                      {story.title}
                    </h3>
                  )}
                  <p className="text-[#12606A] font-medium leading-relaxed text-lg">
                    {story.desc}
                  </p>
                  {story.link && (
                    <a 
                      href={story.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block mt-2 text-sm font-bold text-[#12606A] underline hover:text-[#12606A]/80"
                    >
                      Daftar Sekarang →
                    </a>
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