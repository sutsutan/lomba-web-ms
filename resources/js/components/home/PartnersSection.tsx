import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import logoMetland from '@/assets/logo-metland.png';
import Culinarypartner from '@/assets/culinary-scene.jpg';

// Placeholder logos - in a real app these would be imported images
// Using Metland logo multple times to simulate the slider effect + text logos
const partners = [
  { name: 'Grand Metropolitan', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Grand_Metropolitan-removebg-preview-150x150.png' },
  { name: 'Kaliana Apartment', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Kaliana_Apartment-removebg-preview-150x150.png' },
  { name: 'Indesso', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Indesso-removebg-preview-150x150.png' },
  { name: 'Metropolitan Mall', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Metropolitan_Mall_Cibubur-removebg-preview-150x150.png' },
  { name: 'Metland Hotels Group', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2022/12/Metland-Hotels-Group-150x150.png' },
  { name: 'PT Metland', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/PT_Metland-removebg-preview-e1704943421395-150x150.png' },
  { name: 'Pullman', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Pullman-removebg-preview-150x150.png' },
  { name: 'Hotel Ciputra Cibubur', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Hotel_Ciputra_Cibubur-removebg-preview-150x150.png' },
  { name: 'Ra Suites', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Ra_Suites-removebg-preview-150x150.png' },
  { name: 'Horison Hotels Group', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Horison_Hotels_Group__1_-removebg-preview-150x150.png' },
  { name: 'Kempinski', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/01/Kempinski-removebg-preview-150x150.png' },
  { name: 'Shangri-La', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/11/shangri-150x150.png' },
  { name: 'Accor', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/11/accor-e1705022947913-150x150.png' },
  { name: 'Grand Hyatt', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/11/dt_153037286-150x90.png' },
  { name: 'Unesco', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/11/unesco-150x150.png' },
  { name: 'Ritz Carlton', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/11/ritz-calton-150x150.png' },
  { name: 'Virtalus', type: 'image', src: 'https://smkmetland.net/ppdb/wp-content/uploads/2023/11/virtalus-150x150.png' },
];

const PartnersSection = () => {
    const { t } = useLanguage();
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
        /* Pause on hover */
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
              {/* Vertical Line Decoration */}
              <div className="hidden lg:block w-1.5 h-32 bg-[#38857e] rounded-full" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite Slider */}
      <ScrollReveal delay={0.2}>
        <div className="relative w-full hover-pause">
          {/* Gradient Edges for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll">
            {/* First Set */}
            <div className="flex items-center gap-16 px-8">
              {partners.map((partner, index) => (
                <div 
                  key={`p1-${index}`} 
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  {partner.type === 'image' ? (
                    <img 
                      src={partner.src} 
                      alt={partner.name} 
                      className="h-25 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground/80 font-serif">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Duplicated Set for Seamless Loop */}
            <div className="flex items-center gap-16 px-8">
              {partners.map((partner, index) => (
                <div 
                  key={`p2-${index}`} 
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  {partner.type === 'image' ? (
                    <img 
                      src={partner.src} 
                      alt={partner.name} 
                      className="h-25 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground/80 font-serif">
                      {partner.name}
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
            {/* Left: Image with Decoration */}
            <div className="relative">
              
              {/* Main Image */}
              <img 
                src={Culinarypartner} 
                alt="Student Achievement" 
                className="w-full h-auto rounded-lg shadow-xl"
              />

              {/* Date & Caption */}
              <div className="mt-6">
                <p className="text-[#0F5F58] font-bold text-sm mb-2">{t('partners.news_date')}</p>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
                  {t('partners.news_caption')}
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <p className="text-[#0F5F58] font-medium italic">
                {t('partners.news_subtitle')}
              </p>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F5F58] leading-tight">
                {t('partners.news_title')}
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t('partners.news_desc1')}
                </p>
                <p>
                  {t('partners.news_desc2')}
                </p>
                <p>
                  {t('partners.news_desc3')}
                </p>
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
