import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import achievementImg from '@/assets/achievement-1.jpg';

interface Achievement {
  id: number;
  title: string;
  student: string;
  description: string;
  category: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Gold Medal - National Robotics Competition',
    student: 'Ghattan Firstian Ilhaq',
    description: 'First place in the National Robotics Competition 2024, showcasing innovative automation solutions.',
    category: 'Technology',
    image: achievementImg,
  },
  {
    id: 2,
    title: 'Best Culinary Innovation Award',
    student: 'Sutan Bariq Rajabbani Pasai',
    description: 'Winner of the Jakarta Culinary Festival for creative fusion cuisine.',
    category: 'Culinary',
    image: achievementImg,
  },
  {
    id: 3,
    title: 'National Debate Championship',
    student: 'Hanna Maria',
    description: 'Champion in the National English Debate Competition representing West Java.',
    category: 'Academic',
    image: achievementImg,
  },
];

const AchievementsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <section className="section-padding bg-section overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section dengan Tombol Navigasi di Kanan Atas */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 px-4 md:px-12">
          <ScrollReveal>
            <div className="text-left">
              <h2 className="section-title !mx-0">Moments of Achievement</h2>
              <p className="text-muted-foreground mt-2">Celebrating our students' global excellence</p>
            </div>
          </ScrollReveal>

          {/* Custom Navigation Button (Diamond Style like image) */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-2 mt-8 md:mt-0">
              <div className="relative flex items-center justify-center h-20 w-32">
                {/* Garis miring */}
                <div className="absolute h-16 w-[2px] bg-primary/30 rotate-[45deg] z-10" />

                {/* Button Prev */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 -top-1 w-12 h-12 border-2 border-primary/40 flex items-center justify-center rotate-45 hover:bg-primary hover:text-white transition-all group"
                >
                  <ChevronLeft className="-rotate-45 w-6 h-6 group-active:-translate-x-1 transition-transform" />
                </button>

                {/* Button Next */}
                <button
                  onClick={nextSlide}
                  className="absolute right-2 -bottom-1 w-12 h-12 border-2 border-primary/40 flex items-center justify-center rotate-45 hover:bg-primary hover:text-white transition-all group"
                >
                  <ChevronRight className="-rotate-45 w-6 h-6 group-active:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Kontainer Utama Slider */}
        <div className="relative w-full max-w-6xl mx-auto">
          
          {/* Layer Fade Smooth di Samping */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-section via-section/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-section via-section/80 to-transparent z-20 pointer-events-none" />

          {/* Area Slider */}
          <div className="relative overflow-visible">
            <motion.div 
              className="flex gap-8 md:gap-12"
              animate={{ 
                x: `calc(-${currentIndex * 100}% - ${currentIndex * 32}px)` 
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              {achievements.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="min-w-full"
                  animate={{
                    scale: index === currentIndex ? 1 : 0.9,
                    opacity: index === currentIndex ? 1 : 0.4,
                    filter: index === currentIndex ? 'blur(0px)' : 'blur(2px)'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Desain Card Utama */}
                  <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] grid md:grid-cols-2">
                    <div className="p-10 md:p-16 flex flex-col justify-center text-white">
                      <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                        {item.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                        {item.student}
                      </h3>
                      <p className="text-white/70 text-lg leading-relaxed mb-8">
                        {item.description}
                      </p>
                      <button className="group inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-opacity-95 transition-all w-fit shadow-xl active:scale-95">
                        <Trophy className="w-5 h-5" />
                        Learn More
                      </button>
                    </div>
                    <div className="relative h-72 md:h-auto overflow-hidden">
                      <img src={item.image} alt={item.student} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-primary/40 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Indikator Dots di Bawah */}
          <div className="flex justify-center gap-3 mt-12">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex ? 'w-10 h-3 bg-primary' : 'w-3 h-3 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSlider;