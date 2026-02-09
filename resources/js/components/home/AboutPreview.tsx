import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

import aboutImage1 from '@/assets/about-preview.jpg';
import aboutImage2 from '@/assets/about-previewkiribawah.jpg';
import aboutImage3 from '@/assets/about-previewkananbawah.webp';

const AboutPreview = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium text-2xl">{t('about.preview.subtitle')}</span>
              </div>
              <h2 className="text-primary section-title text-3xl md:text-4xl">
                {t('about.preview.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-8 text-justify indent-8">
                {t('about.preview.desc1')}
              </p>
              <p className="text-muted-foreground leading-relaxed text-justify indent-8">
                {t('about.preview.desc2')}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 btn-outline mt-4"
              >
                {t('hero.learn_more')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Image Grid Style */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative flex flex-col gap-4">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={aboutImage1}
                  alt="Band Performance"
                  className="w-full h-[250px] md:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Baris Bawah (Dua Kolom) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={'https://smkmetland.net/ppdb/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-05-at-5.02.53-PM-6-1.jpeg'}
                    alt="Barongsai Performance"
                    className="w-full h-[180px] md:h-[220px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={'https://smkmetland.net/ppdb/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-02-at-5.46.52-PM.jpeg'}
                    alt="Fine Dining Practice"
                    className="w-full h-[180px] md:h-[220px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold/20 rounded-full -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;