import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import extracurricularFutsal from '@/assets/extracurricular-futsal.webp';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularModelling from '@/assets/extracurricular-modelling.webp';
import extracurricularBadminton from '@/assets/extracurricular-badminton.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import StackedCarousel from '@/components/StackedCarousel';

const Extracurricular = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title={t('extra.hero.title')}
        subtitle={t('extra.hero.subtitle')}
        description={t('extra.hero.desc')}
        height="h-[50vh] sm:h-[60vh] md:h-[70vh]"
      />

      {/* Extracurricular Activities */}
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
            {/* Content */}
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
<<<<<<< HEAD
                <Link to="/eskul" className="block w-fit">
                  <button className="px-8 py-3 rounded-full bg-slate-300 text-[#12606A] font-bold text-sm hover:bg-slate-400 transition-all active:scale-95 shadow-sm">
                    Learn More
                  </button>
                </Link>
=======
                <button className="px-10 py-4 rounded-full bg-slate-200 text-[#12606A] font-bold text-sm hover:bg-slate-300 transition-all active:scale-95 shadow-sm">
                  {t('extra.cocurricular.learn_more')}
                </button>
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
              </div>
            </ScrollReveal>

            {/* Carousel */}
            <ScrollReveal delay={0.2}>
               <div className="w-full">
                 <StackedCarousel />
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-24 bg-background px-6">
        <div className="container mx-auto space-y-24">
          
          {/* Story 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img
                src={extracurricularModelling}
                alt="Extracurricular life"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-[#12606A]">
                  {t('extra.stories.title')}
                </h3>
                <p className="text-[#12606A] font-medium leading-relaxed text-lg">
                  {t('extra.stories.desc1')}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Story 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.2} className="order-2 lg:order-1">
              <div className="space-y-6 lg:text-right">
                <p className="text-[#12606A] font-medium leading-relaxed text-lg">
                  {t('extra.stories.desc2')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="order-1 lg:order-2">
              <img
                src={extracurricularFutsal}
                alt="Extracurricular activities"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
            </ScrollReveal>
          </div>

          {/* Story 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img
                src={extracurricularBasket}
                alt="Creative activities"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <p className="text-[#12606A] font-medium leading-relaxed text-lg">
                  {t('extra.stories.desc3')}
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Extracurricular;