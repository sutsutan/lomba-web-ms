
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// Import assets (reusing existings ones for demo as per context)
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
    <div className="relative w-full py-4 px-12 md:px-16 overflow-visible">
      {/* Decorative Diamond Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 z-20 flex flex-col items-center">
        <div className="w-6 h-6 border-[3px] border-[#12606A] rotate-45 bg-background flex items-center justify-center"></div>
        <div className="w-[2px] h-4 bg-[#12606A]"></div>
      </div>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
           rotate: 0,
           stretch: 80,
           depth: 350,
           modifier: 1,
           slideShadows: false,
           scale: 0.85,
        }}
        navigation={{
          nextEl: '.swiper-custom-next',
          prevEl: '.swiper-custom-prev',
        }}
        modules={[EffectCoverflow, Navigation]}
        className="w-full h-[320px] !pb-12 !overflow-visible"
      >
        {images.map((img, index) => (
          <SwiperSlide 
            key={index} 
            className="!w-[200px] !h-[280px] rounded-none overflow-visible transition-all duration-300 group"
          >
             {/* Slide Content */}
            <div className="w-full h-full relative shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      {/* Navigation Arrows */}
      <div className="swiper-custom-prev absolute left-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
         <div className="w-10 h-10 border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/80 md:bg-transparent hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm md:backdrop-blur-none" onClick={() => document.querySelector<HTMLElement>('.swiper-button-prev')?.click()}>
             <ChevronLeft className="-rotate-45 text-[#12606A] group-hover:text-white" size={20} />
         </div>
      </div>
      <div className="swiper-custom-next absolute right-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer group">
         <div className="w-10 h-10 border-[3px] border-[#12606A] rotate-45 flex items-center justify-center bg-white/80 md:bg-transparent hover:bg-[#12606A] transition-all duration-300 backdrop-blur-sm md:backdrop-blur-none" onClick={() => document.querySelector<HTMLElement>('.swiper-button-next')?.click()}>
             <ChevronRight className="-rotate-45 text-[#12606A] group-hover:text-white" size={20} />
         </div>
      </div>
      
      {/* Bottom Shadow Decoration */}
      <div className="w-32 h-3 bg-black/10 blur-xl rounded-full mx-auto -mt-4"></div>
    </div>
  );
};

export default StackedCarousel;
