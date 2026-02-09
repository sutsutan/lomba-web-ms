import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import achievement from '@/assets/achievement-1.jpg';
import extracurricularFutsal from '@/assets/extracurricular-futsal.jpg';
import extracurricularBasket from '@/assets/extracurricular-basket.jpg';
import extracurricularModelling from '@/assets/extracurricular-modelling.jpeg';
import extracurricularBadminton from '@/assets/extracurricular-badminton.jpg';

const images = [
  extracurricularFutsal,
  extracurricularBasket,
  extracurricularModelling,
  extracurricularBadminton,
];

const StackedCarousel: React.FC = () => {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCoverflowSettings = () => {
    if (windowWidth < 480) {
      // Mobile kecil
      return { stretch: 20, depth: 100, scale: 0.88 };
    } else if (windowWidth < 640) {
      // Mobile besar
      return { stretch: 25, depth: 120, scale: 0.86 };
    } else if (windowWidth < 768) {
      // Tablet kecil
      return { stretch: 30, depth: 140, scale: 0.84 };
    } else if (windowWidth < 1024) {
      // Tablet besar
      return { stretch: 35, depth: 160, scale: 0.82 };
    } else if (windowWidth < 1280) {
      // Desktop kecil
      return { stretch: 40, depth: 180, scale: 0.80 };
    } else {
      // Desktop besar
      return { stretch: 45, depth: 200, scale: 0.78 };
    }
  };

  const settings = getCoverflowSettings();

  return (
    <div className="relative w-full py-8 px-2 sm:px-8 md:px-12 lg:px-16 overflow-visible">
      {/* Diamond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 md:-translate-y-4 z-20 flex flex-col items-center">
        <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-[3px] border-[#12606A] rotate-45 bg-background" />
        <div className="w-[2px] h-3 md:h-4 bg-[#12606A]" />
      </div>

      <style>{`
        .stacked-carousel .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev) {
          opacity: 0 !important;
          pointer-events: none;
        }
        
        /* Responsive slide sizes */
        .stacked-carousel .swiper-slide {
          width: 100px !important;
          height: 180px !important;
        }
        
        @media (min-width: 480px) {
          .stacked-carousel .swiper-slide {
            width: 120px !important;
            height: 200px !important;
          }
        }
        
        @media (min-width: 640px) {
          .stacked-carousel .swiper-slide {
            width: 140px !important;
            height: 230px !important;
          }
        }
        
        @media (min-width: 768px) {
          .stacked-carousel .swiper-slide {
            width: 160px !important;
            height: 260px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .stacked-carousel .swiper-slide {
            width: 180px !important;
            height: 290px !important;
          }
        }
        
        @media (min-width: 1280px) {
          .stacked-carousel .swiper-slide {
            width: 200px !important;
            height: 320px !important;
          }
        }
      `}</style>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        coverflowEffect={{
          rotate: 0,
          stretch: settings.stretch,
          depth: settings.depth,
          modifier: 1.2,
          slideShadows: false,
          scale: settings.scale,
        }}
        navigation={{
          nextEl: '.swiper-custom-next',
          prevEl: '.swiper-custom-prev',
        }}
        modules={[EffectCoverflow, Navigation]}
        className="stacked-carousel w-full h-[220px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] !pb-8 md:!pb-12 !overflow-visible"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="overflow-visible transition-all duration-300 group"
          >
            <div className="w-full h-full relative shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nav */}
      <div className="swiper-custom-prev absolute left-0 xs:left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 border-2 md:border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/90 hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm shadow-md">
          <ChevronLeft className="-rotate-45 text-[#12606A] group-hover:text-white" size={14} />
        </div>
      </div>

      <div className="swiper-custom-next absolute right-0 xs:right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 border-2 md:border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/90 hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm shadow-md">
          <ChevronRight className="-rotate-45 text-[#12606A] group-hover:text-white" size={14} />
        </div>
      </div>

      {/* Shadow bawah */}
      <div className="w-20 sm:w-24 md:w-32 h-2 md:h-3 bg-black/10 blur-xl rounded-full mx-auto -mt-2 md:-mt-4"></div>
    </div>
  );
};

export default StackedCarousel;