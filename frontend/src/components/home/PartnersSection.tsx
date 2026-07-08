import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Culinarypartner from '@/assets/culinary-scene.jpg';
import { fetchPublicPartners, PartnerData } from '@/services/Partner';

const PartnersSection = () => {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
        try {
            const data = await fetchPublicPartners();
            setPartners(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    loadPartners();
}, []);

  useEffect(() => {
    setLoading(true);
    fetchPublicPartners().then((data) => {
      if (data.length > 0) {
        setPartners(data);
      } else {
        setPartners([
          { id: 1, company_name: 'Grand Metropolitan', logo_url: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Grand_Metropolitan-removebg-preview-150x150.png', location: '', website_url: '', is_active: true },
          { id: 2, company_name: 'Metland Hotels Group', logo_url: 'https://smkmetland.net/ppdb/wp-content/uploads/2022/12/Metland-Hotels-Group-150x150.png', location: '', website_url: '', is_active: true },
          { id: 3, company_name: 'Pullman', logo_url: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Pullman-removebg-preview-150x150.png', location: '', website_url: '', is_active: true }
        ]);
      }
    });
  }, []);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .hover-pause:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 mb-16">
        <ScrollReveal>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            {/* Left: Description */}
            <div className="lg:w-1/2 text-center lg:text-right">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {t('partners.desc1')}
                <br /><br />
                {t('partners.desc2')}
              </p>
            </div>

            {/* Right: Title with Line */}
            <div className="lg:w-1/2 flex items-center justify-center lg:justify-start gap-6">
              <div className="text-center lg:text-right">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  {t('partners.title_part1')}
                  <br />
                  <span className="text-primary">{t('partners.title_part2')}</span>
                </h2>
              </div>
              <div className="hidden lg:block w-1.5 h-32 bg-[#38857e] rounded-full" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite Slider */}
      <ScrollReveal delay={0.2}>
        <div className="relative w-full hover-pause">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll">
            {/* First Set */}
            <div className="flex items-center gap-16 px-8">
              {partners.map((partner) => (
                <div 
                  key={`p1-${partner.id}`} 
                  className="flex-shrink-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  {partner.logo_url ? (
                    <img 
                      src={partner.logo_url} 
                      alt={partner.company_name} 
                      className="h-20 w-auto object-contain md:h-25"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/150x150/e2e8f0/0f5f58?text=${encodeURIComponent(partner.company_name)}`;
                      }}
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground/80 font-serif">
                      {partner.company_name}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Duplicated Set for Seamless Loop */}
            <div className="flex items-center gap-16 px-8" aria-hidden="true">
              {partners.map((partner) => (
                <div 
                  key={`p2-${partner.id}`} 
                  className="flex-shrink-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  {partner.logo_url ? (
                    <img 
                      src={partner.logo_url} 
                      alt={partner.company_name} 
                      className="h-20 w-auto object-contain md:h-25"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/150x150/e2e8f0/0f5f58?text=${encodeURIComponent(partner.company_name)}`;
                      }}
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground/80 font-serif">
                      {partner.company_name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Student Achievement Section */}
      <ScrollReveal delay={0.4}>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={Culinarypartner} 
                alt="Student Achievement" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="mt-6">
                <p className="text-[#0F5F58] font-bold text-sm mb-2">{t('partners.news_date')}</p>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
                  {t('partners.news_caption')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[#0F5F58] font-medium italic">
                {t('partners.news_subtitle')}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F5F58] leading-tight">
                {t('partners.news_title')}
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('partners.news_desc1')}</p>
                <p>{t('partners.news_desc2')}</p>
                <p>{t('partners.news_desc3')}</p>
              </div>
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="inline-block px-8 py-3 bg-[#B8C5D0] hover:bg-[#A0B0BD] text-[#0F5F58] font-semibold rounded-full transition-all duration-300"
                >
                  {t('hero.learn_more')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PartnersSection;