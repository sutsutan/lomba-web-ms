import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// Import assets
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
  return (
    <div className="relative w-full py-4 px-4 sm:px-8 md:px-12 lg:px-16 overflow-visible">
      {/* Decorative Diamond Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 md:-translate-y-8 z-20 flex flex-col items-center">
        <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-[3px] border-[#12606A] rotate-45 bg-background flex items-center justify-center"></div>
        <div className="w-[2px] h-3 md:h-4 bg-[#12606A]"></div>
      </div>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
           rotate: 0,
           stretch: window.innerWidth < 640 ? 40 : window.innerWidth < 1024 ? 60 : 80,
           depth: window.innerWidth < 640 ? 200 : window.innerWidth < 1024 ? 280 : 350,
           modifier: 1,
           slideShadows: false,
           scale: window.innerWidth < 640 ? 0.75 : 0.85,
        }}
        navigation={{
          nextEl: '.swiper-custom-next',
          prevEl: '.swiper-custom-prev',
        }}
        modules={[EffectCoverflow, Navigation]}
        className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] !pb-8 md:!pb-12 !overflow-visible"
      >
        {images.map((img, index) => (
          <SwiperSlide 
            key={index} 
            className="!w-[140px] sm:!w-[160px] md:!w-[180px] lg:!w-[200px] !h-[200px] sm:!h-[230px] md:!h-[260px] lg:!h-[280px] rounded-none overflow-visible transition-all duration-300 group"
          >
             {/* Slide Content */}
            <div className="w-full h-full relative shadow-[0_8px_20px_rgba(0,0,0,0.15)] md:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="swiper-custom-prev absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
         <div className="w-8 h-8 md:w-10 md:h-10 border-2 md:border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/90 md:bg-white/80 hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm shadow-md md:shadow-none">
             <ChevronLeft className="-rotate-45 text-[#12606A] group-hover:text-white" size={16} />
         </div>
      </div>
      <div className="swiper-custom-next absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
         <div className="w-8 h-8 md:w-10 md:h-10 border-2 md:border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/90 md:bg-white/80 hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm shadow-md md:shadow-none">
             <ChevronRight className="-rotate-45 text-[#12606A] group-hover:text-white" size={16} />
         </div>
      </div>
      
      {/* Bottom Shadow Decoration */}
      <div className="w-24 md:w-32 h-2 md:h-3 bg-black/10 blur-xl rounded-full mx-auto -mt-4"></div>
    </div>
  );
};

export default StackedCarousel;