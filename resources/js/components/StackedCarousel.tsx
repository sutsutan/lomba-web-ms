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

const images = [
  programIt,
  programCulinary,
  achievement,
  programIt,
  programCulinary,
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
      return { stretch: 0, depth: 80, scale: 0.9 };
    } else if (windowWidth < 768) {
      return { stretch: 5, depth: 120, scale: 0.85 };
    } else if (windowWidth < 1280) {
      return { stretch: 10, depth: 160, scale: 0.8 };
    } else {
      return { stretch: 10, depth: 220, scale: 0.78 };
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
        className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] !pb-10 md:!pb-14 !overflow-visible"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="!w-[120px] sm:!w-[130px] md:!w-[150px] lg:!w-[170px] 
                       !h-[220px] sm:!h-[240px] md:!h-[260px] lg:!h-[300px] 
                       overflow-visible transition-all duration-300 group"
          >
            <div className="w-full h-full relative shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300">
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
      <div className="swiper-custom-prev absolute left-1 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
        <div className="w-8 h-8 md:w-10 md:h-10 border-2 md:border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/90 hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm shadow-md">
          <ChevronLeft className="-rotate-45 text-[#12606A] group-hover:text-white" size={16} />
        </div>
      </div>

      <div className="swiper-custom-next absolute right-1 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
        <div className="w-8 h-8 md:w-10 md:h-10 border-2 md:border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/90 hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm shadow-md">
          <ChevronRight className="-rotate-45 text-[#12606A] group-hover:text-white" size={16} />
        </div>
      </div>

      {/* Shadow bawah */}
      <div className="w-24 md:w-32 h-2 md:h-3 bg-black/10 blur-xl rounded-full mx-auto -mt-4"></div>
    </div>
  );
};

export default StackedCarousel;
